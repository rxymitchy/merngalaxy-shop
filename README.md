
# Elegance - Premium E-commerce Store

A modern e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Responsive product catalog with filtering and sorting
- Product detail pages with image gallery
- Shopping cart functionality
- Checkout process
- RESTful API for product and order management

## Tech Stack

- **Frontend**: React, React Router, React Query, Tailwind CSS
- **Backend**: Express.js, MongoDB with Mongoose
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/elegance-store.git
cd elegance-store
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. In a separate terminal, seed the database (optional):
```bash
cd server
npm run seed
```

3. Start the frontend development server:
```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:5173

## Project Structure

- `/src` - Frontend React application
  - `/components` - Reusable UI components
  - `/context` - React context for state management
  - `/pages` - Page components
  - `/services` - API services
- `/server` - Backend Express application
  - `/models` - Mongoose data models
  - `/routes` - Express routes for API endpoints

## License

This project is licensed under the MIT License.
