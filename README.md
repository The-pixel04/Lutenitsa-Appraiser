🌶️ Lutenitsa Appraiser 🍅
Welcome to the Lutenitsa Appraiser, a web application designed for connoisseurs and enthusiasts of Lutenitsa! This platform allows users to explore, rate, and catalog various Lutenitsa brands, sharing their passion and opinions with a community of fellow food lovers.

✨ Key Features
User Authentication: Secure user registration and login to personalize your experience. 🔐

Appraisal System: Detailed forms to appraise Lutenitsa based on taste, texture, ingredients, and more. 📈

Responsive Design: A seamless experience on any device, from desktop to mobile, powered by Angular Material. 📱

Catalog Browsing: Browse a comprehensive catalog of Lutenitsa brands and their community ratings. 📖

💬 New Feature: Appraiser Comments
This new functionality enhances community engagement by allowing authenticated users to add their personal comments to any existing appraisal.

Commenting System: A dedicated section on each appraisal page for authenticated users to leave comments.

User-Specific: Comments are tied to the user's profile, providing a clear identity and preventing anonymous feedback.

Moderation (Conceptual): The system could be designed with moderation tools to ensure comments are constructive and relevant.

This feature is designed to foster a vibrant community and provide richer context for each appraisal.

💻 Frontend (Web App)
The user-facing part of the application is a modern, single-page application built with Angular.

Framework: Angular

UI Library: Angular Material for a consistent and professional look and feel.

Language: TypeScript

Styling: CSS

Purpose: The frontend is responsible for all user interaction, including authentication flows, displaying the Lutenitsa catalog, and rendering appraisal forms and comments.

⚙️ Backend & API
The backend for this application is powered by Supabase. This provides a full-featured, open-source backend-as-a-service.

Platform: Supabase

Purpose: Supabase manages the PostgreSQL database, handles user authentication, and provides a powerful API for the frontend to interact with.

Data Storage: All user data, appraisal details, and comments are stored securely within the Supabase database.

API: All communication between the Angular frontend and the backend is handled through Supabase's API.

Security: Supabase's built-in authentication and security features ensure data integrity and protect user information.

🚀 Getting Started
To get the app running locally, you'll need to:

Clone the repository: git clone https://github.com/The-pixel04/Lutenitsa-Appraiser.git

Navigate to the project directory.

Install dependencies: npm install

Start the development server: ng serve

Open your browser to http://localhost:4200 to see the app in action.