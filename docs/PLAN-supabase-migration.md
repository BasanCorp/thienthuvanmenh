# PLAN: Supabase Migration & Gemini Integration

## Context
- **Project:** Co Hoc Tinh Hoa (React + Vite)
- **Objective:** Migrate from static frontend to full-stack app using Supabase Backend and Vercel Frontend.
- **Key Features:**
    - Authentication (Google/Email) via Supabase Auth.
    - Database for User Profiles & Chat History via Supabase Postgres.
    - AI Chat ("Thầy AI") powered by Gemini via Supabase Edge Functions.
    - Premium Features (PDF Export, Advanced Chat).

## Phase 1: Setup & Environment (Foundation)
- [ ] **Initialize Supabase Project**
    - Create project on app.supabase.com (User to do manually or provide credentials).
    - Get `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
- [ ] **Environment Configuration**
    - Create `.env.local` for development (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
    - Configure Vercel Project Settings with same Env Vars.
- [ ] **Install Dependencies**
    - `npm install @supabase/supabase-js`
    - `npm install markdown-to-jsx` (for rendering AI chat response).

## Phase 2: Database & Auth (Backend)
- [ ] **Database Schema Design**
    - Table `profiles`:
        - `id` (uuid, references auth.users)
        - `full_name` (text)
        - `is_premium` (boolean, default false)
        - `credits` (int, default 3 - free AI chats)
    - Table `chat_history`:
        - `id` (uuid)
        - `user_id` (uuid)
        - `message` (text)
        - `role` (user/assistant)
        - `created_at` (timestamp)
- [ ] **Row Level Security (RLS)**
    - Policies to ensure users can only read/write their own data.
- [ ] **Auth Implementation**
    - Create `src/lib/supabaseClient.js`.
    - Create `AuthProvider.jsx` context to manage user state globally.
    - Add Login/Register components (using Supabase UI or custom).

## Phase 3: AI Integration (Edge Functions)
- [ ] **Setup Supabase CLI** (if local dev needed) or use Dashboard to deploy function.
- [ ] **Create Edge Function: `chat-gemini`**
    - Logic:
        1.  Receive `prompt` and `history` from frontend.
        2.  Check User Auth & Credits (Middleware).
        3.  Call Google Gemini API (using `GEMINI_API_KEY` stored in Supabase Secrets).
        4.  Stream response back to frontend.
        5.  Deduct credit if free user.
- [ ] **Secret Management**
    - Store `GEMINI_API_KEY` safely in Supabase Secrets (never in frontend code).

## Phase 4: Frontend Integration (UI/UX)
- [ ] **Connect Auth UI**
    - Add "Đăng nhập" button to Navigation.
    - Protect Premium routes (`PremiumReportPage`).
- [ ] **Connect Chat Interface**
    - Update `ChatComponent` to call `supabase.functions.invoke('chat-gemini')`.
    - Display streaming response.
- [ ] **Premium Gate**
    - If `is_premium` is false, limit chat length or number of messages.
    - Disable PDF export if not premium.

## Phase 5: Deployment & Verification
- [ ] **Deploy Frontend to Vercel**
    - Connect GitHub Repo to Vercel.
    - Verify Build Settings.
- [ ] **Verification Checklist**
    - [ ] User can sign up/login.
    - [ ] User profile is created in DB.
    - [ ] Chat sends to Gemini and receives response.
    - [ ] Secrets are NOT exposed in network tab.
    - [ ] Premium features are locked for free users. 
