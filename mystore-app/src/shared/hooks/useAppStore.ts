// src/shared/hooks/useAppStore.ts
// Hooks Redux typés — à utiliser à la place de useDispatch / useSelector bruts.

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);