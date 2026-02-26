/**
 * ============================================================
 * STORE HEADER (StoreHeader.tsx)
 * ============================================================
 *
 * Site-wide navigation bar. In Hyvä Magento, this maps to the
 * default header template (Magento_Theme::html/header.phtml).
 *
 * STRUCTURE:
 * ┌──────────────────────────────────────────────────┐
 * │ Logo    Nav Links (desktop only)    Icons        │
 * └──────────────────────────────────────────────────┘
 *
 * HYVÄ NOTES:
 * - Logo: replace with Magento's logo block
 * - Nav: use Magento's top navigation menu (catalog categories)
 * - Cart icon badge: bind to Alpine.js cart section data
 *   `$store.cart.items_count` or equivalent
 * - Search: integrate with Magento's search form/autocomplete
 * - Account: link to /customer/account or show login/register
 */

import { Search, User, ShoppingCart, ChevronDown } from "lucide-react";

/** Navigation links — replace with Magento category menu */
const navLinks = ["Shop Now", "Design & Services", "Deals & Financing", "Resources", "About"];

const StoreHeader = ({ cartCount }: { cartCount: number }) => (
  <header className="bg-background border-b">
    <div className="container max-w-7xl mx-auto flex items-center justify-between h-16 px-4">

      {/* LOGO — Replace with Magento logo block */}
      <a href="/" className="font-display text-xl font-bold text-foreground tracking-tight">
        THE <span className="text-primary">RTA</span> STORE
      </a>

      {/* MAIN NAV — Hidden on mobile (lg:flex)
          In Hyvä: render from Magento's topmenu block */}
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

      {/* UTILITY ICONS — Search, Account, Cart */}
      <div className="flex items-center gap-1">
        <button className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Search">
          <Search className="h-5 w-5" />
        </button>
        <button className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Account">
          <User className="h-5 w-5" />
        </button>
        {/* Cart icon with item count badge
            Badge uses --primary bg with --primary-foreground text */}
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
