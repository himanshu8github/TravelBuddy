🌍 TravelBuddy – AI Travel Itinerary & Expense Planner
TravelBuddy is a full-stack AI-powered travel web app that helps users:

Plan personalized itineraries

Track trip expenses

Explore tourist places

Get smart travel suggestions via chat
It integrates Google AI (Gemini), Firebase, Stripe, and modern frontend technologies to deliver a seamless experience.

✨ Key Features
🧠 AI Itinerary Planner: Generates travel plans using Gemini API based on user preferences

💬 AI Chat Suggestion: Get real-time suggestions for travel themes (e.g., mountains, holy places)

🗺️ Explore India: Discover top destinations with rich visuals and data

📅 Trip Planner: Form to add trip name, type, budget, number of people, and dates

💸 Expense Tracker: Track expenses per trip with editable cards

🔐 Authentication: Google Sign-In using Firebase Auth

💾 User-Specific Data: All trips and expenses stored securely in Firestore

💳 Payment Integration: Stripe integration for premium plan purchase

🌈 Modern UI: Built with React, TailwindCSS v4, and shadcn/ui components

⚙️ Backend: Node.js + Express handles routes and API integration

🛠️ Tech Stack
Frontend	    Backend	    AI & Payments	        Auth & Database
React (Vite)	Node.js	    Gemini API (Google AI)	Firebase Auth
Tailwind CSSv4	Express.js	Stripe Payment Gateway	Firebase Firestore
shadcn/ui	    Axios


💳 Stripe Integration
Stripe Checkout session is created on the server

Frontend sends selected plan (basic/premium), user info

Stripe handles secure payment and redirects back to dashboard

🧪 Running Locally
bash
Copy
Edit
# Clone the repo
git clone https://github.com/himanshu8github/TravelBuddy.git
cd travelbuddy

# Install frontend dependencies
cd client
npm install
npm run dev

# Install backend dependencies
cd server
npm install
npm run dev

🚀 Live Demo
🔗 Visit TravelBuddy

🙋‍♂️ Author
Made with 💜 by Himanshu Choudhary
📧 himanshukakran8@gmail.com