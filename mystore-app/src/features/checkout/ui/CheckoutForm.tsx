
import { memo, useState, useCallback } from "react";
import AddressForm                     from "./AddressForm";
import PaymentMethods                  from "./PaymentMethods";
import Button                          from "@/shared/ui/Button";
import type { Address }                from "@/shared/types/Address";
import type { CheckoutFormData }       from "@/shared/types/CheckoutFormData";
import type { PaymentMethod }          from "@/shared/types/PaymentMethod";

interface CheckoutFormProps {
  onSubmit:    (data: CheckoutFormData) => void;
  isSubmitting: boolean;
}

// ── Valeurs vides ────────────────────────────────────────────────────────────

function emptyAddress(): Partial<Address> {
  return {
    civility: undefined, firstName: "", lastName: "",
    company: "", address1: "", address2: "",
    city: "", state: "", postcode: "",
  };
}

// ── Validation ───────────────────────────────────────────────────────────────

type AddressErrors = Partial<Record<keyof Address, string>>;

const REQUIRED_FIELDS: (keyof Address)[] = [
  "civility", "firstName", "lastName",
  "address1", "city", "postcode",
];

function validateAddress(addr: Partial<Address>): AddressErrors {
  const errors: AddressErrors = {};
  for (const field of REQUIRED_FIELDS) {
    if (!addr[field]?.toString().trim()) {
      errors[field] = "This field is required.";
    }
  }
  return errors;
}

function hasErrors(errors: AddressErrors) {
  return Object.keys(errors).length > 0;
}

// ── Composant ────────────────────────────────────────────────────────────────

const CheckoutForm = memo(function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const [billing,          setBilling]         = useState<Partial<Address>>(emptyAddress);
  const [shipping,         setShipping]        = useState<Partial<Address>>(emptyAddress);
  const [shipToDifferent,  setShipToDifferent] = useState(false);
  const [orderNotes,       setOrderNotes]      = useState("");
  const [paymentMethod,    setPaymentMethod]   = useState<PaymentMethod>("bank_transfer");

  const [billingErrors,  setBillingErrors]  = useState<AddressErrors>({});
  const [shippingErrors, setShippingErrors] = useState<AddressErrors>({});

  const updateBilling = useCallback((field: keyof Address, value: string) => {
    setBilling((prev) => ({ ...prev, [field]: value }));
    setBillingErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  }, []);

  const updateShipping = useCallback((field: keyof Address, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    setShippingErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  }, []);

  function handleSubmit() {
    const bErrors = validateAddress(billing);
    const sErrors = shipToDifferent ? validateAddress(shipping) : {};

    setBillingErrors(bErrors);
    setShippingErrors(sErrors);

    if (hasErrors(bErrors) || hasErrors(sErrors)) return;

    onSubmit({
      billing:         billing as Address,
      shipToDifferent,
      shipping:        shipToDifferent ? (shipping as Address) : undefined,
      orderNotes:      orderNotes.trim() || undefined,
      paymentMethod,
    });
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ── Billing ─────────────────────────────────────────────────────── */}
      <Section title="Billing address">
        <AddressForm
          prefix="billing"
          values={billing}
          onChange={updateBilling}
          errors={billingErrors}
        />
      </Section>

      {/* ── Toggle livraison différente ──────────────────────────────────── */}
      <div
        className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer select-none"
        onClick={() => setShipToDifferent((v) => !v)}
      >
        <div className={`
          w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors
          ${shipToDifferent ? "bg-indigo-600 border-indigo-600" : "bg-white border-slate-300"}
        `}>
          {shipToDifferent && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className="text-sm font-semibold text-slate-700">
          Ship to a different address
        </span>
      </div>

      {/* ── Shipping ────────────────────────────────────────────────────── */}
      {shipToDifferent && (
        <Section title="Shipping address">
          <AddressForm
            prefix="shipping"
            values={shipping}
            onChange={updateShipping}
            errors={shippingErrors}
          />
        </Section>
      )}

      {/* ── Notes de commande ───────────────────────────────────────────── */}
      <Section title="Order notes">
        <div>
          <label htmlFor="order_notes" className="block text-sm font-medium text-slate-700 mb-1">
            Special instructions
          </label>
          <textarea
            id="order_notes"
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            rows={3}
            placeholder="Notes for your order, e.g., specific delivery instructions..."
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition resize-none"
          />
        </div>
      </Section>

      {/* ── Paiement ────────────────────────────────────────────────────── */}
      <Section title="Payment method">
        <PaymentMethods
          value={paymentMethod}
          onChange={setPaymentMethod}
        />
      </Section>

      {/* ── Bouton Place Order ───────────────────────────────────────────── */}
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        variant="primary"
        size="none"
        radius="xl"
        fullWidth
        className="
          py-4 font-bold text-base
          transition-colors shadow-lg hover:shadow-xl
          flex items-center justify-center gap-3
        "
      >
        {isSubmitting ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Processing...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Place order
          </>
        )}
      </Button>

      {/* Mention sécurité */}
      <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        100% secure payment — Your data is protected
      </p>

    </div>
  );
});

// ── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
        <h2 className="font-display text-base font-bold text-slate-800">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export default CheckoutForm;