# 🌶️ Lutenitsa Appraiser 🍅

A web app for rating and discussing lutenitsa brands. Authenticated users can add appraisals and comments.


## ✨ Features
- 🔐 Secure user authentication
- ✍️ Add appraisals (brand/rating/evaluation)
- 💬 Comment on existing appraisals
- 📱 Mobile-friendly (Angular Material)
- 🍥 Responsive design

## 🈺 Application Workflow

### 🔐 User Authentication
- **Action**: User signs up or logs in  
- **Backend**: Supabase auth handles registration/login and session management

### 📊 Catalog View
- **Action**: User views Lutenitsa appraisals  
- **Backend**: Fetches all appraisals from database

### 📝 Adding an Appraisal
- **Action**: Authenticated user submits new appraisal  
- **Backend**: Creates new record in appraisals table

### ✍️ Adding a Comment
- **Action**: Authenticated user comments on appraisal  
- **Backend**: Stores comment linked to appraisal and user


## 🛠️ Tech Stack
### Frontend
- Angular 20
- TypeScript
- Angular Material
- Angular Animations
- RxJS
- NgRx

### Backend
- Supabase (PostgreSQL)
- Row-Level Security (enabled)
- JWT Authentication
- Realtime API

## 🛠️ Project Details

### 🖥️ Frontend Components
- **📜 Catalog** (Catalog display)
- **🔍 Details** (Single view)
- **✏️ AppraisalFormComponent** (Submission form)
- **💬 Comments** (Comment interface)

### ⚙️ Services
- **👤 AuthService** (User authentication)
- **🗃️ DataService** (Database operations)

### 🗄️ Database Tables
**📦 appraisals**
- id, brand_name, rating, appraise, user_id, created_at

**💭 comments**  
- id, appraisal_id, user_id, comment_text, created_at

**👥 profiles**  
- id, email

## 🔄 Implemented Angular Lifecycle Hooks

This web application implements the necessary Angular lifecycle hooks to properly manage initialization, data loading, and cleanup operations. The hooks follow Angular's best practices for component lifecycle management.