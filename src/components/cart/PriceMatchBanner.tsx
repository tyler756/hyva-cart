import { DollarSign } from "lucide-react";

const PriceMatchBanner = () => (
  <div className="bg-accent/40 rounded-lg px-4 py-3 flex items-center gap-3">
    <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
    <p className="text-xs text-muted-foreground">
      <span className="font-semibold text-foreground">Price Match Guarantee</span> — We'll match pricing 15 days after purchase.
    </p>
  </div>
);

export default PriceMatchBanner;
