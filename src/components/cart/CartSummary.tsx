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
} from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
}

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

const CartSummary = ({ subtotal, shipping }: CartSummaryProps) => {
  const [discountCode, setDiscountCode] = useState("");
  const grandTotal = subtotal + shipping;

  return (
    <div className="bg-card rounded-xl border p-6 sticky top-6 space-y-5">
      <h2 className="font-display text-xl font-bold text-foreground uppercase tracking-wide">
        Summary
      </h2>

      {/* Collapsible sections */}
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

      <CollapsibleSection icon={Gift} title="Redeem Points">
        <p className="text-xs text-muted-foreground">
          Please login to use reward points.
        </p>
      </CollapsibleSection>

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

      {/* Totals */}
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">
            ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium text-foreground">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span className="text-foreground uppercase">Grand Total</span>
          <span className="text-secondary">
            ${grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* T&C */}
      <p className="text-[11px] text-muted-foreground text-center">
        By placing your order, you agree to The RTA Store's{" "}
        <a href="#" className="underline hover:text-foreground">terms and conditions</a>.
      </p>

      {/* Checkout Button */}
      <Button className="w-full h-12 text-base font-semibold rounded-lg gap-2" size="lg">
        <Zap className="h-4 w-4" />
        Checkout
      </Button>


      {/* More checkout options */}
      <div className="border-t pt-4 space-y-2">
        <p className="text-xs text-center text-muted-foreground uppercase tracking-wide font-medium">
          More Checkout Options
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

      {/* TrustedSite badge */}
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
