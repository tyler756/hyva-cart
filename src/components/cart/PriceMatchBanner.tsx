import { DollarSign } from "lucide-react";

const PriceMatchBanner = () => (
  <div className="bg-accent/50 border border-accent rounded-lg p-4 flex items-center gap-3">
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
