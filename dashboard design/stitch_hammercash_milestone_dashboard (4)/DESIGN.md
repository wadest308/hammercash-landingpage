---
name: HammerCash Design System
colors:
  surface: '#fff8f6'
  surface-dim: '#edd5cb'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1eb'
  surface-container: '#ffeae0'
  surface-container-high: '#fce3d9'
  surface-container-highest: '#f6ded3'
  on-surface: '#251913'
  on-surface-variant: '#584237'
  inverse-surface: '#3c2d26'
  inverse-on-surface: '#ffede6'
  outline: '#8c7164'
  outline-variant: '#e0c0b1'
  surface-tint: '#9d4300'
  primary: '#9d4300'
  on-primary: '#ffffff'
  primary-container: '#f97316'
  on-primary-container: '#582200'
  inverse-primary: '#ffb690'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#006398'
  on-tertiary: '#ffffff'
  tertiary-container: '#00a2f4'
  on-tertiary-container: '#003554'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#ffb690'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#783200'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#cde5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d32'
  on-tertiary-fixed-variant: '#004b74'
  background: '#fff8f6'
  on-background: '#251913'
  surface-variant: '#f6ded3'
  canvas-bg: '#FAFAFA'
  surface-card: '#FFFFFF'
  text-primary: '#171717'
  text-muted: '#737373'
  border-subtle: '#E5E5E5'
  status-paid: '#22C55E'
  status-in-progress: '#3B82F6'
  status-pending: '#F59E0B'
  sidebar-bg: '#0A0A0A'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  metric-value:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  heading-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  table-data:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 2rem
  gutter: 1.5rem
  card-padding: 1.25rem
  stack-gap: 0.5rem
  section-gap: 2.5rem
---

# HammerCash Milestone Dashboard

## 1. Vision & Vibe
**Product Name:** HammerCash (Escrow-style Contractor Payment Platform)
**Design Aesthetic:** "Linear-Modern" / "Stripe-Clean." Focus on high-trust financial interfaces. Use a high-contrast monochromatic base with semantic accent colors for status.
**Core Vibe:** Reliable, Precise, Transparent.

## 2. Global Design System (Stitch Tokens)
- **Primary Palette:** 
    - Background: #FAFAFA (Canvas) / #FFFFFF (Cards)
    - Text: #171717 (Primary) / #737373 (Muted)
    - Accent: #F97316 (HammerCash Orange - use sparingly for primary CTA)
- **Typography:** Sans-serif (Inter/Geist). Tabular lining for all currency values to ensure vertical alignment.
- **Radius:** 8px (Standard components), 12px (Main Dashboard Cards).
- **Elevation:** Level 1 border (1px #E5E5E5) instead of heavy shadows.

## 3. Stitch "Vibe Design" Prompt
Generate a high-fidelity SaaS dashboard for a contractor payment app called HammerCash. 
**Layout:** Vertical sidebar in dark mode, main content in light mode. 
**Header:** 4 KPI metric cards showing "Total Value," "Held in Escrow," "Ready for Payout," and "Active Jobs." 
**Main Section:** A clean data table showing "Project Name," "Customer (with avatar)," "Milestone Progress (linear bar)," "Total Amount," and "Status." 
Use subtle pill-shaped badges for status (Success-Green for Paid, Info-Blue for In Progress, Warning-Amber for Pending). 
**Style:** Minimalist, border-only cards, Inter typography, 16px base font size.

## 4. Component Orchestration
### A. Metric Cards
- Data Structure: label: string, value: currency, trend: percentage.
### B. The Milestone Table
- Logic: Row Click triggers a side panel. Progress Bar: (Completed/Total) * 100.
- States: In Progress, Paid, Pending.
### C. Action Panel (Drawer)
- Vertical timeline of payments. Primary button: "Release Milestone".