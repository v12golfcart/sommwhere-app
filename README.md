# Sommwhere

AI-powered wine sommelier app

## Current Progress

**Frontend**: ✅ Milestone 1 Complete! Full auth flow with mock authentication working
**Backend**: ✅ Milestone 2 Complete! Flask API with Supabase database and profile endpoints
**Next Steps**: Connect frontend to backend with real authentication (Milestone 3)

## Project Structure
- `/frontend` - React Native (Expo) mobile app
- `/backend` - Python Flask API server

### Backend Architecture (Planned)
```
/backend
  /app
    /routes      # API endpoints (auth, wine analysis)
    /agents      # AI agents for wine analysis
    /models      # Database models
    /utils       # Helpers, middleware
  main.py        # Flask application entry point
  requirements.txt
  .python-version  # Python 3.13.5
```

**Tech Stack:**
- Python 3.13.5 (managed with pyenv)
- Flask for API framework
- Supabase for auth & database
- AI agents for wine analysis
- Deployment: Railway

**Core Features:**
1. Authentication - User creation, login, profile management
2. Wine Analysis - Image-based wine analysis using AI agents

## Navigation Architecture

### Frontend Route Structure
```
/app
  _layout.tsx                    # Root layout with auth context + fonts
  index.tsx                      # Traffic controller for redirects
  
  /(auth)/                       # Unauthenticated flow
    _layout.tsx                  # Stack navigator with transparent headers
    login.tsx                    # Google OAuth + Apple (coming soon)
    /onboarding/                 # New user setup flow
      username.tsx               # Required: set username
      tasteProfile.tsx           # Required: wine preferences
  
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
- **Onboarding subfolder** keeps new user flow organized separately from login

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
- **Auth**: Phone authentication (SMS via Twilio)
- **Token Storage**: Expo SecureStore (encrypted device storage)

### Authentication Architecture (Backend-Orchestrated)
The backend orchestrates the entire auth flow for security and consistency:

1. **Phone Entry**: User enters phone number in frontend
2. **OTP Request**: Frontend calls `POST /auth/request-otp` → Backend calls Supabase
3. **OTP Verification**: Frontend sends OTP to `POST /auth/verify-otp`
   - Backend verifies with Supabase
   - Checks if user exists in database
   - Returns: `{isNewUser: boolean, session: {...}, profile?: {...}}`
4. **Frontend Routing**:
   - New users → Onboarding flow (username → taste profile)
   - Existing users → Main app with profile data

### Why Backend-Orchestrated?
- Single source of truth for authentication logic
- Backend can handle custom user creation/initialization
- Easier to add features (referral codes, feature flags, etc.)
- More secure - sensitive operations stay server-side
- Frontend only stores the final session token in SecureStore

### 401 Handling Strategy (Silent Refresh)
When the backend returns a 401 Unauthorized response:

1. **Intercept at API Client Level**: Global response interceptor catches all 401s
2. **Attempt Silent Refresh**: 
   - Call Supabase `session.refresh()` to get new tokens
   - This happens transparently to the user
3. **Retry Original Request**: If refresh succeeds, retry with new token
4. **Graceful Fallback**: If refresh fails:
   - Clear all auth state and SecureStore
   - Show toast notification
   - Redirect to login screen

This provides the best UX - most token refreshes happen invisibly, and users only need to re-authenticate when absolutely necessary.

### Unified Auth Flow
The app uses a single flow for both login and signup:
1. User enters phone number
2. User receives and enters OTP
3. Backend checks if user exists:
   - **New users**: Directed to onboarding (username → taste profile)
   - **Existing users**: Directed straight to main app (tabs)

This approach eliminates user confusion about whether to "log in" or "sign up".

### Development Milestones

#### Milestone 1: Frontend Shell ✅ COMPLETE
- ✅ Set up Expo Router with file-based navigation
- ✅ Built login screen with Google OAuth button (mock)
- ✅ Built username selection screen with validation
- ✅ Built taste profile screen with character limit
- ✅ Created reusable components (Page, Button, IconButton)
- ✅ Implemented theme with custom colors and fonts
- ✅ Added toast notifications
- ✅ Mock auth with Zustand store
- ✅ Auth state change logging for debugging
- **TestFlight**: Full auth flow working with mock data

#### Milestone 2: Backend Foundation ✅ COMPLETE
- ✅ Flask API setup with Python 3.13.5
- ✅ Project structure with routes, agents, models, utils
- ✅ Supabase project creation
- ✅ Database schema (users, profiles tables)
- ✅ Profile endpoints with mock auth (GET/PUT /profile/<user_id>)
- ✅ Input validation (255 char limit on taste_profile)
- ✅ Test endpoints with curl/Postman
- **TestFlight**: No changes, backend ready
- **Note**: Auth implementation moved to Milestone 3 (frontend handles OAuth)

#### Milestone 3: Connect Auth (Backend-Orchestrated Phone Auth)
- Backend: Configure Supabase phone auth with Twilio
- Backend: Implement `/auth/request-otp` endpoint
- Backend: Implement `/auth/verify-otp` endpoint (returns isNewUser flag)
- Backend: Add JWT verification middleware for protected routes
- Frontend: Replace mock auth with real API calls
- Frontend: Implement SecureStore for token storage (not AsyncStorage)
- Frontend: Build API client with 401 interceptor for silent refresh
- Frontend: Update auth store to handle real Supabase sessions
- Frontend: Keep existing phone/OTP screens, wire to backend
- **TestFlight**: Real phone authentication working end-to-end

#### Milestone 4: Production Polish
- Error handling & retry logic
- Username validation
- Loading states
- Deep linking for OAuth
- **TestFlight**: Production-ready auth

## Backend Setup

### Prerequisites
- Python 3.13.5 (managed with pyenv)
- Supabase account and project

### Environment Setup
1. Create `.env` file in `/backend` with:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
SUPABASE_ANON_KEY=your-anon-key
SECRET_KEY=your-secret-key
```

### Running the Backend
```bash
cd backend
pyenv local 3.13.5
python -m venv venv
source venv/bin/activate  # On macOS/Linux
pip install -r requirements.txt
python main.py  # Runs on http://localhost:5000
```

### API Endpoints
- `GET /health` - Health check
- `GET /profile/<user_id>` - Get user profile
- `PUT /profile/<user_id>` - Update user profile (username, taste_profile)