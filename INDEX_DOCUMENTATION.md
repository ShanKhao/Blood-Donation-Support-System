# Index Documentation

This document provides a comprehensive overview of all indexes used in the codebase.

## File Structure Indexes

### 1. src/pages/Index.tsx
- **Purpose**: Main landing page component
- **Usage**: Serves as the root route ("/") in the application
- **Key Components**: 
  - Navigation bar
  - Hero section
  - Features section
  - Contact info section
  - Footer

### 2. src/index.css
- **Purpose**: Global CSS file
- **Usage**: Contains Tailwind CSS directives and root CSS variables
- **Key Sections**:
  - Tailwind base, components, and utilities imports
  - Root CSS variables for theming
  - Custom CSS variables for sidebar styling

## Component Indexes

### 1. Component Display Names
Several components use index-based references for their display names:
- `AccordionItem.displayName`
- `AccordionTrigger.displayName`
- `AccordionContent.displayName`
- `BreadcrumbPage.displayName`
- `CarouselItem.displayName`
- `CommandGroup.displayName`

### 2. Array/List Indexes
Found in components:
- `ChartTooltipContent`: Uses array index in payload mapping (index parameter in formatter function)
- `InputOTPSlot`: Uses index prop to reference specific slot in OTP input

## Package Management

### 1. package.json
- Contains indexed dependencies and their versions
- Uses index.css as the main stylesheet entry point

## Import/Export Indexes

Several components use index-based exports:
- `tabs.tsx`: Exports components as a group
- `accordion.tsx`: Exports multiple related components
- `carousel.tsx`: Exports carousel-related components

## Route Indexes

The main routing structure in App.tsx uses index-based routing:
- "/" (index route) maps to the Index component
- Other routes follow after the index route:
  - "/register"
  - "/login"
  - "*" (catch-all route) 