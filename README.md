# 📚 BookReview - MERN Stack Book Review Platform

A full-stack, production-ready book review application built with the MERN stack, featuring advanced search capabilities, real-time analytics, and a modern responsive UI. Perfect for book enthusiasts to discover, review, and share their favorite reads.

---

## 🚀 Live Demo

- **Frontend:** `http://localhost:3000` (after setup)
- **Backend API:** `http://localhost:5000` (after setup)

---

## ✨ Key Features

### 🔐 Authentication & Security
- JWT-based authentication with secure password hashing (`bcrypt`)
- Token expiration handling with automatic logout
- Protected routes for authenticated users only
- Client-side token validation using `jwt-decode`

### 📖 Book Management
- Add, edit, and delete books with full CRUD operations
- Rich book details (title, author, description, genre, publication year)
- User ownership validation for book modifications
- Comprehensive input validation and error handling

### ⭐ Review System
- 5-star rating system with visual star displays
- Detailed text reviews with character limits
- One review per user per book policy
- Edit and delete own reviews
- Rating distribution analytics with interactive charts

### 🔍 Advanced Search & Filtering
- Optimized MongoDB Aggregation: Scales to millions of books efficiently
- Real-time search by title or author (with debounce for better UX)
- Filter by genre with dropdown selection
- Sort by date, publication year, or average rating
- Pagination (5 books per page) with smooth navigation

### 🎨 Modern UI/UX
- Dark/Light Mode: Persistent theme switching
- Responsive Design: Works on all devices (mobile-first approach)
- Tailwind CSS: Custom gradients, animations, and transitions
- Interactive Elements: Hover effects, loading states, smooth scrolling
- Professional Design: Landing page, browse page, detailed book views

### 📊 Analytics & Visualization
- Rating distribution charts using Recharts library
- Book statistics (total books, average ratings, review counts)
- Visual star ratings with dynamic coloring
- Performance optimized with MongoDB aggregation pipelines

---

## 🛠️ Tech Stack

### Backend
- Node.js (v18+)          
- Express.js (v4.19+)
- MongoDB Atlas           
- Mongoose ODM (v8.5+)
- JWT Authentication      
- bcryptjs Password Hashing
- CORS Enabled           
- Environment Variables (`dotenv`)
- RESTful API Design     
- MVC Architecture

### Frontend
- React (v18.3+)         
- Vite Build Tool (v5.3+)
- React Router (v6.24+)  
- Tailwind CSS (v3.4+)
- Axios HTTP Client      
- jwt-decode (v4.0+)
- Recharts Library       
- Context API State Management
- Responsive Design      
- Dark Mode Support

### Database
- MongoDB Atlas (Cloud)   
- Optimized Aggregation Pipelines
- Compound Indexes       
- Data Validation
- Relationship Management Schema Design

---

## 🏗️ Project Structure

```
internship_project/
├── backend/                      # Express.js API Server
│   ├── controllers/              # Business Logic Layer
│   │   ├── auth.controller.js    # Authentication endpoints
│   │   ├── book.controller.js    # Book CRUD with aggregation
│   │   └── review.controller.js  # Review management
│   ├── middleware/               # Custom Middleware
│   │   └── auth.middleware.js    # JWT verification
│   ├── models/                   # MongoDB Schemas
│   │   ├── user.model.js         # User schema with validation
│   │   ├── book.model.js         # Book schema with indexing
│   │   └── review.model.js       # Review schema with constraints
│   ├── routes/                   # API Route Definitions
│   │   ├── auth.routes.js        # /api/auth routes
│   │   ├── book.routes.js        # /api/books routes
│   │   └── review.routes.js      # /api/reviews routes
│   ├── .env                      # Environment configuration
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server setup
│
└── frontend/                     # React Application
    ├── src/
    │   ├── api/                  # Axios API Layer
    │   │   ├── axios.js          # Base configuration
    │   │   ├── auth.js           # Auth API calls
    │   │   ├── books.js          # Book API calls
    │   │   └── reviews.js        # Review API calls
    │   ├── components/           # Reusable UI Components
    │   │   ├── Navbar.jsx        # Navigation with theme toggle
    │   │   ├── BookCard.jsx      # Book display card
    │   │   ├── ReviewForm.jsx    # Review creation form
    │   │   ├── SearchBar.jsx     # Search with debounce
    │   │   ├── Pagination.jsx    # Page navigation
    │   │   └── RatingChart.jsx   # Recharts visualization
    │   ├── context/              # React Context
    │   │   └── AuthContext.jsx   # Global auth state
    │   ├── pages/                # Route Components
    │   │   ├── Home.jsx          # Landing page
    │   │   ├── BrowseBooks.jsx   # Book listing page
    │   │   ├── BookDetails.jsx   # Individual book view
    │   │   ├── Login.jsx         # User login
    │   │   ├── Signup.jsx        # User registration
    │   │   └── AddBook.jsx       # Book creation form
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # React DOM entry
    │   └── index.css             # Tailwind + custom styles
    ├── package.json              # Frontend dependencies
    ├── tailwind.config.js        # Tailwind configuration
    └── vite.config.js            # Vite build configuration
```

---

## ⚡ Quick Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (free tier)
- Git

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd internship_project

# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
```

### 2. Environment Configuration

**Backend (`.env`):**
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secure_jwt_secret_key_min_32_characters
JWT_EXPIRE=7d
NODE_ENV=development
```

**Frontend (`.env`):**
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Start Development Servers

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# ✅ Server running on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# ✅ App running on http://localhost:3000
```

---

## 📡 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
```

### Books Endpoints

```
GET    /api/books?page=1&search=&genre=&sortBy=    # Get all books (with filters)
GET    /api/books/:id                              # Get single book
POST   /api/books                                  # Add book (protected)
PUT    /api/books/:id                              # Update book (protected)
DELETE /api/books/:id                              # Delete book (protected)
```

### Reviews Endpoints

```
POST   /api/reviews/:bookId        # Add review (protected)
PUT    /api/reviews/:reviewId      # Update review (protected)  
DELETE /api/reviews/:reviewId      # Delete review (protected)
```

---

## 🎯 Advanced Features Implemented

### Performance Optimizations
- **MongoDB Aggregation Pipeline:** Handles rating sort for millions of books without loading data into memory
- **Debounced Search:** Prevents excessive API calls during typing
- **Lazy Loading:** Components load as needed
- **Optimized Bundle:** Vite build optimization

### User Experience Enhancements
- **Persistent Dark Mode:** Theme preference saved in localStorage
- **Smooth Animations:** CSS transitions and hover effects
- **Loading States:** Skeleton screens and spinners
- **Error Handling:** Comprehensive error messages
- **Responsive Design:** Mobile-first approach

### Security Features
- **JWT Token Validation:** Both client and server-side
- **Password Hashing:** bcrypt with salt rounds
- **Protected Routes:** Authentication required for sensitive operations
- **Input Validation:** Server-side validation for all inputs
- **Authorization Checks:** Users can only modify their own content

---

## 🔮 Future Enhancements

- **AI-Powered Recommendations:** Collaborative filtering algorithm
- **Social Features:** Follow users, share reviews, book clubs
- **Book Cover Uploads:** Image upload with cloud storage
- **Advanced Analytics:** Reading statistics, genre preferences
- **Mobile App:** React Native version
- **Email Notifications:** New reviews, recommendations
- **Admin Dashboard:** Content moderation, user management
- **Progressive Web App:** Offline functionality
- **Multi-language Support:** Internationalization
- **Book Reading Lists:** Personal collections and wishlists

---

## 🤝 Contributing

This project was built for internship applications but is open for contributions:

1. **Fork** the repository
2. **Create a feature branch**  
   `git checkout -b feature/amazing-feature`
3. **Commit changes**  
   `git commit -m 'Add amazing feature'`
4. **Push to branch**  
   `git push origin feature/amazing-feature`
5. **Open a Pull Request**

---

## 👨‍💻 Developer

**Anamitra Sarkar**  
🎓 B.Tech 3rd Year Student specializing in AI/ML  
💼 Built for internship applications  
🚀 Showcasing full-stack MERN development skills  
📧 Contact: anamitrasarslsn10ab@gmail.com

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🎉 Acknowledgments

- MongoDB Atlas for cloud database hosting
- Tailwind CSS for utility-first styling
- Recharts for beautiful data visualizations
- React Community for excellent documentation
- Stack Overflow for debugging assistance

> ⭐ If this project helped you, please give it a star!

---

## 🔗 Links

- **Live Demo** | **API Docs** | **Contributing**
