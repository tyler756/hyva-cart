import { Minus, Plus, Pencil, Trash2 } from "lucide-react";

export interface CartItemData {
  id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  originalPrice?: number;
  qty: number;
  options?: { label: string; value: string }[];
}

interface CartItemProps {
  item: CartItemData;
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2 });

const CartItem = ({ item, onQtyChange, onRemove }: CartItemProps) => {
  const subtotal = item.price * item.qty;
  const originalSubtotal = item.originalPrice ? item.originalPrice * item.qty : null;
  const hasDiscount = !!item.originalPrice && item.originalPrice > item.price;

  return (
    <div className="py-6 border-b last:border-b-0">
      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-6 items-start">
        {/* Item info */}
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground text-sm leading-tight mb-0.5">{item.name}</h3>
            <p className="text-[11px] text-muted-foreground/70 mb-1.5">SKU: {item.sku}</p>
            {item.options && item.options.length > 0 && (
              <div className="space-y-0.5">
                {item.options.map((opt) => (
                  <p key={opt.label} className="text-xs text-muted-foreground">
                    <span className="font-medium">{opt.label}:</span> {opt.value}
                  </p>
                ))}
              </div>
            )}
            {/* Actions as text links */}
            <div className="flex items-center gap-3 mt-2">
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <Pencil className="h-3 w-3" />
                Edit
              </button>
              <button
                onClick={() => onRemove(item.id)}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" />
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Price column */}
        <div className="w-24 text-right">
          {hasDiscount && (
            <p className="text-xs text-muted-foreground line-through">${fmt(item.originalPrice!)}</p>
          )}
          <p className={`text-sm font-semibold ${hasDiscount ? 'text-destructive' : 'text-foreground'}`}>
            ${fmt(item.price)}
          </p>
        </div>

        {/* Qty stepper */}
        <div className="w-24 flex justify-center">
          <div className="inline-flex items-center border rounded-lg">
            <button
              onClick={() => onQtyChange(item.id, Math.max(1, item.qty - 1))}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-medium text-foreground">{item.qty}</span>
            <button
              onClick={() => onQtyChange(item.id, item.qty + 1)}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="w-24 text-right">
          {hasDiscount && originalSubtotal && (
            <p className="text-xs text-muted-foreground line-through">${fmt(originalSubtotal)}</p>
          )}
          <p className={`text-sm font-semibold ${hasDiscount ? 'text-destructive' : 'text-foreground'}`}>
            ${fmt(subtotal)}
          </p>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex gap-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-tight mb-0.5">{item.name}</h3>
          <p className="text-[11px] text-muted-foreground/70 mb-1">SKU: {item.sku}</p>
          {item.options && item.options.length > 0 && (
            <div className="space-y-0.5 mt-1">
              {item.options.map((opt) => (
                <p key={opt.label} className="text-xs text-muted-foreground">
                  <span className="font-medium">{opt.label}:</span> {opt.value}
                </p>
              ))}
            </div>
          )}
          <div className="mt-3 flex items-center justify-between">
            <div>
              {hasDiscount && originalSubtotal && (
                <p className="text-xs text-muted-foreground line-through">${fmt(originalSubtotal)}</p>
              )}
              <p className={`text-sm font-semibold ${hasDiscount ? 'text-destructive' : 'text-foreground'}`}>
                ${fmt(subtotal)}
              </p>
            </div>
            <div className="inline-flex items-center border rounded-lg">
              <button onClick={() => onQtyChange(item.id, Math.max(1, item.qty - 1))} className="p-1.5 text-muted-foreground hover:text-foreground" aria-label="Decrease quantity">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-medium text-foreground">{item.qty}</span>
              <button onClick={() => onQtyChange(item.id, item.qty + 1)} className="p-1.5 text-muted-foreground hover:text-foreground" aria-label="Increase quantity">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <Pencil className="h-3 w-3" />
              Edit
            </button>
            <button onClick={() => onRemove(item.id)} className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1">
              <Trash2 className="h-3 w-3" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
