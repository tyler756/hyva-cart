/**
 * ============================================================
 * CART ITEM ROW (CartItem.tsx)
 * ============================================================
 *
 * Renders a single cart line item with two responsive layouts:
 *
 * DESKTOP (md+): 4-column grid row
 * ┌──────────────────┬──────────┬──────────┬──────────┐
 * │ Image + Details  │  Price   │   Qty    │ Subtotal │
 * └──────────────────┴──────────┴──────────┴──────────┘
 *   Edit/Delete buttons appear on hover (bottom-right)
 *
 * MOBILE (<md): Stacked card layout
 * ┌────┬─────────────────────┐
 * │ Img│ Name, SKU, Options  │
 * │    │ Price ←→ Qty Stepper│
 * │    │ [Edit] [Delete]     │
 * └────┴─────────────────────┘
 *
 * HYVÄ MAGENTO NOTES:
 * - Replace React props with Alpine.js reactive data
 * - Image: use Magento's product thumbnail resize helper
 * - Options: render from quote item's product_option data
 * - Qty change: POST to /rest/V1/carts/mine/items/{id}
 * - Remove: DELETE to /rest/V1/carts/mine/items/{id}
 * - Prices: use Magento's price formatting (store currency)
 *
 * DISCOUNT DISPLAY:
 * - If originalPrice exists and > price, show strikethrough original
 *   and highlight the sale price in --destructive (red)
 */

import { Minus, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Cart item data shape — maps to Magento quote item fields */
export interface CartItemData {
  id: string;              // Magento quote item ID
  name: string;            // Product name
  sku: string;             // Product SKU
  image: string;           // Thumbnail URL
  price: number;           // Final/sale price per unit
  originalPrice?: number;  // Regular price (before discount), optional
  qty: number;             // Quantity in cart
  options?: { label: string; value: string }[]; // Configurable/custom options
}

interface CartItemProps {
  item: CartItemData;
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

/** Format number as USD with 2 decimal places */
const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2 });

const CartItem = ({ item, onQtyChange, onRemove }: CartItemProps) => {
  const subtotal = item.price * item.qty;
  const originalSubtotal = item.originalPrice ? item.originalPrice * item.qty : null;
  const hasDiscount = !!item.originalPrice && item.originalPrice > item.price;

  return (
    <div className="group relative py-6 border-b last:border-b-0">

      {/* ==========================================
          DESKTOP LAYOUT (md+ screens)
          4-column grid matching the column headers
          ========================================== */}
      <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-6 items-center">

        {/* COLUMN 1: Product image + details */}
        <div className="flex gap-4">
          {/* Product thumbnail — 80x80px, rounded with border */}
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0 border">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground text-sm leading-tight mb-0.5">{item.name}</h3>
            <p className="text-[11px] text-muted-foreground mb-1">SKU: {item.sku}</p>
            {/* Configurable/custom options list */}
            {item.options && item.options.length > 0 && (
              <div className="space-y-0.5 mt-1">
                {item.options.map((opt) => (
                  <p key={opt.label} className="text-xs text-muted-foreground">
                    <span className="font-medium">{opt.label}:</span> {opt.value}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* COLUMN 2: Unit price
            Shows strikethrough original + red sale price if discounted */}
        <div className="w-24 text-right">
          {hasDiscount && (
            <p className="text-sm text-muted-foreground line-through">${fmt(item.originalPrice!)}</p>
          )}
          <p className={`text-sm font-semibold ${hasDiscount ? 'text-destructive' : 'text-foreground'}`}>
            ${fmt(item.price)}
          </p>
        </div>

        {/* COLUMN 3: Quantity stepper
            - Minus button (min 1)
            - Current qty display
            - Plus button
            HYVÄ NOTE: Use Alpine.js @click handlers and bind to cart update */}
        <div className="w-24 flex justify-center">
          <div className="flex items-center gap-1 border rounded-lg bg-card">
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

        {/* COLUMN 4: Line subtotal (price × qty) */}
        <div className="w-24 text-right">
          {hasDiscount && originalSubtotal && (
            <p className="text-sm text-muted-foreground line-through">${fmt(originalSubtotal)}</p>
          )}
          <p className={`text-sm font-semibold ${hasDiscount ? 'text-destructive' : 'text-foreground'}`}>
            ${fmt(subtotal)}
          </p>
        </div>
      </div>

      {/* HOVER ACTION BUTTONS (desktop only)
          Appear bottom-right on row hover
          Uses CSS opacity transition for smooth reveal */}
      <div className="hidden md:flex absolute right-0 bottom-3 gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => onRemove(item.id)}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* ==========================================
          MOBILE LAYOUT (<md screens)
          Horizontal: image left, details right
          Action buttons always visible (no hover)
          ========================================== */}
      <div className="md:hidden flex gap-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0 border">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-tight mb-0.5">{item.name}</h3>
          <p className="text-[11px] text-muted-foreground mb-1">SKU: {item.sku}</p>
          {item.options && item.options.length > 0 && (
            <div className="space-y-0.5 mt-1">
              {item.options.map((opt) => (
                <p key={opt.label} className="text-xs text-muted-foreground">
                  <span className="font-medium">{opt.label}:</span> {opt.value}
                </p>
              ))}
            </div>
          )}
          {/* Price + Qty row — space-between alignment */}
          <div className="mt-2 flex items-center justify-between">
            <div>
              {hasDiscount && (
                <p className="text-xs text-muted-foreground line-through">${fmt(originalSubtotal!)}</p>
              )}
              <p className={`text-sm font-semibold ${hasDiscount ? 'text-destructive' : 'text-foreground'}`}>
                ${fmt(subtotal)}
              </p>
            </div>
            <div className="flex items-center gap-1 border rounded-lg bg-card">
              <button onClick={() => onQtyChange(item.id, Math.max(1, item.qty - 1))} className="p-1.5 text-muted-foreground hover:text-foreground" aria-label="Decrease quantity">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-medium text-foreground">{item.qty}</span>
              <button onClick={() => onQtyChange(item.id, item.qty + 1)} className="p-1.5 text-muted-foreground hover:text-foreground" aria-label="Increase quantity">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          {/* Mobile action buttons — always visible */}
          <div className="flex gap-1 mt-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => onRemove(item.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
