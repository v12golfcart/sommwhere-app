# Sommwhere

AI-powered wine sommelier app

## Project Structure
- `/frontend` - React Native (Expo) mobile app
- `/backend` - Python Flask API server

## Navigation Architecture

### Frontend Route Structure
```
/app
  _layout.tsx                    # Root layout with auth context
  index.tsx                      # Traffic controller for redirects
  
  /(auth)/                       # Unauthenticated flow
    _layout.tsx                  # Stack navigator
    welcome.tsx                  # Landing screen
    login.tsx                    # Google OAuth
    username.tsx                 # Required: set username
    profile-setup.tsx            # Optional: wine preferences
  
  /(app)/                        # Protected/authenticated wrapper
    _layout.tsx                  # Auth guard
    (tabs)/                      # Main app
      _layout.tsx                # Tab navigator
      capture.tsx                # Default tab - wine capture
      activity.tsx               # Activity feed
      settings.tsx               # User settings
  
  (modals)/                      # Full-screen modals
    _layout.tsx                  # Modal presentation config
    changelog.tsx                # What's new
    profile-update.tsx           # Update profile
    tutorial/                    # Multi-step flows
      _layout.tsx
      [step].tsx
```

### Key Navigation Decisions
- **Route groups** keep auth and app states clearly separated
- **Protected wrapper** `/(app)/` ensures all authenticated routes are guarded
- **Modals at root level** allows them to properly overlay tabs
- **Traffic controller** (`index.tsx`) handles initial routing logic based on auth state
- **Dynamic routes** (`[step].tsx`) for repetitive screens like tutorials

### Implementation Notes
- Use parentheses `()` for route groups that don't affect URL structure
- Modals group configured with `presentation: 'modal'` in root layout
- Auth state managed by Zustand store wrapped in root layout
- Deep linking scheme: `sommwhere://` configured in app.json
- Protected routes redirect to `/(auth)/welcome` when unauthenticated

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