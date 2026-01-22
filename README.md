![Movie App Hero](public/Movie%20App%20Using%20React.png)

# 🎬 Movie App

A modern, responsive web application built with **React** that helps you discover and search for movies effortlessly. Browse trending movies, search your favorites, and explore detailed information about films from The Movie Database (TMDB) API.

---

## ✨ Features

- **🔍 Smart Search**: Debounced search functionality for smooth performance and real-time movie discovery
- **🔥 Trending Movies**: Display of currently trending movies on the home page
- **🎨 Beautiful UI**: Modern, responsive design built with Tailwind CSS
- **⚡ Fast Performance**: Optimized with Vite for lightning-fast development and production builds
- **📱 Mobile Responsive**: Fully responsive design that works seamlessly on all devices
- **🎯 Search History**: Tracks your searches using Appwrite backend
- **🔄 Smooth Animations**: Enhanced user experience with motion animations
- **⌨️ Debounced Input**: Efficient API calls with debounced search input

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | Frontend framework |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Next-generation build tool |
| **Tailwind CSS** | Utility-first CSS framework |
| **Appwrite** | Backend services & database |
| **Motion** | Animation library |
| **React Use** | React hooks utilities |
| **TMDB API** | Movie database |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/movie-app.git
   cd movie-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   ```

4. **Get your TMDB API Key**
   - Visit [The Movie Database](https://www.themoviedb.org/) and create an account
   - Go to Settings → API and get your API key

5. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser

---

## 🚀 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint for code quality |

---

## 📂 Project Structure

```
movie-app/
├── src/
│   ├── Component/
│   │   ├── MovieCard.tsx      # Individual movie card component
│   │   ├── Search.tsx          # Search input component
│   │   └── Spinner.tsx         # Loading spinner component
│   ├── App.tsx                 # Main application component
│   ├── appwrite.ts             # Appwrite backend services
│   ├── types.ts                # TypeScript type definitions
│   ├── main.tsx                # React entry point
│   ├── index.css               # Global styles
│   └── assets/                 # Static assets
├── public/                      # Public assets
├── package.json                # Project dependencies
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

---

## 🎯 How It Works

1. **Home Page**: Displays trending movies fetched from TMDB API
2. **Search**: Type in the search bar to find movies (debounced for efficiency)
3. **Movie Details**: Click on any movie card to see more information
4. **Search History**: Your searches are saved in the Appwrite database for future reference

---

## 🔧 Key Components

### Search Component
Handles user input with debouncing to minimize API calls and improve performance.

### MovieCard Component
Displays movie information including poster, title, and rating in a beautiful card layout.

### Spinner Component
Shows a loading indicator while fetching data from the API.

---

## 🌟 Features in Detail

### Real-time Search
The app uses a 500ms debounce on search input to optimize API calls while providing instant feedback to users.

### Trending Movies Display
On initial load, the app fetches and displays currently trending movies from TMDB.

### Responsive Design
Built with Tailwind CSS to ensure the app looks great on desktop, tablet, and mobile devices.

### Type Safety
Fully typed with TypeScript for better development experience and fewer runtime errors.

---

## 📝 Environment Variables

```env
# TMDB API Configuration
VITE_TMDB_API_KEY=your_api_key

# Appwrite Configuration (optional, for search history)
VITE_APPWRITE_ENDPOINT=https://your-appwrite-instance.com/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this project and submit pull requests to help improve it.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Developer

Created by **Tonmoy**

---

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie API
- [React Documentation](https://react.dev/)
- [Vite](https://vitejs.dev/) for the amazing build tool
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework

---

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the developer.

**Happy movie hunting! 🎉**
