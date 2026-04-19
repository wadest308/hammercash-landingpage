# Design System Documentation: Cold Outreach Editorial

## 1. Overview & Creative North Star

### The Creative North Star: "The Ethereal Architect"
In a marketplace saturated with rigid, boxy SaaS dashboards, this design system breaks the mold by treating the interface as a high-end digital workspace. We are moving away from "software-as-a-utility" toward "software-as-a-craft." Our goal is to create an environment that feels both authoritative and weightless.

We achieve this through **The Ethereal Architect** principle: a philosophy where structure is defined by light and depth rather than lines and grids. By utilizing intentional asymmetry, overlapping glass surfaces, and a sophisticated "Dark Mode" palette, we ensure the UI feels editorial—like a premium financial journal—rather than a generic bootstrap template. We replace the claustrophobia of borders with the breathing room of tonal transitions.

---

## 2. Colors & Surface Philosophy

The palette is anchored in a deep, nocturnal base (`surface: #0f131d`) with high-chroma accents (`primary: #abc7ff`, `secondary: #d0bcff`) that slice through the dark to guide the user's attention.

### The "No-Line" Rule
Standard 1px solid borders are strictly prohibited for sectioning. We define space through:
- **Background Shifts:** Use `surface-container-low` against a `surface` background to denote a sidebar.
- **Tonal Contrast:** Nesting a `surface-container-highest` element within a `surface-container` to create a focal point.

### Surface Hierarchy & Nesting
Think of the UI as physical layers of smoked glass. 
- **Base Layer:** `surface` (#0f131d).
- **Navigation/Containers:** `surface-container-low` (#171b26) for subtle grouping.
- **Active Workspace:** `surface-container` (#1c1f2a).
- **Focal Points (Cards/Modals):** `surface-container-high` (#262a35).

### The "Glass & Gradient" Rule
To achieve the "Dribbble-style" premium finish:
- **Glassmorphism:** Use `surface-variant` at 40-60% opacity with a `backdrop-blur` of 12px to 24px for floating panels, dropdowns, and overlays.
- **Signature Textures:** Main CTAs and high-level metrics must utilize a linear gradient from `primary` (#abc7ff) to `primary_container` (#438fff) at a 135-degree angle. This adds "soul" and dimension that flat hex codes cannot replicate.

---

## 3. Typography

The system uses a dual-font strategy to balance editorial authority with functional legibility.

- **Display & Headlines (Manrope):** Chosen for its geometric precision and modern "tech-premium" feel. Use `display-lg` and `headline-md` for high-level statistics (e.g., Email Open Rates) and section headers. 
- **Body & Labels (Inter):** The workhorse. Used for `body-md` and `label-sm` to ensure maximum readability in high-density data areas like inbox lists and lead tables.

**The Hierarchy Rule:** Always pair a `display-sm` (Manrope) header with a `body-md` (Inter) subtext. The contrast in tracking and weight creates an immediate "High-End" visual cadence.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved via **Tonal Layering**. Instead of adding a shadow to a card, place a `surface-container-lowest` (#0a0e18) card inside a `surface-container-low` (#171b26) section. This "recessed" look creates a sophisticated, tactile feel.

### Ambient Shadows
When an element must float (e.g., a modal or a floating action button):
- **Blur:** 32px to 64px.
- **Opacity:** 4% to 8%.
- **Color:** Use a tinted version of `on_surface` (deep blue-tinted grey) rather than pure black to maintain the "glass" aesthetic.

### The "Ghost Border" Fallback
If an edge is required for accessibility, use a **Ghost Border**:
- **Token:** `outline_variant` (#414754).
- **Opacity:** 15% Max.
- **Effect:** It should feel like a catch-light on the edge of a glass pane, not a drawn line.

---

## 5. Components

### Buttons
- **Primary:** Gradient (`primary` to `primary_container`), `rounded-md` (0.75rem). No border. White text (`on_primary_fixed`).
- **Secondary:** Glass effect. Background: `surface_bright` at 10% opacity with a `backdrop-blur`. Ghost border enabled.
- **Tertiary:** Pure text using `primary` color, no background.

### Cards & Lists
- **Prohibition:** Do not use divider lines between list items. 
- **Alternative:** Use 12px of vertical white space and a subtle background hover state (`surface_container_highest` at 30% opacity).
- **Composition:** For cold email stats, use `surface-container-low` as the card base with a `tertiary` (#4cd7f6) accent bar (2px wide) on the left side to denote "Active" status.

### Input Fields
- **Background:** `surface_container_lowest` (#0a0e18).
- **Focus State:** 1px Ghost Border using `primary` at 40% opacity. A subtle "glow" using an inner-shadow with the `primary` color.
- **Labels:** Always use `label-md` in `on_surface_variant` for a muted, professional look.

### Outreach Specific Components: "The Campaign Timeline"
- Use a vertical staggered layout. Instead of a line connecting steps, use a gradient-blur background "glow" that follows the sequence of emails.
- **Status Chips:** Use `secondary_container` for "Draft" and `tertiary_container` for "Sent," but keep background opacities at 20% to allow the dark background to bleed through.

---

## 6. Do's and Don'ts

### Do:
- **Embrace Asymmetry:** Align metrics to the left and actions to the far right with significant negative space between them.
- **Use "Intentional Blur":** Apply backdrop-blur to the navigation sidebar to make the campaign content behind it feel like it exists in a 3D space.
- **Layer for Importance:** The most critical data (e.g., "Leads Converted") should be on the "highest" tier (`surface-container-highest`).

### Don't:
- **No Pure Black:** Never use `#000000`. It kills the depth. Use `surface_container_lowest` (#0a0e18) instead.
- **Avoid High-Contrast Borders:** A 100% opaque border is a failure of tonal design.
- **No Generic Icons:** Use refined, thin-stroke (1.5px) icons that match the `outline` token color. Avoid filled icons unless they represent an "Active" state.
- **Don't Overcrowd:** If you feel the need for a divider line, you probably need more white space (padding) instead.