# VioletStream - YouTube-like Video Platform Frontend

A modern video sharing platform frontend built with React, Vite, Tailwind v4, shadcn/ui, and Redux Toolkit.

## 🎨 Features

- **Custom Violet Stream Theme** - Unique violet/indigo/pink color palette
- **Authentication System** - Login, register, JWT-based authentication
- **User Profiles** - Channel pages with subscriber counts
- **Watch History** - Track and display watched videos
- **Settings Page** - Update profile, password, avatar
- **Responsive Design** - Mobile-first, works on all devices
- **Dark Mode Ready** - Full dark mode support

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ installed
- Your backend API hosted on Render

### Installation

1. **Configure Environment Variables**

Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=https://your-backend-app.onrender.com/api/v1
VITE_APP_NAME=VioletStream
```

2. **Install Dependencies**

```bash
cd frontend
npm install
```

3. **Run Development Server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/                 # API service layer
│   │   ├── axios.config.js  # Axios instance with interceptors
│   │   ├── auth.api.js      # Authentication APIs
│   │   └── user.api.js      # User management APIs
│   ├── components/          # React components
│   │   ├── auth/            # Auth components (ProtectedRoute)
│   │   ├── layout/          # Layout components (Navbar, Sidebar)
│   │   └── ui/              # shadcn UI components
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ChannelPage.jsx
│   │   ├── WatchHistoryPage.jsx
│   │   └── SettingsPage.jsx
│   ├── store/               # Redux store
│   │   ├── slices/          # Redux slices
│   │   └── store.js         # Store configuration
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles with Violet Stream theme
├── .env                     # Environment variables
└── package.json
```

## 🎨 Violet Stream Theme

The app uses a custom color palette:

- **Primary**: Violet (#8B5CF6) - Brand color, CTAs
- **Secondary**: Indigo (#6366F1) - Accents, hover states  
- **Accent**: Pink (#EC4899) - Highlights, badges

## 🔑 Available Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Home page with video grid | No |
| `/login` | Login page | No |
| `/register` | Registration page | No |
| `/channel/:username` | User channel profile | Yes |
| `/history` | Watch history | Yes |
| `/settings` | Account settings | Yes |

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component library
- **Redux Toolkit** - State management
- **React Router v7** - Routing
- **Axios** - HTTP client
- **Lucide React** - Icons

## 🔌 API Integration

All API calls go to your Render backend. The app uses:

- Cookie-based authentication
- JWT tokens with auto-refresh
- Axios interceptors for token management

## 📦 Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## 🎯 Next Steps

1. **Update `.env`** with your actual Render backend URL
2. **Add Video Components** when video APIs are ready
3. **Implement Video Upload** functionality
4. **Add Comments** and **Likes** features
5. **Create Subscription** logic

## 📝 Notes

- StrictMode is disabled to prevent double API calls in development
- The app automatically tries to fetch current user on mount
- Protected routes redirect to login if not authenticated
- Tokens are stored in localStorage and cookies

---

**Built with 💜 by VioletStream Team**