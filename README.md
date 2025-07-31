OncoX – AI-Powered Symptom Risk Assessment App

Project Overview

OncoX is a web application built with React and TypeScript on the frontend and Supabase for backend services. It allows users to input symptoms and get an AI-generated risk assessment powered by Google Gemini AI. The AI logic is securely handled through Supabase Edge Functions.


Tech Stack

- Frontend: React + TypeScript + Vite  
- Backend: Supabase (Authentication + Edge Functions)  
- AI: Google Gemini API (called securely via Supabase Edge Function)

How to Run the Project

1. Clone the repository
git clone https://github.com/your-username/oncox.git
cd oncox

2. Install dependencies
npm install

3. Start the development server
npm run dev
The app will be available at:
http://localhost:5173

Backend Setup
The backend is powered by Supabase, including authentication and an Edge Function that securely calls the Google Gemini API.

The AI API key is stored securely in the Supabase Edge Function environment and is not exposed to the frontend.

Supabase handles user login and data flow between frontend and AI.
