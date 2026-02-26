import { Phone, Mail } from "lucide-react";

const UtilityBar = () => (
  <div className="bg-foreground text-primary-foreground">
    <div className="container max-w-7xl mx-auto flex items-center justify-between h-9 px-4 text-xs">
      <div className="hidden md:flex items-center gap-4">
        <a href="#" className="hover:text-accent transition-colors">Professional Discounts</a>
        <a href="#" className="hover:text-accent transition-colors">Free Shipping</a>
        <a href="#" className="hover:text-accent transition-colors">Financing</a>
        <a href="#" className="hover:text-accent transition-colors">Visit Us</a>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <a href="tel:8779922246" className="flex items-center gap-1.5 hover:text-accent transition-colors">
          <Phone className="h-3 w-3" />
          (877) 992-2246
        </a>
        <a href="#" className="bg-secondary text-secondary-foreground px-3 py-1 rounded-sm font-semibold hover:opacity-90 transition-opacity">
          ⚡ Start Your Journey
        </a>
      </div>
    </div>
  </div>
);

export default UtilityBar;
