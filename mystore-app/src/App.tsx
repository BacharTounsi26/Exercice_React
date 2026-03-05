
import { useEffect }             from "react";
import { RouterProvider }        from "react-router-dom";
import { Provider }              from "react-redux";
import { store }                 from "./app/store";
import { initCart }              from "./features/cart/state/cartSlice";
import { router }                from "./app/routes";
import { useBackendAvailability } from "@/shared/hooks/useBackendAvailability";
import BackendUnavailablePage from "@/shared/ui/BackendUnavailablePage";

function AppWithStore() {
  const { isChecking, isAvailable, retry } = useBackendAvailability();

  useEffect(() => {
    if (isAvailable) {
      store.dispatch(initCart());
    }
  }, [isAvailable]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-sm">
        Checking backend connection...
      </div>
    );
  }

  if (!isAvailable) {
    return <BackendUnavailablePage onRetry={retry} />;
  }

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <Provider store={store}>
      <AppWithStore />
    </Provider>
  );
}