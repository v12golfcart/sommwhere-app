# Sommwhere

AI-powered wine sommelier app

## Current Progress

**Frontend**: Navigation structure complete, auth screens 90% built, reusable components created
**Backend**: Not started
**Next Steps**: Complete taste profile screen, add Zustand for state management, begin backend setup

## Project Structure
- `/frontend` - React Native (Expo) mobile app
- `/backend` - Python Flask API server

## Navigation Architecture

### Frontend Route Structure
```
/app
  _layout.tsx                    # Root layout with auth context + fonts
  index.tsx                      # Traffic controller for redirects
  
  /(auth)/                       # Unauthenticated flow
    _layout.tsx                  # Stack navigator with transparent headers
    login.tsx                    # Google OAuth + Apple (coming soon)
    username.tsx                 # Required: set username
    tasteProfile.tsx             # Optional: wine preferences
  
  /(tabs)/                       # Main app (no wrapper)
    _layout.tsx                  # Tab navigator with icons
    capture.tsx                  # Default tab - wine capture
    settings.tsx                 # User settings
    (activity.tsx)               # Activity feed - planned
  
  /(modals)/                     # Full-screen modals - planned
    _layout.tsx                  # Modal presentation config
    changelog.tsx                # What's new
    profile-update.tsx           # Update profile
    tutorial/                    # Multi-step flows
      _layout.tsx
      [step].tsx
```

### Key Navigation Decisions
- **Route groups** keep auth and app states clearly separated
- **No protected wrapper** - API handles auth, keeping structure flatter
- **Modals at root level** allows them to properly overlay tabs
- **Traffic controller** (`index.tsx`) handles initial routing logic based on auth state
- **Dynamic routes** (`[step].tsx`) for repetitive screens like tutorials

### Implementation Notes
- Use parentheses `()` for route groups that don't affect URL structure
- Modals group configured with `presentation: 'modal'` in root layout
- Auth state managed by Zustand store wrapped in root layout
- Deep linking scheme: `sommwhere://` configured in app.json
- API returns 401 for unauthorized requests, triggering re-authentication

## Authentication Plan

### Tech Stack
- **Frontend**: React Native + Expo Router + Zustand
- **Backend**: Flask + Supabase (auth & DB)
- **Auth**: Google OAuth → Username → Wine preference

### Development Milestones

#### Milestone 1: Frontend Shell ✅ (90% Complete)
- ✅ Set up Expo Router with file-based navigation
- ✅ Built login screen with Google OAuth button
- ✅ Built username selection screen with validation
- ⏳ Build taste profile screen (next)
- ✅ Created reusable components (Page, Button)
- ✅ Implemented theme with custom colors and fonts
- ✅ Added toast notifications
- ⏳ Mock auth with Zustand (next)
- **TestFlight**: Basic navigation flow working

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