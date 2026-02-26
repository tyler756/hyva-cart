import { ShoppingCart } from "lucide-react";

const CartHeader = ({ itemCount }: { itemCount: number }) => (
  <div className="flex items-center justify-between border-b pb-6 mb-8">
    <div className="flex items-center gap-3">
      <ShoppingCart className="h-6 w-6 text-primary" />
      <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
        Shopping Cart
      </h1>
    </div>
    <span className="text-sm font-medium text-muted-foreground">
      {itemCount} {itemCount === 1 ? "item" : "items"}
    </span>
  </div>
);

export default CartHeader;
