
# LuxWatch Online

LuxWatch Online is a modern e-commerce web application for luxury watches, built with React. It features a product catalog, shopping cart, authentication, wishlist, order management, and more, providing a seamless shopping experience.

## Features

- Browse luxury watches with detailed images and descriptions
- Filter and paginate products
- Add watches to cart and wishlist
- User authentication (login/register)
- Checkout and order management
- Responsive design
- Toast notifications

## Project Structure

```
luxwatch_online/
├── public/           # Static assets and images
├── src/              # Source code
│   ├── components/   # UI components (auth, cart, product, layout, etc.)
│   ├── context/      # React context providers (auth, cart, filter, etc.)
│   ├── data/         # Static data (products)
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Application pages (About, Catalog, Checkout, etc.)
│   ├── services/     # Service logic (API, etc.)
│   ├── theme/        # Theme and color configuration
│   └── utils/        # Utility functions
├── build/            # Production build output
├── package.json      # Project dependencies and scripts
└── README.md         # Project documentation
```

## Getting Started

1. **Install dependencies**
   ```
   npm install
   ```
2. **Run the development server**
   ```
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**
   ```
   npm run build
   ```

4. **Run tests**
   ```
   npm test
   ```

## Folder Highlights

- `src/components/` - Contains reusable UI components for authentication, cart, product display, layout, and more.
- `src/context/` - Provides global state management using React Context API.
- `src/pages/` - Main application pages for routing.
- `src/hooks/` - Custom hooks for inventory, pagination, and filtering logic.
- `src/data/` - Static product data.
- `src/theme/` - Theme and color configuration.
- `src/utils/` - Utility functions (e.g., toast notifications).

## Deployment

After building the project (`npm run build`), deploy the contents of the `build/` folder to your preferred static hosting service (e.g., Netlify, Vercel, GitHub Pages).

## License

This project is for demonstration and educational purposes.
