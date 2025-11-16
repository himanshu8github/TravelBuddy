# 🌍 TravelBuddy – AI Travel Itinerary & Expense Planner

TravelBuddy is a full-stack AI-powered travel web app that helps users plan smarter trips end-to-end:
- Plan personalized itineraries
- Track trip expenses
- Explore tourist places
- Get smart travel suggestions via chat

Integrates Groq API, Firebase, Stripe, and modern frontend technologies.

## ✨ Key Features

AI Planner & Trip Tools
- AI Itinerary Planner (Groq): Generates tailored plans based on destination, days, group type, budget, and dates
- Cost Predictor: Estimated trip budget breakdown
- Packing List: Smart packing suggestions based on destination and season
- Local Tips: Safety, culture, and do’s/don’ts
- Stays: Suggested accommodations
- Restaurants: Local food spots
- Day-wise Itinerary: Clear schedule per day

Core App Features
- Explore India: Discover top destinations with visuals and details
- AI Chat Suggestion: Quick ideas for themes (mountains, holy places, beaches, etc.)
- Trip Planner Form: Trip name, type, budget, people, and dates
- Expense Tracker: Per-trip expenses with editable cards
- Authentication: Google Sign-In with Firebase Auth
- User Data: Trips and expenses stored per user in Firestore
- Payments: Stripe integration for premium plan purchase
- Responsive UI: Desktop + mobile (mobile tabs show icon + label in a 2x4 grid)

## 🛠️ Tech Stack

Frontend
- React (Vite), Tailwind CSS v4, shadcn/ui, Axios

Backend
- Node.js, Express.js

AI & Payments
- Gemini API (Google AI), Stripe, Groq API

Auth & Database
- Firebase Auth, Firebase Firestore


## 🔑 Environment Variables

Create .env files with the following keys.

client/.env
- VITE_API_BASE_URL=http://localhost:5000
- VITE_FIREBASE_API_KEY=your_firebase_api_key
- VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
- VITE_FIREBASE_PROJECT_ID=your_project_id
- VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
- VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
- VITE_FIREBASE_APP_ID=your_app_id

server/.env
- PORT=5000
- GEMINI_API_KEY=your_gemini_api_key
- STRIPE_SECRET_KEY=your_stripe_secret
- STRIPE_PRICE_ID=your_stripe_price_id
- STRIPE_WEBHOOK_SECRET=your_webhook_secret
- FIREBASE_PROJECT_ID=your_project_id
- FIREBASE_CLIENT_EMAIL=service_account_email@your_project.iam.gserviceaccount.com
- FIREBASE_PRIVATE_KEY="

## 🧪 Running Locally

Prerequisites
- Node.js 18+ and npm

Clone
- git clone https://github.com/himanshu8github/TravelBuddy.git
- cd TravelBuddy

Install & Run (Frontend)
- cd client
- npm install
- npm run dev

Install & Run (Backend)
- cd ../server
- npm install
- npm run dev

Open
- Frontend: http://localhost:5173 (Vite default)
- Backend: http://localhost:5000


## 📱 Mobile UX Notes
- Feature tabs display icon + label
- Tabs are laid out as a 2x4 grid for 8 features

## 🚀 Live Demo
- Link: https://travelbuddy-1-m1pr.onrender.com/

## 🙋‍♂️ Author
- Made by Himanshu Choudhary
- 📧 himanshukakran8@gmail.com