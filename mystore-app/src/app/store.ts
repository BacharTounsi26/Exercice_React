// src/app/store.ts
// Store Redux Toolkit.
//
// MIDDLEWARE AUTO-SYNC :
//   Après chaque action qui modifie le panier (addItem, updateQty, removeItem),
//   le middleware déclenche automatiquement syncCart pour sauvegarder sur le serveur.
//   Cela évite d'appeler dispatch(syncCart(...)) manuellement dans chaque composant.
import { configureStore, type AnyAction, type Middleware } from "@reduxjs/toolkit";
import cartReducer, {
  syncCart,
  addItem,
  updateQty,
  removeItem,
} from "@/features/cart/state/CartSlice";

// Actions qui déclenchent une sauvegarde serveur
const SYNC_ACTIONS: Set<string> = new Set([
  addItem.type,
  updateQty.type,
  removeItem.type,
]);

const cartSyncMiddleware: Middleware =
  (storeAPI) =>
  (next) =>
  (action) => {

    const result = next(action);

    if (
      typeof action === "object" &&
      action !== null &&
      "type" in action &&
      SYNC_ACTIONS.has((action as AnyAction).type)
    ) {
      const { cart } = storeAPI.getState().cart;
      if (cart) {
        storeAPI.dispatch(syncCart(cart) as never);
      }
    }

    return result;
  };

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartSyncMiddleware),
});

// Types exportés — à utiliser dans useAppSelector / useAppDispatch
export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;