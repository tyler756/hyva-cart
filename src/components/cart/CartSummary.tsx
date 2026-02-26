import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronUp,
  Tag,
  Truck,
  Gift,
  Lock,
  ShieldCheck,
  DollarSign,
  Zap,
} from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
}

const CollapsibleSection = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
      >
        <span>{title}</span>
        {open ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )}
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
};

const CartSummary = ({ subtotal, shipping }: CartSummaryProps) => {
  const [discountCode, setDiscountCode] = useState("");
  const grandTotal = subtotal + shipping;

  return (
    <div className="bg-background rounded-xl p-6 space-y-6 sticky top-6" style={{ boxShadow: '0 1px 12px 0 rgba(64,68,79,0.07)' }}>
      <h2 className="font-display text-lg font-bold text-foreground">
        Summary
      </h2>

      {/* Totals */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">
            ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping (Estimated)</span>
          <span className="font-medium text-foreground">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (Estimated)</span>
          <span className="font-medium text-foreground">—</span>
        </div>
        <div className="border-t pt-3 flex justify-between text-base font-bold">
          <span className="text-foreground">Grand Total</span>
          <span className="text-foreground">
            ${grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Primary CTA — the ONLY green button */}
      <Button className="w-full h-13 text-base font-semibold rounded-lg" size="lg">
        <Zap className="h-4 w-4" />
        Proceed to Checkout
      </Button>

      {/* T&C */}
      <p className="text-[11px] text-muted-foreground text-center">
        By placing your order, you agree to our{" "}
        <a href="#" className="underline hover:text-foreground">terms & conditions</a>.
      </p>

      {/* Express Checkout */}
      <div className="space-y-3">
        <p className="text-xs text-center text-muted-foreground uppercase tracking-wider font-medium">
          Express Checkout
        </p>
        <div className="grid grid-cols-2 gap-2">
          {["Apple Pay", "PayPal", "Amazon Pay", "Klarna"].map((method) => (
            <button
              key={method}
              className="h-10 text-xs font-medium border rounded-lg bg-background text-foreground hover:border-foreground/30 transition-colors"
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t" />

      {/* Collapsed utilities */}
      <div className="space-y-0">
        <CollapsibleSection title="Apply Discount Code">
          <div className="flex gap-2">
            <Input
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="h-9"
            />
            <Button variant="outline" className="h-9 px-4 text-sm shrink-0">
              Apply
            </Button>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Redeem Points">
          <p className="text-xs text-muted-foreground">
            Please login to use reward points.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Estimate Shipping & Tax">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Country</label>
              <select className="w-full h-9 rounded-lg border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option>United States</option>
                <option>Canada</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">State/Province</label>
              <select className="w-full h-9 rounded-lg border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Please select a region</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Zip/Postal Code</label>
              <Input className="h-9" placeholder="Enter zip code" />
            </div>
          </div>
        </CollapsibleSection>
      </div>

      {/* Divider */}
      <div className="border-t" />

      {/* Trust signals */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" />
          <span>Secure Checkout</span>
        </div>
        <div className="h-3 w-px bg-border" />
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Verified Business</span>
        </div>
        <div className="h-3 w-px bg-border" />
        <div className="flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5" />
          <span>Price Match</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
