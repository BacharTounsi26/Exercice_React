
import { useEffect }           from "react";
import { useNavigate }         from "react-router-dom";
import { useCheckout }         from "./hooks/useCheckout";
import { useCart }             from "@/features/cart/hooks/useCart";
import Breadcrumb              from "@/features/layout/ui/Breadcrumb";
import CheckoutForm            from "./ui/CheckoutForm";
import OrderSummary            from "./ui/OrderSummary";
import OrderSuccess            from "./ui/OrderSuccess";
import PageHeader              from "@/shared/ui/PageHeader";
import type { CheckoutFormData } from "@/shared/types/CheckoutFormData";

// ── Skeleton ────────────────────────────────────────────────────────────────
function CheckoutSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 animate-pulse">
      <div className="h-4 w-40 bg-slate-200 rounded mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-64 bg-slate-100 rounded-2xl" />
          <div className="h-48 bg-slate-100 rounded-2xl" />
        </div>
        <div className="h-80 bg-slate-100 rounded-2xl" />
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const navigate = useNavigate();

  const { isEmpty, items, subTotal, tax, total, status: cartStatus } = useCart();
  const { isSubmitting, isSuccess, order, error, submit, reset }     = useCheckout();

  // Rediriger vers le panier si celui-ci est vide
  useEffect(() => {
    if (cartStatus !== "loading" && isEmpty) {
      navigate("/cart", { replace: true });
    }
  }, [isEmpty, cartStatus, navigate]);

  // Nettoyer le state checkout au démontage
  useEffect(() => {
    return () => { reset(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (cartStatus === "loading") return <CheckoutSkeleton />;

  // ── Écran de succès ────────────────────────────────────────────────────
  if (isSuccess && order) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <OrderSuccess order={order} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">

      {/* Fil d'Ariane */}
      <Breadcrumb
        category={{ id: "cart",     name: "Cart" }}
        product="Checkout"
        className="mb-6"
      />

      {/* Titre */}
      <PageHeader
        title="Complete your order"
        className="mb-8"
        titleClassName="text-2xl md:text-3xl"
      />

      {/* Erreur globale */}
      {error && (
        <div className="flex items-center gap-3 mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Layout : Formulaire (2/3) | Résumé (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Formulaire */}
        <div className="lg:col-span-2">
          <CheckoutForm
            onSubmit={(form: CheckoutFormData) => submit(form)}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Récapitulatif commande */}
        <div>
          <OrderSummary
            items={items}
            subTotal={subTotal}
            tax={tax}
            total={total}
          />
        </div>

      </div>
    </div>
  );
}