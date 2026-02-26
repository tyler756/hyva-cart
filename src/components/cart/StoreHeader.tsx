import { Search, User, ShoppingCart, ChevronDown } from "lucide-react";

const navLinks = ["Shop Now", "Design & Services", "Deals & Financing", "Resources", "About"];

const StoreHeader = ({ cartCount }: { cartCount: number }) => (
  <header className="bg-background border-b">
    <div className="container max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
      {/* Logo */}
      <a href="/" className="font-display text-xl font-bold text-foreground tracking-tight">
        THE <span className="text-primary">RTA</span> STORE
      </a>

      {/* Nav */}
      <nav className="hidden lg:flex items-center gap-1">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="flex items-center gap-0.5 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            {link}
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </a>
        ))}
      </nav>

      {/* Icons */}
      <div className="flex items-center gap-1">
        <button className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Search">
          <Search className="h-5 w-5" />
        </button>
        <button className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Account">
          <User className="h-5 w-5" />
        </button>
        <button className="relative p-2 text-foreground hover:text-primary transition-colors" aria-label="Cart">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  </header>
);

export default StoreHeader;
