// src/features/cart/state/cartSlice.ts
// Slice Redux Toolkit — toute la logique du panier est ici.
//
// STRATÉGIE DE PERSISTANCE :
//   - L'id du panier est sauvegardé dans localStorage ("cart_id")
//   - Au démarrage (initCart), on tente de récupérer le panier existant
//   - Chaque mutation (add/update/remove/clear) est auto-sauvegardée côté serveur
//
// CALCULS :
//   - subTotal = somme(item.price * item.qty)
//   - tax      = subTotal * TAX_RATE
//   - total    = subTotal + tax

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createCart }  from "../api/createCart";
import { getCart }     from "../api/getCart";
import { updateCart }  from "../api/updateCart";
import { deleteCart }  from "../api/deleteCart";
import type { Cart }  from "@/shared/types/Cart";
import type { CartItem }  from "@/shared/types/CartItem";
import type { Product } from "@/shared/types/Product";

const TAX_RATE    = 0.20;       // 20%
const STORAGE_KEY = "cart_id";

// ── Helpers ────────────────────────────────────────────────────────────────

function computeTotals(items: CartItem[]): Pick<Cart, "subTotal" | "tax" | "total"> {
  const subTotal = +items.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2);
  const tax      = +(subTotal * TAX_RATE).toFixed(2);
  const total    = +(subTotal + tax).toFixed(2);
  return { subTotal, tax, total };
}

function saveCartId(id: string) {
  try { localStorage.setItem(STORAGE_KEY, id); } catch {}
}

function loadCartId(): string | null {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}

function clearCartId() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── State ──────────────────────────────────────────────────────────────────

export interface CartState {
  cart:      Cart | null;
  status:    "idle" | "loading" | "syncing" | "error";
  error:     string | null;
}

const initialState: CartState = {
  cart:   null,
  status: "idle",
  error:  null,
};

// ── Thunks ─────────────────────────────────────────────────────────────────

/**
 * initCart — appelé au démarrage de l'app.
 * Charge le panier existant depuis l'API ou en crée un nouveau.
 */
export const initCart = createAsyncThunk<Cart>(
  "cart/init",
  async () => {
    const savedId = loadCartId();

    if (savedId) {
      const existing = await getCart(savedId);
      if (existing) return existing;
      // Le panier a expiré côté serveur → on en crée un nouveau
    }

    const fresh = await createCart();
    saveCartId(fresh.id);
    return fresh;
  }
);

/**
 * syncCart — sauvegarde l'état courant du panier sur le serveur.
 * Appelé automatiquement après chaque mutation via le middleware.
 */
export const syncCart = createAsyncThunk<Cart, Cart>(
  "cart/sync",
  async (cart) => updateCart(cart)
);

/**
 * clearCartAsync — vide le panier et en crée un nouveau côté serveur.
 */
export const clearCartAsync = createAsyncThunk<Cart, string>(
  "cart/clearAsync",
  async (cartId) => {
    await deleteCart(cartId);
    const fresh = await createCart();
    saveCartId(fresh.id);
    return fresh;
  }
);

// ── Slice ──────────────────────────────────────────────────────────────────

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    /**
     * addItem — ajoute un produit au panier.
     * Si le produit existe déjà, incrémente la quantité.
     */
    addItem(state, action: PayloadAction<{ product: Product; qty: number }>) {
      if (!state.cart) return;
      const { product, qty } = action.payload;

      const existing = state.cart.items.find((i) => i.id === product.id);

      if (existing) {
        existing.qty = Math.min(99, existing.qty + qty);
      } else {
        const newItem: CartItem = {
          id:           product.id,
          name:         product.name,
          imageName:    product.imageName,
          categoryName: product.categoryName,
          price:        product.discountRate
                          ? +(product.price * (1 - product.discountRate / 100)).toFixed(2)
                          : product.price,
          qty,
        };
        state.cart.items.push(newItem);
      }

      Object.assign(state.cart, computeTotals(state.cart.items));
    },

    /**
     * updateQty — modifie la quantité d'un item (min 1, max 99).
     */
    updateQty(state, action: PayloadAction<{ id: number; qty: number }>) {
      if (!state.cart) return;
      const item = state.cart.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.qty = Math.max(1, Math.min(99, action.payload.qty));
        Object.assign(state.cart, computeTotals(state.cart.items));
      }
    },

    /**
     * removeItem — supprime un produit du panier.
     */
    removeItem(state, action: PayloadAction<number>) {
      if (!state.cart) return;
      state.cart.items = state.cart.items.filter((i) => i.id !== action.payload);
      Object.assign(state.cart, computeTotals(state.cart.items));
    },
  },

  extraReducers: (builder) => {
    // initCart
    builder
      .addCase(initCart.pending,  (state) => { state.status = "loading"; state.error = null; })
      .addCase(initCart.fulfilled,(state, action) => {
        state.cart   = action.payload;
        state.status = "idle";
      })
      .addCase(initCart.rejected, (state, action) => {
        state.status = "error";
        state.error  = action.error.message ?? "Erreur d'initialisation du panier.";
      });

    // syncCart
    builder
      .addCase(syncCart.pending,   (state) => { state.status = "syncing"; })
      .addCase(syncCart.fulfilled, (state, action) => {
        state.cart   = action.payload;
        state.status = "idle";
      })
      .addCase(syncCart.rejected,  (state, action) => {
        state.status = "error";
        state.error  = action.error.message ?? "Erreur de synchronisation.";
      });

    // clearCartAsync
    builder
      .addCase(clearCartAsync.pending,   (state) => { state.status = "loading"; })
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.cart   = action.payload;
        state.status = "idle";
      })
      .addCase(clearCartAsync.rejected,  (state, action) => {
        state.status = "error";
        state.error  = action.error.message ?? "Erreur lors du vidage du panier.";
      });
  },
});

export const { addItem, updateQty, removeItem } = cartSlice.actions;
export default cartSlice.reducer;