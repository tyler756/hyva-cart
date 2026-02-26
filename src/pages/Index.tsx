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
    price: 1011.11,
    qty: 1,
    options: [{ label: "Finished End Panel (required for exposed sides)", value: "1" }],
  },
  {
    id: "3",
    name: 'Euro Cafe 12" 2-Drawer Base Cabinet',
    sku: "EC-BC-1201",
    image: baseCabinet,
    price: 944.27,
    qty: 2,
    options: [{ label: "Finished End Panel (required for exposed sides)", value: "2" }],
  },
  {
    id: "4",
    name: "Midtown Black Shaker 18x15 Wall Cabinet",
    sku: "SW-W1830",
    image: wallCabinet,
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
];

const Index = () => {
  const [items, setItems] = useState<CartItemData[]>(initialItems);

  const handleQtyChange = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-background">
      
      <StoreHeader cartCount={totalItems} />

      <main className="container max-w-7xl mx-auto px-4 py-8">
        <CartHeader itemCount={totalItems} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <section className="flex-1 min-w-0" aria-label="Cart items">
            {/* Top actions row */}
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
            {/* Protection Plan upsell */}
            <div className="mb-6">
              <ProtectionPlan />
            </div>

            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">Your cart is empty.</p>
              </div>
            ) : (
              <>
                {/* Column headers (desktop) */}
                <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-6 px-4 pb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b">
                  <span>Item</span>
                  <span className="w-24 text-right">Price</span>
                  <span className="w-24 text-center">Qty</span>
                  <span className="w-24 text-right">Subtotal</span>
                </div>

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

                {/* Bottom actions */}
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

          {/* Summary Sidebar */}
          <aside className="w-full lg:w-[380px] flex-shrink-0 space-y-4">
            <PriceMatchBanner />
            <CartSummary subtotal={subtotal} shipping={0} />
          </aside>
        </div>
      </main>

      {/* ResellerRatings footer */}
      <footer className="border-t mt-12 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          ⭐ <span className="font-bold text-foreground">4.9</span> ResellerRatings · 3,400+ Reviews · Verified Store
        </p>
      </footer>

      {/* Sticky mobile checkout CTA */}
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
