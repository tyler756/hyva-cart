import { useState } from "react";
import { Button } from "@/components/ui/button";
import StoreHeader from "@/components/cart/StoreHeader";
import CartHeader from "@/components/cart/CartHeader";
import CartItem, { type CartItemData } from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { Shield } from "lucide-react";

import cabinetDoor from "@/assets/cabinet-door-sample.webp";
import baseCabinet from "@/assets/base-cabinet.webp";
import wallCabinet from "@/assets/wall-cabinet.webp";

const initialItems: CartItemData[] = [
  {
    id: "1",
    name: "Euro Cafe Sample Door",
    image: cabinetDoor,
    price: 20.0,
    qty: 1,
  },
  {
    id: "2",
    name: 'Euro Cafe 12" 2-Drawer Base Cabinet with 1 Inner Drawer',
    image: baseCabinet,
    price: 1011.11,
    qty: 1,
    options: [{ label: "Finished End Panel (required for exposed sides)", value: "1" }],
  },
  {
    id: "3",
    name: 'Euro Cafe 12" 2-Drawer Base Cabinet',
    image: baseCabinet,
    price: 944.27,
    qty: 2,
    options: [{ label: "Finished End Panel (required for exposed sides)", value: "2" }],
  },
  {
    id: "4",
    name: "Midtown Black Shaker 18x15 Wall Cabinet",
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
        {/* Warranty Banner */}
        <div className="mb-6">
          <Button variant="secondary" className="gap-2 font-semibold">
            <Shield className="h-4 w-4 text-primary" />
            Add Warranty Protection
          </Button>
        </div>

        <CartHeader itemCount={totalItems} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <section className="flex-1 min-w-0" aria-label="Cart items">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">Your cart is empty.</p>
              </div>
            ) : (
              <>
                <div className="divide-y-0">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onQtyChange={handleQtyChange}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>

                {/* Cart Actions */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t">
                  <Button
                    variant="outline"
                    className="font-medium text-muted-foreground hover:text-destructive hover:border-destructive"
                  >
                    Clear Shopping Cart
                  </Button>
                  <Button variant="secondary" className="font-semibold">
                    Update Shopping Cart
                  </Button>
                </div>
              </>
            )}
          </section>

          {/* Summary Sidebar */}
          <aside className="w-full lg:w-[380px] flex-shrink-0">
            <CartSummary subtotal={subtotal} shipping={0} />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Index;
