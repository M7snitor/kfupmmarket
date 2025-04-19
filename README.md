# KFUPM Market – SWE 363 Project

## Overview

This project is a marketplace web application developed for the SWE 363 course at King Fahd University of Petroleum and Minerals (KFUPM). The system is designed to serve students living in KFUPM dorms by allowing them to browse, sell, and purchase items. It also supports bidding, club merchandise, and categorization by type and source.

## Team Members

- Naif Alshalan – 202031400 – Section 01  
- Abdulrahman Basaif – 202027940 – Section 01  
- Abdulmohsen Alshawarib – 202028860 – Section 01  
- Turki Alfozan – 202026560 – Section 02  
- Abdulaziz Alotaibi – 202023480 – Section 02  

## Repository Structure

```
kfupm-market/
│
├── public/                  # Static files
├── src/
│   ├── assets/              # Images and SVG icons
│   ├── pages/               # Main React pages
│   ├── components/          # Reusable components
│   ├── App.jsx              # Main routing component
│   └── index.js             # Entry point
│
├── index.css                # Global CSS using theme variables
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```

## Installation Instructions

To run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/m7snitor/kfupmmarket.git
cd kfupmmarket
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The app will run at: `http://localhost:3000`

To test the deployed site:  
https://m7snitor.github.io/kfupmmarket

## Features

- Browse and filter items by type (e.g., Electronics, Furniture)
- Filter by source (Student Resell or Club Merchandise)
- Bidding system with bid timers and top bid indicators
- Watchlist and cart functionality
- Fully responsive design for mobile and desktop
- Light and dark mode support using CSS variables
- Clean and accessible UI

## Technologies Used

- React.js
- React Router
- JavaScript (ES6)
- HTML & CSS (custom variables)
- Figma (for prototyping – optional)

## Optional: Figma Prototype

Figma design link (view only):  
https://www.figma.com/design/vCtei94qlg5HSZSYtIV8gR/KFUPM-Market?node-id=0-1&t=y0yK1RpkJgIeebXv-1

## Notes

- The project is front-end only. No backend or database integration is included.
- The code is modular and organized for maintainability.
- All icons and styles are customized to match the project’s design.
- Color theme is controlled using CSS `:root` variables and adapts to dark mode.

