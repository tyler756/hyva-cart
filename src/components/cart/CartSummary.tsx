/**
 * ============================================================
 * CART SUMMARY SIDEBAR (CartSummary.tsx)
 * ============================================================
 *
 * The order summary panel that sits in the right column on desktop.
 *
 * KEY BEHAVIOR: STICKY POSITIONING
 * - Uses `sticky top-6` so it stays visible as users scroll
 *   through a long list of cart items.
 * - In Hyvä, apply: position: sticky; top: 1.5rem; to the wrapper.
 *
 * STRUCTURE:
 * ┌─────────────────────────────┐
 * │ "Summary" heading           │
 * ├─────────────────────────────┤
 * │ ▸ Apply Discount Code      │  ← Collapsible
 * ├─────────────────────────────┤
 * │ ▸ Redeem Points            │  ← Collapsible
 * ├─────────────────────────────┤
 * │ ▸ Estimate Shipping & Tax  │  ← Collapsible
 * ├─────────────────────────────┤
 * │ Subtotal          $X,XXX   │
 * │ Shipping           Free    │
 * │ ─────────────────────────  │
 * │ GRAND TOTAL       $X,XXX   │  ← --secondary color (copper)
 * ├─────────────────────────────┤
 * │ Terms & Conditions link    │
 * │ [⚡ Checkout] button       │  ← Primary CTA
 * ├─────────────────────────────┤
 * │ Express Checkout Options   │
 * │ bread pay / Sezzle / etc.  │
 * ├─────────────────────────────┤
 * │ 🔒 Secure  ✓ Verified     │  ← Trust badges
 * └─────────────────────────────┘
 *
 * HYVÄ MAGENTO NOTES:
 * - Discount code: wire to Magento coupon apply API
 *   POST /rest/V1/carts/mine/coupons/{couponCode}
 * - Shipping estimate: use Magento's estimate-shipping-methods API
 *   POST /rest/V1/carts/mine/estimate-shipping-methods
 * - Totals: pull from Magento quote totals
 * - Checkout button: link to /checkout or /checkout/#shipping
 * - Express checkout: integrate with payment provider SDKs
 *   (bread, Sezzle, PayPal Express, etc.)
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronUp,
  Tag,
  Truck,
  Gift,
  CreditCard,
  ShieldCheck,
  Zap,
  Lock,
  X,
} from "lucide-react";

interface AppliedCoupon {
  code: string;
  label: string;
}

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  youSaved?: number;
  redeemPoints?: { points: number; discount: number };
  additionalDiscounts?: number;
  shippingMethod?: string;
  tax?: number;
  appliedCoupons?: AppliedCoupon[];
}

/**
 * COLLAPSIBLE SECTION
 * Reusable expand/collapse component for summary sections.
 * In Hyvä, replace with Alpine.js x-show + @click toggle:
 *   <div x-data="{ open: false }">
 *     <button @click="open = !open">...</button>
 *     <div x-show="open" x-collapse>...</div>
 *   </div>
 */
const CollapsibleSection = ({
  icon: Icon,
  title,
  children,
  defaultOpen = false,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t pt-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wide"
      >
        <span className="flex items-center gap-2">
          {title}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
};

/**
 * CHIP ROW for applied coupons – single-line with "+N more" overflow.
 */
const ChipRow = ({ coupons }: { coupons: AppliedCoupon[] }) => {
  const maxVisible = 2;
  const visible = coupons.slice(0, maxVisible);
  const hiddenCount = coupons.length - maxVisible;

  return (
    <div className="flex gap-1.5 mt-1 overflow-hidden max-h-5">
      {visible.map((coupon) => (
        <span
          key={coupon.code}
          className="relative inline-flex items-center rounded-full bg-slate-50 pl-1.5 pr-4 py-px text-[11px] text-slate-500 border border-slate-200/50 whitespace-nowrap"
        >
          {coupon.label}
          <button
            className="absolute -top-1.5 -right-1.5 flex items-center justify-center h-3.5 w-3.5 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-100 transition-colors"
            aria-label={`Remove ${coupon.label}`}
          >
            <X className="h-2 w-2 text-slate-400" />
          </button>
        </span>
      ))}
      {hiddenCount > 0 && (
        <span className="inline-flex items-center rounded-full bg-slate-50 px-1.5 py-px text-[11px] text-slate-500 border border-slate-200/50 whitespace-nowrap">
          +{hiddenCount} more
        </span>
      )}
    </div>
  );
};

const CartSummary = ({ subtotal, shipping, youSaved = 0, redeemPoints, additionalDiscounts = 0, shippingMethod, tax = 0, appliedCoupons = [] }: CartSummaryProps) => {
  const [discountCode, setDiscountCode] = useState("");
  const pointsDiscount = redeemPoints?.discount ?? 0;
  const grandTotal = subtotal - additionalDiscounts - pointsDiscount + shipping + tax;

  return (
    <div className="bg-card rounded-xl border p-6 sticky top-6 space-y-5">
      <h2 className="font-display text-xl font-bold text-foreground uppercase tracking-wide">
        Summary
      </h2>

      {/* SECTION 1: Discount Code */}
      <CollapsibleSection icon={Tag} title="Apply Discount Code">
        <div className="flex gap-2">
          <Input
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="h-10"
          />
          <Button variant="secondary" className="h-10 px-4 font-semibold shrink-0">
            Apply
          </Button>
        </div>
      </CollapsibleSection>

      {/* SECTION 2: Reward Points */}
      <CollapsibleSection icon={Gift} title="Redeem Points">
        <p className="text-xs text-muted-foreground">
          Please login to use reward points.
        </p>
      </CollapsibleSection>

      {/* SECTION 3: Shipping & Tax Estimator */}
      <CollapsibleSection icon={Truck} title="Estimate Shipping and Tax">
        <p className="text-xs text-muted-foreground mb-3">
          Enter your destination to get a shipping estimate.
        </p>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Country</label>
            <select className="w-full h-10 rounded-lg border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option>United States</option>
              <option>Canada</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">State/Province</label>
            <select className="w-full h-10 rounded-lg border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Please select a region</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Zip/Postal Code</label>
            <Input className="h-10" placeholder="Enter zip code" />
          </div>
        </div>
      </CollapsibleSection>

      {/* ORDER TOTALS */}
      <div className="mt-4">
        <div className="bg-slate-100 border border-slate-200/70 rounded-xl px-4 py-3">
          {youSaved > 0 && (
            <div className="flex justify-between items-start text-sm py-2">
              <span className="text-slate-600 font-normal">You Saved</span>
              <span className="text-emerald-700 font-medium">
                ${youSaved.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          )}

          <div className="flex justify-between items-start text-sm py-2">
            <span className="text-slate-600 font-normal">Subtotal</span>
            <span className="text-slate-900 font-medium">
              ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>

          {redeemPoints && redeemPoints.discount > 0 && (
            <div className="flex justify-between items-start text-sm py-2">
              <span className="text-slate-600 font-normal">
                Redeem Points
                <span className="block text-xs text-slate-500">
                  ({redeemPoints.points.toLocaleString()} pts)
                </span>
              </span>
              <span className="text-emerald-700 font-medium">
                - ${redeemPoints.discount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          )}

          {additionalDiscounts > 0 && (
            <div className="py-2">
              <div className="flex justify-between items-start text-sm">
                <span className="text-slate-600 font-normal">Additional Discounts</span>
                <span className="text-emerald-700 font-medium">
                  - ${additionalDiscounts.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
              {appliedCoupons.length > 0 && (
                <ChipRow coupons={appliedCoupons} />
              )}
            </div>
          )}

          <div className="flex justify-between items-start text-sm py-2">
            <span className="text-slate-600 font-normal">
              Shipping &amp; Handling
              {shippingMethod && (
                <span className="block text-xs text-slate-500">
                  ({shippingMethod})
                </span>
              )}
            </span>
            <span className="text-slate-900 font-medium">
              {shipping === 0 ? "Free" : `$${shipping.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
            </span>
          </div>

          <div className="flex justify-between items-start text-sm py-2">
            <span className="text-slate-600 font-normal">Tax</span>
            <span className="text-slate-900 font-medium">
              ${tax.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="border-t border-slate-300 mt-2 pt-3">
            <div className="flex justify-between items-start">
              <span className="text-sm tracking-wide font-semibold text-slate-900 uppercase">Grand Total</span>
              <span className="text-lg font-semibold text-amber-700">
                ${grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* TERMS & CONDITIONS */}
      <p className="text-[11px] text-muted-foreground text-center mt-3">
        By placing your order, you agree to The RTA Store's{" "}
        <a href="#" className="underline hover:text-foreground">terms and conditions</a>.
      </p>

      {/* PRIMARY CHECKOUT CTA
          HYVÄ: Link to /checkout or trigger checkout initialization */}
      <Button className="w-full h-12 text-base font-semibold rounded-lg gap-2" size="lg">
        <Zap className="h-4 w-4" />
        Checkout
      </Button>

      {/* EXPRESS CHECKOUT OPTIONS
          HYVÄ: Each button should initialize its respective
          payment provider SDK (bread, Sezzle, PayPal, etc.) */}
      <div className="border-t pt-4 space-y-2">
        <p className="text-xs text-center text-muted-foreground uppercase tracking-wide font-medium">
          Express Checkout Options
        </p>
        <div className="space-y-1.5">
          {["Checkout with bread pay", "Checkout with Sezzle", "PayPal", "Check by mail", "Pay with multiple cards"].map((opt) => (
            <button
              key={opt}
              className="w-full text-xs border rounded-lg py-2 px-3 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* TRUST BADGES — Secure checkout & verified business */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-primary" />
            <span>Secure Checkout</span>
          </div>
          <div className="h-3 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span>Verified Business</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
