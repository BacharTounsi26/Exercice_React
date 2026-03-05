// src/app/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout         from "@/features/layout/ui/RootLayout";
import HomePage           from "@/features/home/HomePage";
import ShopPage           from "@/features/shop/ShopPage";
import ProductPage        from "@/features/product/ProductPage";
import CartPage           from "@/features/cart/CartPage";
import CheckoutPage       from "@/features/checkout/CheckoutPage";
import TopSellersPage     from "@/features/home/pages/TopSellersPage";
import NewArrivalsPage    from "@/features/home/pages/NewArrivalsPage";
import RecentlyViewedPage from "@/features/home/pages/RecentlyViewedPage";
import NotFoundPage       from "@/features/layout/ui/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true,              element: <HomePage /> },
      { path: "shop",             element: <ShopPage /> },
      { path: "shop/:categoryId", element: <ShopPage /> },
      { path: "product/:id",      element: <ProductPage /> },
      { path: "cart",             element: <CartPage /> },
      { path: "checkout",         element: <CheckoutPage /> },
      { path: "top-sellers",      element: <TopSellersPage /> },
      { path: "new-arrivals",     element: <NewArrivalsPage /> },
      { path: "recently-viewed",  element: <RecentlyViewedPage /> },
      { path: "*",                element: <NotFoundPage /> },
    ],
  },
]);