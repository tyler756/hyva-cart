/**
 * ============================================================
 * CART PAGE HEADER (CartHeader.tsx)
 * ============================================================
 *
 * Simple page heading for the cart.
 *
 * STYLING:
 * - Uses --font-display (Playfair Display) for the heading
 * - Responsive text size: text-3xl on mobile, text-4xl on md+
 * - Uppercase, bold, wide tracking
 *
 * HYVÄ NOTE: This replaces the default Magento cart page title.
 * In layout XML, you can hide the default title block and use
 * this custom template instead.
 */

const CartHeader = ({ itemCount }: { itemCount: number }) => (
  <div className="py-8 text-left">
    <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
      Shopping Cart
    </h1>
  </div>
);

export default CartHeader;
