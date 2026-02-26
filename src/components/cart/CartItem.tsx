import { Minus, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CartItemData {
  id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  options?: { label: string; value: string }[];
}

interface CartItemProps {
  item: CartItemData;
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onQtyChange, onRemove }: CartItemProps) => {
  const subtotal = item.price * item.qty;

  return (
    <div className="group flex gap-4 md:gap-6 py-6 border-b last:border-b-0 transition-colors hover:bg-muted/30 -mx-4 px-4 rounded-lg">
      {/* Product Image */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0 border">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-sm md:text-base leading-tight mb-1">
          {item.name}
        </h3>

        {item.options && item.options.length > 0 && (
          <div className="space-y-0.5 mt-1.5">
            {item.options.map((opt) => (
              <p key={opt.label} className="text-xs text-muted-foreground">
                <span className="font-medium">{opt.label}:</span> {opt.value}
              </p>
            ))}
          </div>
        )}

        {/* Mobile price */}
        <p className="mt-2 text-sm font-semibold text-foreground md:hidden">
          ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Price (desktop) */}
      <div className="hidden md:flex flex-col items-end justify-between">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">
            ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })} each
          </p>
          <p className="text-base font-semibold text-foreground mt-0.5">
            ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Qty + Actions */}
      <div className="flex flex-col items-end justify-between">
        <div className="flex items-center gap-1 border rounded-lg bg-card">
          <button
            onClick={() => onQtyChange(item.id, Math.max(1, item.qty - 1))}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-medium text-foreground">
            {item.qty}
          </span>
          <button
            onClick={() => onQtyChange(item.id, item.qty + 1)}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
