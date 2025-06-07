# Elegance - Premium E-commerce Store

A modern, responsive e-commerce web application built with React and the MERN stack architecture. Features a premium shopping experience with elegant design, product catalog, shopping cart, and checkout functionality.

## 🚀 Features

- **Product Catalog**: Browse products with filtering, sorting, and search capabilities
- **Product Details**: Detailed product pages with image galleries and specifications
- **Shopping Cart**: Add, remove, and manage items in your cart
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **State Management**: React Context for cart and user state
- **API Integration**: RESTful API with mock data support
- **Fast Loading**: Optimized with React Query for data fetching

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **React Query** - Data fetching and caching
- **Lucide React** - Beautiful icons

### Backend (Optional)
- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## 📦 Installation

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager
- MongoDB (if using backend)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/rxymitchy/merngalaxy-shop.git
   cd elegance-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Backend Setup (Optional)

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/elegance-store
   PORT=5000
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

## 📁 Project Structure

```
elegance-store/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Layout.jsx     # Main layout component
│   │   ├── Navbar.jsx     # Navigation component
│   │   └── ...
│   ├── context/           # React context providers
│   │   └── CartContext.jsx
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   └── ...
│   ├── services/          # API services and utilities
│   │   ├── productService.js
│   │   ├── orderService.js
│   │   ├── mockData.js
│   │   └── apiUtils.js
│   ├── lib/               # Utility functions
│   ├── App.jsx            # Main application component
│   └── main.jsx           # Application entry point
├── server/                # Backend application (optional)
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── server.js         # Express server
└── package.json
```

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend (from server directory)
npm run dev          # Start backend development server
npm run start        # Start production server
npm run seed         # Seed database with sample data
```

## 🎨 Design System

The application uses a consistent design system built on:
- **Tailwind CSS** for utility classes
- **CSS Custom Properties** for theming
- **shadcn/ui** for component library
- **Responsive Design** principles
- **Dark/Light Mode** support (via next-themes)

## 🔧 Configuration

### Environment Variables
Currently, the app uses mock data by default. To connect to a real API:

1. Update `src/services/apiUtils.js`
2. Set `useMockData()` to return `false`
3. Configure your API endpoint in `API_URL`

### Customization
- **Colors**: Modify `src/index.css` and `tailwind.config.js`
- **Components**: Extend or modify components in `src/components/`
- **Routes**: Add new routes in `src/App.jsx`

## 🚀 Deployment

### Frontend Deployment
The app can be deployed to any static hosting service:

```bash
npm run build
```

Deploy the `dist` folder to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any static hosting service

### Backend Deployment
Deploy the Express server to:
- Heroku
- Railway
- DigitalOcean
- AWS EC2

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Lucide](https://lucide.dev/) for the icon library

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

Made with ❤️ by the Elegance team
