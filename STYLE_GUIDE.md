# Minimal Web Interface Style Guide

This style guide applies to the minimal design aesthetic used in this project and related projects.

## Core Philosophy

**"Functional Minimalism"** - Prioritize readability, functionality, and information density over visual flair. Every element should serve a purpose without unnecessary decoration.

## Typography

### Primary Font
- **Font Family**: `'Source Code Pro', sans-serif`
- **Reasoning**: Monospace font provides consistent character spacing, excellent readability, and a technical aesthetic

### Font Sizes
- **Body Text**: `12px` (primary reading size)
- **Small Headers** (h2, section titles): `14px`
- **Main Headers** (h1): `16px` 
- **Small Text** (labels, metadata): `11px`
- **Avoid**: Large headers (>18px), decorative typography

### Text Styling
- **Line Height**: `1.2` (tight, efficient spacing)
- **Weight**: Use `bold` for emphasis, avoid multiple font weights
- **Color**: `#333` for primary text, `#666` for secondary, `#999` for metadata

## Color Palette

### Base Colors
- **Background**: `#f5f5f5` (light grey page background)
- **Content Areas**: `#fff` (white content boxes)
- **Text**: `#333` (dark grey, not black)
- **Borders**: `#ddd` (subtle grey borders)

### Accent Colors (Pale Theme)
Use pale, desaturated colors for minimal visual impact:
- **Pale Blue**: `#e8eaf6` (primary accent)
- **Pale Green**: `#f1f8e9` (success states)
- **Pale Red**: `#ffebee` (error states)
- **Pale Cyan**: `#e0f7fa`
- **Pale Orange**: `#fff3e0`
- **Pale Purple**: `#f3e5f5`

### Anti-Patterns
- **Avoid**: Vibrant colors, gradients, high contrast accent colors
- **Avoid**: Pure black (`#000`) or pure white backgrounds
- **Avoid**: Multiple bright colors in one interface

## Layout & Spacing

### Spacing Scale
- **Micro**: `5px` (between related elements)
- **Small**: `10px` (standard content padding)
- **Medium**: `20px` (section separation)
- **Large**: `30px+` (major layout breaks - use sparingly)

### Content Structure
- **Max Width**: `1200px` for main content containers
- **Grid Gaps**: `10px` for tight layouts, `20px` maximum
- **Margins**: `20px` body margin, `10px` content padding

### Box Model
- **Border Radius**: `3px` (subtle) to `5px` (standard)
- **Borders**: `1px solid #ddd` (thin, subtle)
- **Box Shadows**: `0 1px 3px rgba(0, 0, 0, 0.1)` (minimal depth)

## Interactive Elements

### Buttons
- **Padding**: `3px 8px` (small) to `5px 10px` (standard)
- **Background**: `#f5f5f5` (neutral)
- **Hover**: `#e0e0e0` (slightly darker)
- **Border**: `1px solid #ddd`
- **Font**: Inherit from body (`Source Code Pro`, `12px`)

### Form Elements
- **Input Padding**: `5px`
- **Border**: `1px solid #ddd`
- **Focus State**: `border-color: #999` (no dramatic color changes)
- **Background**: `white`
- **Font**: Same as body text

### Links & Navigation
- **Color**: `#333` (same as body text)
- **Hover**: Subtle background change, not color change
- **Underline**: Avoid unless necessary for clarity

## Component Patterns

### Content Cards
```css
.content-card {
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
}
```

### Section Headers
```css
.section-header {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
}
```

### Data Lists/Tables
- **Compact spacing**: Minimal padding between rows
- **Subtle borders**: Light grey separators
- **Alternating backgrounds**: Very pale (`#f9f9f9`) if needed

## Visual Hierarchy

### Information Density
- **High Density**: Pack information efficiently, avoid wasted space
- **Scannable**: Use consistent spacing and typography to create natural reading flow
- **Grouping**: Related items close together, unrelated items clearly separated

### Priority System
1. **Primary**: Main content, key actions (normal text weight, standard size)
2. **Secondary**: Supporting information (slightly smaller, grey text)
3. **Metadata**: Timestamps, IDs, technical details (smallest text, light grey)

## Responsive Behavior

### Breakpoints
- **Mobile**: `max-width: 768px` - Single column, slightly larger touch targets
- **Tablet**: `769px - 1024px` - Reduced columns, maintained spacing
- **Desktop**: `1025px+` - Full layout with optimal information density

### Mobile Adaptations
- **Font Size**: Increase to `14px` minimum for readability
- **Touch Targets**: Minimum `12px` padding for buttons
- **Spacing**: Reduce gaps to `8px` standard, `15px` for sections

## Anti-Patterns to Avoid

### Visual Elements
- ❌ Gradient backgrounds
- ❌ Drop shadows larger than `3px`
- ❌ Bright, saturated colors
- ❌ Multiple font families in one interface
- ❌ Large, decorative headers
- ❌ Rounded corners >8px
- ❌ Animations and transitions (except subtle hover states)

### Layout Patterns
- ❌ Excessive whitespace
- ❌ Centered layouts with lots of empty space
- ❌ Card-heavy designs with thick borders
- ❌ Icon-heavy interfaces
- ❌ Multi-color themes

## Implementation Examples

### CSS Base Template
```css
body {
    font-family: 'Source Code Pro', sans-serif;
    font-size: 12px;
    line-height: 1.2;
    margin: 20px;
    color: #333;
    background-color: #f5f5f5;
    padding: 10px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.content-section {
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
}
```

### Button Pattern
```css
button {
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    font-size: 12px;
    font-family: 'Source Code Pro', sans-serif;
    cursor: pointer;
    background: #f5f5f5;
}

button:hover {
    background: #e0e0e0;
}
```

## Project Examples

### Reference Implementations
- **Main Site** (`/simple_html_server/html/index.html`): Perfect example of information density, pale color usage, and minimal styling
- **Changelog Manager** (`/simple_html_server/html/changelog/`): Demonstrates form styling, data presentation, and responsive grid layouts

### Color Usage Examples
- **Project Badges**: Use the pale accent colors for visual distinction without overwhelming
- **Status Indicators**: Subtle background colors rather than bright badges
- **Form States**: Pale green for success, pale red for errors

---

## Summary

This aesthetic prioritizes **function over form**, **information density over decoration**, and **consistency over creativity**. Every design decision should serve the user's need to quickly scan, understand, and interact with information without visual distractions.

The result is a clean, professional interface that feels technical and purposeful—perfect for utility applications and developer tools.