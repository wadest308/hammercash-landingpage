# Design System Specification

## 1. Overview & Creative North Star: "The Industrial Architect"
This design system is built on the philosophy of **Industrial Architecture**. It moves away from the "template" look of modern SaaS by embracing high-contrast editorial layouts, authoritative structural elements, and a "Signal vs. Noise" hierarchy. 

The Creative North Star is the intersection of a premium architectural journal and high-visibility engineering. We leverage **Charcoal Gray (#2D2D2D)** to provide a foundation of permanence and gravity, while **Safety Orange (#FF8C00)** acts as a precise functional signal. By utilizing asymmetric layouts and wide-tracking typography, we transform a professional interface into a curated digital experience.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
The color palette is designed to create a sophisticated environment where information is separated by light and mass rather than borders.

### The Palette Roles
*   **Primary Signal (`primary_container`: #FF8C00):** Reserved strictly for high-priority CTAs and functional icons. This color represents action and momentum.
*   **The Foundation (`on_tertiary_container`: #2D2D2D):** Used for heroes, footers, and primary headings to anchor the page with professional weight.
*   **The Trust Layer (`secondary`: #206298):** Used for security indicators, verified badges, and interactive links. It provides a calm, institutional contrast to the high-energy orange.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off content. 
*   **Boundary Definition:** Section boundaries must be defined solely through background shifts. For example, a `surface-container-low` (#fff1e9) section should sit directly against a `surface` (#fff8f5) background. 
*   **Surface Hierarchy:** Treat the UI as stacked physical layers. Use `surface_container_lowest` (#ffffff) for card elements to make them "pop" against the warmer `surface` tones.

### Signature Textures & Glass
*   **The CTA Soul:** To avoid a flat, "cheap" feel, primary buttons should utilize a subtle linear gradient from `primary` (#904d00) to `primary_container` (#FF8C00).
*   **Glassmorphism:** For floating navigation bars or overlays, use the `surface` color at 80% opacity with a `20px` backdrop blur to allow content to bleed through elegantly.

---

## 3. Typography: Editorial Authority
We utilize a pairing of **Work Sans** for structural impact and **Inter** for functional clarity.

*   **Display & Headlines (Work Sans):** These are the "beams" of our architecture. `display-lg` (3.5rem) should be used with tight letter-spacing (-0.02em) on Charcoal backgrounds to command attention.
*   **Title & Body (Inter):** Inter provides the precision. Use `body-lg` (1rem) for standard reading with a generous line-height (1.6) to ensure an editorial, breathable feel.
*   **The Hierarchy Identity:** Always prioritize high-contrast pairings. A `headline-lg` in Charcoal Gray should be followed by a `body-md` in `on_surface_variant` (#564334) to create a clear reading path through tonal variance.

---

## 4. Elevation & Depth: Atmospheric Layering
Forget standard drop shadows. Depth in this system is achieved through **Tonal Stacking**.

*   **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container` background to create a soft, natural lift. The eye perceives the color shift as a change in elevation.
*   **Ambient Shadows:** When a floating element (like a modal) is required, use a shadow with a `40px` blur and `4%` opacity, tinted with the `on_surface` color (#241912). Never use pure black shadows.
*   **The Ghost Border Fallback:** If accessibility requires a container definition, use the `outline_variant` (#ddc1ae) at **15% opacity**. This creates a "Ghost Border" that suggests a boundary without interrupting the visual flow.

---

## 5. Components

### Buttons & Inputs
*   **Primary Button:** Background: `primary_container` (#FF8C00); Text: `on_primary_fixed` (#2f1500). Shape: `md` (0.75rem) roundedness. 
*   **Secondary/Trust Button:** Background: `secondary_fixed` (#d0e4ff); Text: `on_secondary_container` (#005084).
*   **Input Fields:** Use `surface_container_low` for the field body. Forbid 100% opaque borders; use a `bottom-only` ghost border for an editorial, "form-like" feel.

### Cards & Surfaces
*   **Editorial Cards:** Background: `surface_container_lowest` (#FFFFFF). Corner Radius: `lg` (1rem). 
*   **The Divider Rule:** Absolutely no horizontal rules (<hr>). Use vertical white space (32px or 48px from the spacing scale) or a subtle shift to `surface_container_high` to separate card content.

### Navigation & Footer
*   **Global Footer:** Must use the Charcoal Foundation (`on_tertiary_container`). Links should be `secondary_fixed` (#d0e4ff) to ensure high-contrast legibility against the dark background.
*   **Chips:** Use `full` (9999px) roundedness for selection chips. Use `primary_fixed` (#ffdcc3) for the container and `on_primary_fixed_variant` (#6e3900) for text to create a warm, non-vibrant interactive state.

---

## 6. Do's and Don'ts

### Do
*   **Do** use intentional asymmetry. Align a heading to the left and a CTA to the far right with vast empty space between them.
*   **Do** use `primary_container` (#FF8C00) for icons that represent progress or "Security Health."
*   **Do** utilize large padding (at least 64px) between major sections to let the design "breathe."

### Don't
*   **Don't** use 1px solid black or gray borders. This immediately destroys the premium editorial feel.
*   **Don't** use Safety Orange for body text or large blocks of decorative background; it is a "Signal" color only.
*   **Don't** use standard "drop shadows" on cards; rely on the `surface` color shifts first.
*   **Don't** clutter the Charcoal sections. These are moments of "Zen" and authority—keep text minimal and high-impact.