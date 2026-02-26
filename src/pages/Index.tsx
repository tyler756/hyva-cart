/**
 * ============================================================
 * CART PAGE — Main Layout (Index.tsx)
 * ============================================================
 *
 * HYVÄ MAGENTO IMPLEMENTATION NOTES:
 * - This is the main cart page layout. In Hyvä, this maps to the
 *   `checkout_cart_index.xml` layout and the cart template override.
 * - State management here (useState) should be replaced by
 *   Alpine.js `x-data` on the cart container div.
 * - The two-column layout uses CSS Grid/Flexbox — translate
 *   Tailwind classes directly since Hyvä ships with Tailwind.
 *
 * LAYOUT STRUCTURE:
 * ┌─────────────────────────────────────────────────┐
 * │ StoreHeader (site-wide nav)                     │
 * ├─────────────────────────────────────────────────┤
 * │ CartHeader ("Shopping Cart" title)              │
 * ├──────────────────────┬──────────────────────────┤
 * │ Action Bar           │                          │
 * │ ProtectionPlan       │ PriceMatchBanner         │
 * │ Column Headers       │ CartSummary (STICKY)     │
 * │ CartItem (repeated)  │                          │
 * │ Bottom Action Bar    │                          │
 * ├──────────────────────┴──────────────────────────┤
 * │ Footer (ResellerRatings)                        │
 * └─────────────────────────────────────────────────┘
 * │ Sticky Mobile Checkout (fixed bottom, lg:hidden)│
 *
 * RESPONSIVE BREAKPOINTS:
 * - Mobile: single column, sticky checkout bar at bottom
 * - Desktop (lg: 1024px+): two-column, sticky summary sidebar
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";

import StoreHeader from "@/components/cart/StoreHeader";
import CartHeader from "@/components/cart/CartHeader";
import CartItem, { type CartItemData } from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import PriceMatchBanner from "@/components/cart/PriceMatchBanner";
import ProtectionPlan from "@/components/cart/ProtectionPlan";
import { ArrowLeft, Bookmark, RefreshCw, Trash2 } from "lucide-react";

import cabinetDoor from "@/assets/cabinet-door-sample.webp";
import baseCabinet from "@/assets/base-cabinet.webp";
import wallCabinet from "@/assets/wall-cabinet.webp";

/**
 * SAMPLE CART DATA
 * In Hyvä Magento, this data comes from the cart API / PHP view model.
 * Replace with Magento's quote item data:
 *   - id → quote item ID
 *   - name → product name
 *   - sku → product SKU
 *   - image → product thumbnail URL
 *   - price → final price (after catalog rules)
 *   - originalPrice → regular price (before discount)
 *   - qty → quantity in cart
 *   - options → configurable/custom options array
 */
const initialItems: CartItemData[] = [
  {
    id: "1",
    name: "Euro Cafe Sample Door",
    sku: "EC-SD-001",
    image: cabinetDoor,
    price: 20.0,
    qty: 1,
  },
  {
    id: "2",
    name: 'Euro Cafe 12" 2-Drawer Base Cabinet with 1 Inner Drawer',
    sku: "EC-BC-1200",
    image: baseCabinet,
    originalPrice: 1685.18,
    price: 1011.11,
    qty: 1,
    options: [{ label: "Finished End Panel (required for exposed sides)", value: "1" }],
  },
  {
    id: "3",
    name: 'Euro Cafe 12" 2-Drawer Base Cabinet',
    sku: "EC-BC-1201",
    image: baseCabinet,
    originalPrice: 1573.78,
    price: 944.27,
    qty: 2,
    options: [{ label: "Finished End Panel (required for exposed sides)", value: "2" }],
  },
  {
    id: "4",
    name: "Midtown Black Shaker 18x15 Wall Cabinet",
    sku: "SW-W1830",
    image: wallCabinet,
    originalPrice: 2672.85,
    price: 1603.71,
    qty: 1,
    options: [
      { label: "Hinged", value: "Left" },
      { label: "Matching Interior", value: "Yes" },
      { label: "Prepped for Glass Door (Glass Not Included)", value: "Yes" },
      { label: "Finished Sides", value: "Right Side" },
      { label: "Decreased Depth", value: 'Decrease to 9"' },
    ],
  },
  {
    id: "5",
    name: 'Euro Cafe 36" Sink Base Cabinet',
    sku: "EC-SB-3600",
    image: baseCabinet,
    originalPrice: 1890.50,
    price: 1134.30,
    qty: 1,
    options: [{ label: "Finished End Panel (required for exposed sides)", value: "1" }],
  },
  {
    id: "6",
    name: "Midtown Black Shaker 30x30 Wall Cabinet",
    sku: "SW-W3030",
    image: wallCabinet,
    originalPrice: 3245.00,
    price: 1947.00,
    qty: 1,
    options: [
      { label: "Hinged", value: "Right" },
      { label: "Matching Interior", value: "No" },
    ],
  },
  {
    id: "7",
    name: 'Euro Cafe 18" 3-Drawer Base Cabinet',
    sku: "EC-BC-1802",
    image: baseCabinet,
    originalPrice: 1725.00,
    price: 1035.00,
    qty: 1,
    options: [{ label: "Finished End Panel (required for exposed sides)", value: "2" }],
  },
  {
    id: "8",
    name: "Euro Cafe Sample Door - White Oak",
    sku: "EC-SD-002",
    image: cabinetDoor,
    price: 25.0,
    qty: 1,
  },
];

const Index = () => {
  /**
   * HYVÄ NOTE: Replace useState with Alpine.js reactive data.
   * Example: x-data="{ items: <?= $escaper->escapeHtmlAttr($cartJson) ?> }"
   */
  const [items, setItems] = useState<CartItemData[]>(initialItems);

  /**
   * QUANTITY CHANGE HANDLER
   * In Hyvä, this should call the Magento cart update API:
   *   POST /rest/V1/carts/mine/items/{itemId}
   * Or use the Hyvä cart section update mechanism.
   */
  const handleQtyChange = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  /**
   * REMOVE HANDLER
   * In Hyvä, call: DELETE /rest/V1/carts/mine/items/{itemId}
   * Then refresh cart sections via Magento's customer-data mechanism.
   */
  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  /** Computed totals — In Magento, use quote totals from the API */
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-background">
      
      {/* ============================================
          STORE HEADER — Site-wide navigation bar
          In Hyvä: this is the default header template
          ============================================ */}
      <StoreHeader cartCount={totalItems} />

      <main className="container max-w-7xl mx-auto px-4 py-8">
        {/* Cart page title */}
        <CartHeader itemCount={totalItems} />

        {/* ============================================
            TWO-COLUMN LAYOUT
            - Left: cart items (flex-1, takes remaining space)
            - Right: summary sidebar (fixed 380px width on desktop)
            - Stacks vertically on mobile (flex-col → lg:flex-row)
            ============================================ */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ==========================================
              LEFT COLUMN: Cart Items
              ========================================== */}
          <section className="flex-1 min-w-0" aria-label="Cart items">

            {/* TOP ACTION BAR
                - "Continue Shopping" left-aligned
                - Clear / Update / Save right-aligned
                HYVÄ NOTE: Wire these to Magento form actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <a href="#" className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </a>
              <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="h-3.5 w-3.5" />
                Clear Shopping Cart
              </button>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <RefreshCw className="h-3.5 w-3.5" />
                Update Shopping Cart
              </button>
              <button className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
                <Bookmark className="h-3.5 w-3.5" />
                Save Cart
              </button>
              </div>
            </div>

            {/* PROTECTION PLAN UPSELL
                HYVÄ NOTE: Conditionally render based on cart value
                or product category eligibility */}
            <div className="mb-6">
              <ProtectionPlan />
            </div>

            {items.length === 0 ? (
              /* EMPTY CART STATE */
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">Your cart is empty.</p>
              </div>
            ) : (
              <>
                {/* COLUMN HEADERS — Desktop only (hidden on mobile)
                    4-column grid: Item | Price | Qty | Subtotal */}
                <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-6 px-4 pb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b">
                  <span>Item</span>
                  <span className="w-24 text-right">Price</span>
                  <span className="w-24 text-center">Qty</span>
                  <span className="w-24 text-right">Subtotal</span>
                </div>

                {/* CART ITEM ROWS — Rendered from cart data */}
                <div>
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onQtyChange={handleQtyChange}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>

                {/* BOTTOM ACTION BAR — Mirrors top action bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-6 border-t">
                  <a href="#" className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
                    <ArrowLeft className="h-4 w-4" />
                    Continue Shopping
                  </a>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                      Clear Shopping Cart
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <RefreshCw className="h-3.5 w-3.5" />
                      Update Shopping Cart
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
                      <Bookmark className="h-3.5 w-3.5" />
                      Save Cart
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>

          {/* ==========================================
              RIGHT COLUMN: Summary Sidebar
              - Fixed width 380px on desktop (lg:w-[380px])
              - Full width on mobile
              - Contains PriceMatchBanner + CartSummary
              ========================================== */}
          <aside className="w-full lg:w-[380px] flex-shrink-0 space-y-4">
            <PriceMatchBanner />
            <CartSummary
              subtotal={subtotal}
              shipping={299}
              youSaved={434.58}
              additionalDiscounts={225.92}
              shippingMethod="Ground Shipping - Standard Delivery"
              appliedCoupons={[
                { code: "TAKE10", label: "Take10" },
                { code: "CONTRACTOR10", label: "Contractor 10% Off" },
              ]}
            />
          </aside>
        </div>
      </main>

      {/* FOOTER — ResellerRatings social proof */}
      <footer className="border-t mt-12 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          ⭐ <span className="font-bold text-foreground">4.9</span> ResellerRatings · 3,400+ Reviews · Verified Store
        </p>
      </footer>

      {/* ============================================
          STICKY MOBILE CHECKOUT BAR
          - Fixed to bottom of viewport on mobile/tablet
          - Hidden on desktop (lg:hidden)
          - Shows total + "Proceed to Checkout" CTA
          HYVÄ NOTE: Wire button to Magento checkout URL
          ============================================ */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background border-t shadow-[0_-4px_12px_rgba(0,0,0,0.1)] px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Total: </span>
              <span className="text-lg font-bold text-foreground">${subtotal.toFixed(2)}</span>
            </div>
            <Button className="flex-1 max-w-[220px] h-11 text-sm font-semibold">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
