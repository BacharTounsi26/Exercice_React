
import { useCallback }           from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppStore";
import {
  addItem,
  updateQty,
  removeItem,
  clearCartAsync,
}                                from "../state/cartSlice";
import {
  selectCartItems,
  selectCartCount,
  selectCartSubTotal,
  selectCartTax,
  selectCartTotal,
  selectIsCartEmpty,
  selectIsSyncing,
  selectCart,
  selectCartStatus,
  selectCartError,
}                                from "../state/selectors";
import type { Product }          from "@/shared/types/Product";

export function useCart() {
  const dispatch  = useAppDispatch();

  // Sélecteurs
  const cart      = useAppSelector(selectCart);
  const items     = useAppSelector(selectCartItems);
  const count     = useAppSelector(selectCartCount);
  const subTotal  = useAppSelector(selectCartSubTotal);
  const tax       = useAppSelector(selectCartTax);
  const total     = useAppSelector(selectCartTotal);
  const isEmpty   = useAppSelector(selectIsCartEmpty);
  const isSyncing = useAppSelector(selectIsSyncing);
  const status    = useAppSelector(selectCartStatus);
  const error     = useAppSelector(selectCartError);

  // Actions
  const add    = useCallback((product: Product, qty = 1) => {
    dispatch(addItem({ product, qty }));
  }, [dispatch]);

  const update = useCallback((id: number, qty: number) => {
    dispatch(updateQty({ id, qty }));
  }, [dispatch]);

  const remove = useCallback((id: number) => {
    dispatch(removeItem(id));
  }, [dispatch]);

  const clear  = useCallback(() => {
    if (cart?.id) dispatch(clearCartAsync(cart.id));
  }, [dispatch, cart?.id]);

  return {
    cart, items, count, subTotal, tax, total,
    isEmpty, isSyncing, status, error,
    add, update, remove, clear,
  };
}