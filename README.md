# Sommwhere

AI-powered wine sommelier app

## Project Structure
- `/frontend` - React Native (Expo) mobile app
- `/backend` - Python Flask API server

## Authentication Plan

### Tech Stack
- **Frontend**: React Native + Expo Router + Zustand
- **Backend**: Flask + Supabase (auth & DB)
- **Auth**: Google OAuth → Username → Wine preference

### Development Milestones

#### Milestone 1: Frontend Shell
- Set up Expo Router
- Build onboarding screens (Welcome → Login → Username → Wine preference)
- Mock auth with Zustand
- **TestFlight**: Working UI flow

#### Milestone 2: Backend Foundation  
- Flask API setup
- Supabase project with Google OAuth
- Database schema (users, profiles)
- Basic endpoints (/auth/callback, /profile)
- **TestFlight**: No changes, backend ready

#### Milestone 3: Connect Auth
- Implement react-native-app-auth
- Connect real Google OAuth flow
- Secure token storage
- Wire up all endpoints
- **TestFlight**: Real authentication working

#### Milestone 4: Production Polish
- Error handling & retry logic
- Username validation
- Loading states
- Deep linking for OAuth
- **TestFlight**: Production-ready auth