# 🚀 Public API (Astro)

A comprehensive directory of public APIs for developers, built with Astro and React.

## 📋 Overview

This project provides a searchable and filterable directory of public APIs, featuring over 1,400+ APIs across various categories. Each API listing includes essential information like authentication requirements, HTTPS support, and CORS availability.

## ✨ Features

- **🔍 Browse & Search**: Explore APIs by category or search through all available APIs
- **📊 Comprehensive Info**: Each API shows:
  - 🔑 Authentication requirements (API Key, OAuth, etc.)
  - ✅ HTTPS support status
  - 🌐 CORS availability
  - 📝 Description and direct link to API documentation
- **🎨 Clean UI**: Minimalist design with intuitive icons and clear information hierarchy
- **📱 Responsive**: Works seamlessly across desktop, tablet, and mobile devices
- **⚡ Fast**: Built with Astro for optimal performance

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) v5.9.2
- **UI Components**: React v19.1.0
- **Styling**: CSS with design system foundations
- **Deployment**: Netlify
- **Data**: JSON-based API directory

## Run Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm format
pnpm clean
```

## 📁 Project Structure

```
astro-api/
├── public/
│   ├── fonts/
│   └── *.png
├── src/
│   ├── components/
│   │   ├── Card.jsx              # API card component
│   │   ├── CardsContainer.jsx    # Container for API cards
│   │   ├── CategoryNav.jsx       # Category navigation
│   │   ├── CategoryNavItem.jsx   # Individual nav items
│   │   └── Dashboard.jsx         # Main dashboard
│   ├── data/
│   │   ├── categories.json       # API categories
│   │   └── resources.json        # Main API database
│   ├── layouts/
│   │   └── Layout.astro          # Base layout
│   └── pages/
│       ├── index.astro           # Homepage
│       ├── 404.astro             # 404 page
│       └── categories/
│           └── [category].astro  # Dynamic category pages
├── astro.config.mjs
├── package.json
└── README.md
```

## 🎨 Components

### Card Component

Displays individual API information with:

- API name and description
- Category badge
- Authentication, HTTPS, and CORS indicators

### CategoryNav Component

Horizontal scrollable navigation showing all available API categories with item counts.

### Dashboard Component

Main component that orchestrates the category navigation and API cards display.

## 📊 Data Structure

The API data is stored in `src/data/resources.json` with the following structure:

```json
{
  "count": 1495,
  "entries": [
    {
      "API": "API Name",
      "Description": "API description",
      "Auth": "apiKey | OAuth | X-Mashape-Key | etc.",
      "HTTPS": true | false,
      "Cors": "yes | no | unknown",
      "Link": "https://api-documentation-url.com/",
      "Category": "Category Name"
    }
  ]
}
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run clean` - Clean build artifacts and dependencies

## 📝 Adding New APIs

To add new APIs to the directory:

1. Edit `src/data/resources.json`
2. Add your API entry following the existing structure
3. Update the `count` field
4. If adding a new category, update `src/data/categories.json`
