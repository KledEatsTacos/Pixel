# craigslist - Modern UI

A modern, animated Craigslist-inspired web app built with React, TypeScript, and Vite.

## Features

- 🎨 Modern UI with Framer Motion animations
- � Beautiful landing page with gradient background
- �🔍 Search functionality on the marketplace
- 📱 Responsive grid layout
- 🏷️ Category browsing
- 📋 Listing cards with images
- 🔀 React Router navigation between pages

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Framer Motion** - Animations
- **Lucide React** - Icon library
- **React Router** - Client-side routing

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
craigslist/
├── src/
│   ├── assets/
│   │   └── styles.css             # Global styles
│   ├── components/
│   │   └── ui/
│   │       └── card.tsx           # Card components
│   ├── pages/
│   │   ├── Landing.tsx            # Landing page with "Let's Dive In" button
│   │   └── ModernCraigslist.tsx   # Main marketplace page
│   └── main.tsx                   # React entry point with routing
├── index.html                     # HTML entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Routes

- `/` - Landing page with about section and call-to-action
- `/explore` - Main marketplace with listings and categories
