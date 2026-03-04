// src/App.tsx
// Provider Redux wrappé ici — une seule fois, hors du router.
// initCart est dispatché au démarrage pour charger/créer le panier.

import { useEffect }             from "react";
import { RouterProvider }        from "react-router-dom";
import { Provider }              from "react-redux";
import { store }                 from "./app/store";
import { initCart }              from "./features/cart/state/CartSlice";
import { router }                from "./app/routes";

function AppWithStore() {
  useEffect(() => {
    store.dispatch(initCart());
  }, []);

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <Provider store={store}>
      <AppWithStore />
    </Provider>
  );
}