# ShopCart — Shopping Cart Application

## Project Overview

ShopCart is a responsive shopping cart application developed as an internship assignment using React and TypeScript. Users can browse products, search and filter products, manage cart quantities, and complete a demo checkout.

## Technologies Used

- React 19
- TypeScript
- Vite
- Bootstrap
- pnpm
- Zustand for cart state management
- TanStack Query for API data fetching and caching
- Zod for data validation
- localStorage for cart persistence
- DummyJSON Products API

## Features

- Display products with images, titles, categories, prices, and ratings
- Search products by title
- Filter by category and maximum price
- Clear all filters
- Add and remove products from the cart
- Increase and decrease quantities, with a minimum of 1 and maximum of 5
- Display cart item count
- Calculate individual item totals and subtotal
- Apply 5% tax
- Apply a 10% discount when the subtotal exceeds $100
- Require a minimum subtotal of $10 for checkout
- Persist cart data across page refreshes
- Validate shipping details using Zod
- Display a read-only payment summary
- Show order confirmation and clear the cart after placing an order
- Handle loading, error, and empty states

## API Used

DummyJSON Products API:

https://dummyjson.com/products?limit=30

## Installation and Setup

**Prerequisites:** Node.js and pnpm.

1. Clone the repository.
2. Open the project folder in VS Code.
3. Install dependencies:

  
   pnpm install
   

4. Start the development server:

  
   pnpm dev
  

5. Open the local URL displayed in the terminal.

## Available Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build the production application |
| `pnpm preview` | Preview the production build |

## Known Limitations

- This is a demonstration shopping cart application.
- No real payment gateway or transaction processing is implemented.
- Product data depends on the external DummyJSON API.

## Links

- **GitHub Repository:**(https://github.com/AryamolMS/shopping_cart).
- **Live Application:** Add your deployment URL here.
