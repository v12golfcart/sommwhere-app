# Sommwhere

AI-powered wine sommelier app

## Current Progress

**Frontend**: ✅ Wine capture with image upload to backend
**Backend**: ✅ Deployed to production at api.sommwhere.ai
**Current**: 🚀 Production API live! End-to-end pipeline: capture → analyze → display
**Next Steps**: Sub-milestone 3 - Implement real AI wine analysis with GPT-4 Vision

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
- Deployment: Railway (Live at https://api.sommwhere.ai)

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
    capture.tsx                  # Default tab - wine capture (with camera/preview states)
    settings.tsx                 # User settings
    (activity.tsx)               # Activity feed - planned
  
  /analyze/                      # Wine analysis results
    index.tsx                    # Results screen with wine cards
  
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
- **Auth**: Dual authentication methods
  - **Primary**: Google OAuth (immediate availability)
  - **Secondary**: Phone authentication (SMS via Twilio - pending approval)
- **Token Storage**: Expo SecureStore (encrypted device storage)

### Authentication Architecture (Backend-Orchestrated)
The backend orchestrates the entire auth flow for security and consistency:

#### Google OAuth Flow (Available Now)
1. **Login Screen**: User taps "Continue with Google"
2. **OAuth Flow**: Frontend initiates Google OAuth → receives ID token
3. **Backend Verification**: Frontend sends token to `POST /auth/google`
   - Backend verifies Google ID token
   - Checks if user exists in database by email
   - Creates/updates user record
   - Returns: `{isNewUser: boolean, session: {...}, profile?: {...}}`
4. **Frontend Routing**: Same as phone flow

#### Phone Auth Flow (Pending Twilio Approval)
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
The app uses a single flow for both login and signup regardless of auth method:

**For Any Auth Method (Google or Phone):**
1. User authenticates (Google OAuth or Phone OTP)
2. Backend checks if user exists:
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

#### Milestone 3: Connect Auth (Google OAuth First, Phone Later)
**Phase 1 - Google OAuth (Immediate)**
- Backend: Configure Supabase Google OAuth provider
- Backend: Implement `/auth/google` endpoint (returns isNewUser flag)
- Backend: Add JWT verification middleware for protected routes
- Frontend: Add "Continue with Google" button to login screen
- Frontend: Implement Google OAuth flow with Supabase
- Frontend: Replace mock auth with real API calls
- Frontend: Implement SecureStore for token storage
- Frontend: Build API client with 401 interceptor for silent refresh
- Frontend: Update auth store to handle real Supabase sessions
- **TestFlight**: Real Google authentication working end-to-end

**Phase 2 - Phone Auth (After Twilio Approval)**
- Backend: Configure Supabase phone auth with Twilio
- Backend: Implement `/auth/request-otp` endpoint
- Backend: Implement `/auth/verify-otp` endpoint
- Frontend: Enable phone auth UI (already built)
- Frontend: Wire phone/OTP screens to backend
- **TestFlight**: Dual auth methods working

#### Milestone 4: Production Polish
- Error handling & retry logic
- Username validation
- Loading states
- Deep linking for OAuth
- **TestFlight**: Production-ready auth

## Wine Capture Feature Progress

### Completed
- ✅ Sub-milestone 1: Camera integration with gallery picker
- ✅ Sub-milestone 2: Send Pictures to Backend
  - ✅ Created `/analyze` endpoint
  - ✅ Image upload handling (multipart/form-data)
  - ✅ Loading states and error handling
  - ✅ Mock wine data response
  - ✅ End-to-end pipeline: capture → analyze → display results
- ✅ Photo preview state with unified capture screen
- ✅ Analyze results screen with WineResultCard component
- ✅ Reusable SommPromptInput component for AI interaction
- ✅ State management with captureSessionStore

### In Progress
- 🚧 Sub-milestone 3: Analyze Picture & Identify Wines
  - Integrate GPT-4 Vision for wine recognition
  - Extract wine details from images
  - Generate personalized tasting notes

### Components Created
- **WineResultCard**: Displays wine information with Save/Drink actions
- **SommPromptInput**: Reusable input for sommelier prompts
- **captureSessionStore**: Manages photo URI and sommelier prompt state

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

## Appendix: Wine Agent Architecture

### Overview
The wine analysis system is designed with flexibility and experimentation in mind. Instead of committing to a single AI agent implementation, we're building a system that supports multiple agent versions running simultaneously. This allows for A/B testing, gradual rollouts, and risk-free experimentation with new approaches.

### System Components

#### 1. Agent Registry (Central Hub)
- Maintains a catalog of all available agent versions (v1, v2, v3, etc.)
- Each agent has a version identifier and human-readable description
- Acts as a factory to create the appropriate agent on demand
- Enforces a common interface that all agents must implement

#### 2. Version Selection Logic (Traffic Router)
Determines which agent to use for each request, with this priority order:
1. **Developer Override** - API request headers for testing specific versions
2. **User Preference** - Saved choice from settings (beta testers only)
3. **A/B Test Assignment** - Automatic bucketing for experiments
4. **Default Version** - Fallback for all other users

#### 3. Wine Analysis Endpoint
A single API endpoint (`/analyze/wine`) that:
- Receives wine images and optional sommelier prompts
- Determines which agent version to use
- Routes the request to the appropriate agent
- Returns results with metadata about which version was used
- Logs all interactions for analytics

#### 4. Agent Implementations
Different versions of the wine analysis logic:
- **v1 (Single Agent)**: One AI agent that handles all tasks - simpler to build and maintain
- **v2 (Pipeline)**: Multiple specialized agents working together - more modular and debuggable
- **v3+**: Future improvements and experiments
- All versions follow the same input/output contract for compatibility

#### 5. User Experience Tiers

**Regular Users:**
- Take photo → Get recommendations
- No awareness of versions
- Always get the current default or A/B test assignment

**Beta Testers:**
- Same photo flow
- Can access "Wine Analysis Engine" in settings
- Can switch between available versions
- Preferences persist across sessions

**Developers:**
- Can force specific versions via API headers
- Can query available versions via `/analyze/wine/versions`
- Can run side-by-side comparisons

### Benefits of This Architecture

**Development Benefits:**
- Build new versions without modifying existing ones
- Test in production with real users safely
- Easy rollback if issues arise
- Clean separation of concerns

**Business Benefits:**
- A/B test different approaches with real metrics
- Gather user feedback before full rollout
- Validate improvements scientifically
- Minimize risk of breaking changes

**User Benefits:**
- Stable experience for most users
- Power users can experiment with new features
- No disruption during upgrades
- Gradual access to improvements

### Migration Strategy

1. **Phase 1: Single Version**
   - Launch with v1 as the only option
   - Establish baseline metrics

2. **Phase 2: Developer Testing**
   - Build v2 alongside v1
   - Internal testing via headers

3. **Phase 3: Beta Access**
   - Enable version picker for beta users
   - Gather qualitative feedback

4. **Phase 4: A/B Testing**
   - Small percentage gets v2 automatically
   - Compare metrics between versions

5. **Phase 5: Gradual Rollout**
   - Increase v2 percentage based on results
   - Monitor for issues

6. **Phase 6: New Default**
   - Make v2 the default
   - Keep v1 as fallback option

### Technical Implementation Notes

- All agents share the same base interface for compatibility
- Version selection happens at request time, not deployment time
- User preferences stored in database, not app
- Analytics track version usage for every request
- Feature flags control who sees version picker
- System designed to support 3+ versions simultaneously

This architecture essentially creates an experimentation platform specifically for our AI agents, allowing us to innovate rapidly while maintaining stability for users.

## Appendix: Wine Analysis Agent v1 Implementation Plan

### API Contract (MVP)

**Request** (multipart/form-data):
- `image`: Required. MIME type `image/*`, max 10MB
- `tasteProfile`: Optional string. User's wine preferences
- `sommPrompt`: Optional string. Specific request

**Success Response** (200 OK):
```json
{
  "wines": [
    {
      "varietal": "Cabernet Sauvignon",         // Canonicalized grape variety
      "producer": "Austin Hope",                // Winery/producer name
      "wineName": "Special Selection",          // Label/cuvée name or null
      "vintage": "2019",                        // Year as string or null
      "region": "Napa Valley, CA",              // Region or null
      "tastingNotes": "Rich dark fruit with...", // Max 150 chars
      "personalization": {                      // Can be null if no profile
        "relevance": 0.85,                      // 0-1 score
        "note": "Matches your bold reds preference"
      }
    }
  ]
}
```

**Error Response** (400):
```json
{
  "error": "No wines detected. Try a clearer photo of the label."
}
```

### Implementation Approach (MVP)

**Single Agent Module** (`backend/app/agents/somm_v1.py`):

1. **Validate** - Check MIME type, file size, base64 encoding size
2. **Extract & Personalize** - Send image + preferences to GPT-4V (sync, with timeout)
3. **Handle Empty** - Return 400 if no wines detected
4. **Return** - Strict JSON matching frontend expectations

### GPT-4 Vision Integration Tips

```python
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

# Sync call with timeout and structured output
response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    response_format={"type": "json_object"},
    timeout=30,  # 30 second timeout
    messages=[
        {
            "role": "system",
            "content": "You are a wine expert. Extract wine details from bottle labels and return JSON."
        },
        {
            "role": "user", 
            "content": [
                {"type": "text", "text": "Analyze this wine bottle"},
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
            ]
        }
    ]
)
```

### Prompt Engineering Strategy

- **Strict JSON mode** - Use `response_format` to guarantee valid JSON
- **Clear instructions** - "Extract producer, wine name, varietal, vintage, region"
- **Handle unknowns** - "Return null for missing fields rather than guessing"
- **Concise notes** - "Write 1-2 sentence tasting notes, friendly and approachable"
- **Include preferences** - Pass taste profile and somm prompt for intelligent personalization
- **Let AI interpret** - GPT-4V evaluates relevance and explains why wines match preferences

### MVP Scope Decisions

**Include:**
- Bottle label recognition only (wine lists as stretch goal)
- Basic personalization with relevance scoring
- Simple error messages
- Direct GPT-4V integration
- Input validation (MIME type, file size < 10MB)
- Tasting notes capped at 150 characters
- Basic logging (wines found, profile presence)

**Exclude (for now):**
- Caching (optimize later if needed)
- Confidence scores per wine
- Price extraction
- Scene type detection
- Complex error codes
- OCR evidence/snippets

### Quick Implementation Path

```python
class SommV1Agent:
    def analyze(self, image_data: bytes, taste_profile=None, somm_prompt=None):
        # 1. Validate & encode image
        base64_image = base64.b64encode(image_data).decode('utf-8')
        if len(base64_image) > 13.5 * 1024 * 1024:
            raise ValueError("Image too large")
        
        # 2. Extract wines AND personalize (GPT-4V handles both)
        wines = self._extract_and_personalize(
            base64_image, taste_profile, somm_prompt
        )
        
        # 3. Handle empty result in endpoint (return 400)
        if not wines:
            return {"wines": []}
            
        return {"wines": wines}
```

### Testing Approach

Keep 10-15 test images:
- Clear bottle labels (various varietals)
- Slightly angled shots
- Different lighting conditions
- Non-wine images (should error gracefully)

Track metrics:
- Successful extraction rate
- Field completeness (how many fields filled)
- Personalization relevance
- Response time

This lean approach ships value quickly while maintaining quality and setting up for future enhancements.