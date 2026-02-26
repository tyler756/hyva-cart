/**
 * ============================================================
 * PRICE MATCH GUARANTEE BANNER (PriceMatchBanner.tsx)
 * ============================================================
 *
 * Positioned above the cart summary sidebar to build buyer confidence.
 *
 * STYLING:
 * - Background: --accent at 50% opacity (soft mint green)
 * - Border: --accent (mint green)
 * - Icon circle: --primary at 10% opacity bg, --primary icon color
 * - "GUARANTEE" text: --secondary (burnished copper) + italic
 *
 * HYVÄ NOTE: This is a static CMS block. You can create it as a
 * Magento CMS Static Block and reference it in the cart layout XML,
 * or hardcode it in the Hyvä cart template.
 */

import { DollarSign } from "lucide-react";

const PriceMatchBanner = () => (
  <div className="bg-accent/50 border border-accent rounded-lg p-4 flex items-center gap-3">
    {/* Icon container — circular with subtle primary tint */}
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
      <DollarSign className="h-5 w-5 text-primary" />
    </div>
    <div>
      <p className="text-sm font-bold text-foreground">
        PRICE MATCH <span className="text-secondary italic">GUARANTEE</span>
      </p>
      <p className="text-xs text-muted-foreground">
        We'll Match Pricing 15 Days After Purchase
      </p>
    </div>
  </div>
);

export default PriceMatchBanner;
