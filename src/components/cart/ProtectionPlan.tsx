import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

const ProtectionPlan = () => (
  <div className="border rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-accent/30">
    <div className="flex items-start gap-3">
      <ShieldCheck className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-bold text-foreground">Accident Protection Plan</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Protect your purchase for 5 years —{" "}
          <span className="line-through">$229</span>{" "}
          <span className="font-bold text-secondary">$149</span>
        </p>
        <button className="text-xs text-muted-foreground hover:text-foreground mt-1 inline-block border rounded px-2 py-0.5 transition-colors">
          See what's covered
        </button>
      </div>
    </div>
    <Button variant="secondary" size="sm" className="font-semibold shrink-0">
      Add Protection
    </Button>
  </div>
);

export default ProtectionPlan;
