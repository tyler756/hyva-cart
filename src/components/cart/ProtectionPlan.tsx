/**
 * ============================================================
 * PROTECTION PLAN UPSELL (ProtectionPlan.tsx)
 * ============================================================
 *
 * Upsell banner shown above the cart items list.
 * Offers an accident protection plan add-on product.
 *
 * STYLING:
 * - Background: --accent at 30% opacity
 * - Border: --accent
 * - Shield icon + price highlight: --secondary (burnished copper)
 * - Strikethrough original price + bold sale price
 * - "See what's covered" link: --primary
 * - "Add Now" button: secondary variant
 *
 * LAYOUT:
 * - Desktop (sm+): horizontal — icon+text left, button right
 * - Mobile (<sm): stacked — icon+text top, button below
 *
 * HYVÄ MAGENTO NOTES:
 * - This could be a cross-sell or related product widget
 * - "Add Now" should add the protection plan SKU to cart
 *   via POST /rest/V1/carts/mine/items
 * - Conditionally show based on cart value threshold or
 *   product category eligibility
 * - Prices should come from Magento catalog pricing
 */

import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

const ProtectionPlan = () => (
  <div className="bg-accent/30 border border-accent rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
    <div className="flex items-start gap-3">
      {/* Shield icon — --secondary color (copper) */}
      <ShieldCheck className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-bold text-secondary">Accident Protection Plan</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Protect your purchase from everyday life for 5 years with our{" "}
          <span className="line-through">$229</span>{" "}
          <span className="font-bold text-secondary">$149</span>{" "}
          Platinum Full Replacement Plan.
        </p>
        <a href="#" className="text-xs text-primary font-medium hover:underline mt-1 inline-block">
          See what's covered
        </a>
      </div>
    </div>
    {/* CTA button — secondary variant (copper) */}
    <Button variant="secondary" size="sm" className="font-semibold shrink-0">
      Add Now
    </Button>
  </div>
);

export default ProtectionPlan;
