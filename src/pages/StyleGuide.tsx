/**
 * STYLE GUIDE — Developer Reference Page
 * 
 * This page is a standalone visual reference for the Hyvä Magento dev team.
 * It shows all design tokens, typography, spacing, and component patterns
 * used in the cart design, with the exact Tailwind classes to use.
 *
 * Access at: /style-guide
 */

const ColorSwatch = ({ name, token, cssVar, usage }: { name: string; token: string; cssVar: string; usage: string }) => (
  <div className="flex items-start gap-4 p-4 border rounded-lg bg-card">
    <div className={`w-16 h-16 rounded-lg border flex-shrink-0 ${token}`} />
    <div className="min-w-0">
      <p className="font-semibold text-sm text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground font-mono mt-0.5">{cssVar}</p>
      <p className="text-xs text-muted-foreground font-mono">Tailwind: <span className="text-foreground">{token}</span></p>
      <p className="text-xs text-muted-foreground mt-1">{usage}</p>
    </div>
  </div>
);

const TailwindClass = ({ classes, description }: { classes: string; description: string }) => (
  <div className="flex items-start gap-3 py-2">
    <code className="text-xs bg-muted px-2 py-1 rounded font-mono text-foreground flex-shrink-0 whitespace-nowrap">{classes}</code>
    <span className="text-xs text-muted-foreground">{description}</span>
  </div>
);

const StyleGuide = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-foreground font-display mb-2">Cart Style Guide</h1>
          <p className="text-muted-foreground">Developer reference for implementing the cart design in Hyvä Magento. All Tailwind classes transfer directly since Hyvä uses Tailwind.</p>
          <div className="mt-4 p-4 rounded-lg bg-accent border">
            <p className="text-sm text-accent-foreground font-medium">💡 Tip: You can also inspect the live preview at the published URL using browser DevTools to copy exact classes.</p>
          </div>
        </div>

        {/* ── SECTION 1: COLOR PALETTE ── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground font-display mb-1">Color Palette</h2>
          <p className="text-sm text-muted-foreground mb-6">All colors are defined as CSS custom properties in HSL format. Add these to your Hyvä theme's <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">tailwind-source.css</code>.</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <ColorSwatch name="Primary — Meadow Mint" token="bg-primary" cssVar="--primary: 160 40% 31%" usage="Checkout CTA, links, active states, trust icons" />
            <ColorSwatch name="Primary Foreground" token="bg-primary-foreground" cssVar="--primary-foreground: 48 19% 97%" usage="Text on primary buttons" />
            <ColorSwatch name="Secondary — Burnished Copper" token="bg-secondary" cssVar="--secondary: 22 47% 48%" usage="Grand total price, protection plan, accent badges" />
            <ColorSwatch name="Background" token="bg-background" cssVar="--background: 0 0% 100%" usage="Page background" />
            <ColorSwatch name="Foreground" token="bg-foreground" cssVar="--foreground: 224 13% 15%" usage="Primary text (dark navy)" />
            <ColorSwatch name="Card" token="bg-card" cssVar="--card: 48 15% 97%" usage="Card/panel surfaces (bone white)" />
            <ColorSwatch name="Muted" token="bg-muted" cssVar="--muted: 120 5% 91%" usage="Subtle backgrounds, input borders" />
            <ColorSwatch name="Muted Foreground" token="bg-muted-foreground" cssVar="--muted-foreground: 224 10% 42%" usage="Secondary text, labels, SKU numbers" />
            <ColorSwatch name="Accent" token="bg-accent" cssVar="--accent: 160 25% 90%" usage="Banner backgrounds (protection plan, price match)" />
            <ColorSwatch name="Destructive — Red" token="bg-destructive" cssVar="--destructive: 0 72% 51%" usage="Sale/discount prices, delete hover, errors" />
            <ColorSwatch name="Border" token="bg-border" cssVar="--border: 120 5% 85%" usage="All borders and dividers" />
            <ColorSwatch name="Ring — Copper" token="bg-ring" cssVar="--ring: 22 47% 48%" usage="Focus ring on interactive elements" />
          </div>
        </section>

        {/* ── SECTION 2: TYPOGRAPHY ── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground font-display mb-1">Typography</h2>
          <p className="text-sm text-muted-foreground mb-6">Two font families are used. Both are loaded from Google Fonts.</p>

          <div className="space-y-6">
            <div className="p-6 border rounded-lg bg-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3 font-medium">Display Font — Headings & Logo</p>
              <p className="font-display text-3xl font-bold text-foreground">Playfair Display</p>
              <p className="text-xs text-muted-foreground font-mono mt-2">font-family: 'Playfair Display', serif</p>
              <p className="text-xs text-muted-foreground font-mono">Tailwind class: <span className="text-foreground">font-display</span></p>
              <p className="text-xs text-muted-foreground mt-2">Weights: 600 (semibold), 700 (bold)</p>
              <p className="text-xs text-muted-foreground">Used on: "Shopping Cart" title, section headings</p>
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3 font-medium">Body Font — All UI Text</p>
              <p className="font-body text-3xl font-bold text-foreground">Inter</p>
              <p className="text-xs text-muted-foreground font-mono mt-2">font-family: 'Inter', system-ui, sans-serif</p>
              <p className="text-xs text-muted-foreground font-mono">Tailwind class: <span className="text-foreground">font-body</span></p>
              <p className="text-xs text-muted-foreground mt-2">Weights: 300, 400, 500, 600, 700</p>
              <p className="text-xs text-muted-foreground">Used on: body text, buttons, labels, prices, SKUs</p>
            </div>
          </div>

          <div className="mt-6 p-6 border rounded-lg bg-card">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3 font-medium">Type Scale Used</p>
            <div className="space-y-3">
              <div className="flex items-baseline gap-4">
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono w-28 flex-shrink-0">text-2xl</code>
                <span className="text-2xl font-display font-bold text-foreground">Shopping Cart (4)</span>
              </div>
              <div className="flex items-baseline gap-4">
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono w-28 flex-shrink-0">text-lg</code>
                <span className="text-lg font-bold text-foreground">$4,734.39</span>
              </div>
              <div className="flex items-baseline gap-4">
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono w-28 flex-shrink-0">text-sm</code>
                <span className="text-sm font-semibold text-foreground">Euro Cafe 12" Base Cabinet</span>
              </div>
              <div className="flex items-baseline gap-4">
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono w-28 flex-shrink-0">text-xs</code>
                <span className="text-xs text-muted-foreground">Finished End Panel: 2</span>
              </div>
              <div className="flex items-baseline gap-4">
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono w-28 flex-shrink-0">text-[11px]</code>
                <span className="text-[11px] text-muted-foreground">SKU: EC-BC-1200</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: SPACING & LAYOUT ── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground font-display mb-1">Spacing & Layout</h2>
          <p className="text-sm text-muted-foreground mb-6">Key layout patterns and their Tailwind classes.</p>

          <div className="space-y-4">
            <div className="p-6 border rounded-lg bg-card">
              <p className="text-sm font-semibold text-foreground mb-3">Page Container</p>
              <TailwindClass classes="container max-w-7xl mx-auto px-4 py-8" description="Main content wrapper — 1280px max width, horizontal padding" />
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <p className="text-sm font-semibold text-foreground mb-3">Two-Column Layout (Desktop)</p>
              <TailwindClass classes="flex flex-col lg:flex-row gap-8" description="Stacks on mobile, side-by-side at 1024px+" />
              <TailwindClass classes="flex-1 min-w-0" description="Left column — cart items (takes remaining space)" />
              <TailwindClass classes="w-full lg:w-[380px] flex-shrink-0" description="Right column — summary sidebar (fixed 380px on desktop)" />
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <p className="text-sm font-semibold text-foreground mb-3">Cart Item Row</p>
              <TailwindClass classes="py-6 border-b" description="Vertical padding between items with bottom border" />
              <TailwindClass classes="grid grid-cols-[1fr_auto_auto_auto] gap-6 items-center" description="Desktop 4-column grid: Item | Price | Qty | Subtotal" />
              <TailwindClass classes="w-20 h-20 rounded-lg overflow-hidden border" description="Product thumbnail — 80×80px with rounded corners" />
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <p className="text-sm font-semibold text-foreground mb-3">Sticky Summary Sidebar</p>
              <TailwindClass classes="sticky top-6" description="Sticks to viewport on scroll, 24px from top" />
              <TailwindClass classes="p-6 rounded-xl border bg-card" description="Card container with padding and rounded corners" />
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <p className="text-sm font-semibold text-foreground mb-3">Sticky Mobile Checkout Bar</p>
              <TailwindClass classes="fixed bottom-0 left-0 right-0 z-50 lg:hidden" description="Fixed to bottom, hidden on desktop" />
              <TailwindClass classes="bg-background border-t shadow-[0_-4px_12px_rgba(0,0,0,0.1)]" description="White background with top border and upward shadow" />
            </div>
          </div>
        </section>

        {/* ── SECTION 4: COMPONENT PATTERNS ── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground font-display mb-1">Component Patterns</h2>
          <p className="text-sm text-muted-foreground mb-6">Key UI patterns and how to build them.</p>

          <div className="space-y-4">
            {/* Quantity Stepper */}
            <div className="p-6 border rounded-lg bg-card">
              <p className="text-sm font-semibold text-foreground mb-3">Quantity Stepper</p>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1 border rounded-lg bg-card">
                  <button className="p-1.5 text-muted-foreground hover:text-foreground">−</button>
                  <span className="w-8 text-center text-sm font-medium text-foreground">2</span>
                  <button className="p-1.5 text-muted-foreground hover:text-foreground">+</button>
                </div>
                <span className="text-xs text-muted-foreground">Live example</span>
              </div>
              <TailwindClass classes="flex items-center gap-1 border rounded-lg bg-card" description="Container" />
              <TailwindClass classes="p-1.5 text-muted-foreground hover:text-foreground" description="± buttons" />
              <TailwindClass classes="w-8 text-center text-sm font-medium" description="Quantity display" />
              <p className="text-xs text-muted-foreground mt-2">Alpine.js: Use <code className="bg-muted px-1 rounded">x-data="{'{ qty: 1 }'}"</code> with <code className="bg-muted px-1 rounded">@click="qty = Math.max(1, qty - 1)"</code></p>
            </div>

            {/* Discount Price Display */}
            <div className="p-6 border rounded-lg bg-card">
              <p className="text-sm font-semibold text-foreground mb-3">Discount Price Display</p>
              <div className="flex items-center gap-4 mb-3">
                <div>
                  <p className="text-sm text-muted-foreground line-through">$1,685.18</p>
                  <p className="text-sm font-semibold text-destructive">$1,011.11</p>
                </div>
                <span className="text-xs text-muted-foreground">When originalPrice &gt; price</span>
              </div>
              <TailwindClass classes="text-sm text-muted-foreground line-through" description="Original price (strikethrough)" />
              <TailwindClass classes="text-sm font-semibold text-destructive" description="Sale price (red)" />
            </div>

            {/* Checkout Button */}
            <div className="p-6 border rounded-lg bg-card">
              <p className="text-sm font-semibold text-foreground mb-3">Checkout CTA Button</p>
              <button className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-sm mb-3">
                Proceed to Checkout
              </button>
              <TailwindClass classes="w-full h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-sm" description="Full-width primary button" />
            </div>

            {/* Hover Actions */}
            <div className="p-6 border rounded-lg bg-card">
              <p className="text-sm font-semibold text-foreground mb-3">Hover Action Buttons (Desktop)</p>
              <TailwindClass classes="absolute right-0 bottom-3" description="Position at bottom-right of item row" />
              <TailwindClass classes="opacity-0 group-hover:opacity-100 transition-opacity" description="Hidden by default, shown on row hover" />
              <TailwindClass classes="pointer-events-none group-hover:pointer-events-auto" description="Prevent click when hidden" />
              <p className="text-xs text-muted-foreground mt-2">The parent row needs <code className="bg-muted px-1 rounded">group relative</code> class.</p>
            </div>

            {/* Collapsible Sections */}
            <div className="p-6 border rounded-lg bg-card">
              <p className="text-sm font-semibold text-foreground mb-3">Collapsible Sections (Summary Sidebar)</p>
              <p className="text-xs text-muted-foreground mb-2">Used for "Apply Discount Code" and "Estimate Shipping" in the cart summary.</p>
              <TailwindClass classes="cursor-pointer flex items-center justify-between" description="Toggle header" />
              <p className="text-xs text-muted-foreground mt-2">Alpine.js: <code className="bg-muted px-1 rounded">x-data="{'{ open: false }'}"</code> with <code className="bg-muted px-1 rounded">x-show="open"</code> and <code className="bg-muted px-1 rounded">x-transition</code></p>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: RESPONSIVE BREAKPOINTS ── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground font-display mb-1">Responsive Breakpoints</h2>
          <p className="text-sm text-muted-foreground mb-6">Standard Tailwind breakpoints used in the design.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left px-4 py-3 font-medium text-foreground">Breakpoint</th>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Width</th>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">Default</td>
                  <td className="px-4 py-3 text-muted-foreground">&lt; 768px</td>
                  <td className="px-4 py-3 text-muted-foreground">Single column, stacked cards, sticky bottom checkout bar</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">md (768px)</td>
                  <td className="px-4 py-3 text-muted-foreground">768px+</td>
                  <td className="px-4 py-3 text-muted-foreground">Cart items switch to 4-column grid layout</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">lg (1024px)</td>
                  <td className="px-4 py-3 text-muted-foreground">1024px+</td>
                  <td className="px-4 py-3 text-muted-foreground">Two-column layout (items + sidebar), mobile checkout bar hidden</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── SECTION 6: MAGENTO / ALPINE.JS QUICK REFERENCE ── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground font-display mb-1">Hyvä / Alpine.js Quick Reference</h2>
          <p className="text-sm text-muted-foreground mb-6">Key mappings from React patterns to Hyvä equivalents.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left px-4 py-3 font-medium text-foreground">React Pattern</th>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Hyvä Equivalent</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">useState(items)</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">x-data="{'{ items: <?= $cartJson ?> }'}"</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">onClick={'{() => fn()}'}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">@click="fn()"</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">items.map(item =&gt; ...)</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{'<template x-for="item in items">'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">{'{ condition && <div> }'}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">x-show="condition" or x-if="condition"</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">{'${item.price}'}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">x-text="item.price" or {'<?= $block->formatPrice() ?>'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">POST /rest/V1/carts/mine/items</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">Use Hyvä cart update via customer-data sections</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── SECTION 7: FILES REFERENCE ── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground font-display mb-1">Source File Reference</h2>
          <p className="text-sm text-muted-foreground mb-6">Which files correspond to which parts of the cart.</p>

          <div className="space-y-3">
            {[
              { file: "src/pages/Index.tsx", desc: "Main layout — 2-column grid, action bars, page structure" },
              { file: "src/components/cart/CartItem.tsx", desc: "Item row — desktop grid + mobile card, qty stepper, prices" },
              { file: "src/components/cart/CartSummary.tsx", desc: "Sticky sidebar — totals, coupon, shipping estimate, checkout CTA" },
              { file: "src/components/cart/StoreHeader.tsx", desc: "Top navigation bar with cart badge" },
              { file: "src/components/cart/PriceMatchBanner.tsx", desc: "Trust/price match upsell banner" },
              { file: "src/components/cart/ProtectionPlan.tsx", desc: "Protection plan upsell block" },
              { file: "src/components/cart/CartHeader.tsx", desc: "'Shopping Cart' title with item count" },
              { file: "src/index.css", desc: "All CSS custom properties (design tokens)" },
              { file: "tailwind.config.ts", desc: "Tailwind color/spacing/animation config" },
            ].map(({ file, desc }) => (
              <div key={file} className="flex items-start gap-3 p-3 border rounded-lg">
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono flex-shrink-0">{file}</code>
                <span className="text-xs text-muted-foreground">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">Generated from the cart prototype. All Tailwind classes are directly usable in Hyvä themes.</p>
        </footer>
      </div>
    </div>
  );
};

export default StyleGuide;
