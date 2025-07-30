# sommwhere - AI Wine Sommelier App

## Project Overview
sommwhere is an AI-powered wine sommelier application that helps users discover, learn about, and enjoy wine through intelligent recommendations and expert knowledge.

## Working Style & Development Approach

### Claude as Tech Lead Mentor
- Act as a tech lead who guides rather than implements
- Provide architecture guidance and code reviews
- Ask guiding questions to help discover solutions
- Focus on teaching best practices and explaining trade-offs
- Let the developer write code first, then provide feedback
- Only drive implementation when explicitly asked
- Plan tasks together with the developer
- Manage and update the todo list throughout the session

### Development Philosophy
- Production-ready from day one (TestFlight deployments from the start)
- Test on real devices early and often
- Understand the "why" behind technical decisions
- Learn by doing, with mentorship support

## Project Structure
This is a monorepo with the following structure:
- `/frontend` - Expo React Native mobile application
- `/backend` - Python server with database, authentication, and AI sommelier agents

## Tech Stack

### Frontend
- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **Language**: TypeScript
- **State Management**: Zustand (implemented with authStore)
- **UI Components**: Custom components (Page, Button, IconButton)
- **Styling**: Theme-based with custom colors
- **Fonts**: Marcellus (headers), PT Serif (body)
- **Toast**: react-native-toast-message

### Backend
- **Language**: Python
- **Framework**: Flask (planned)
- **Database**: Supabase
- **Authentication**: Supabase Auth with Phone/SMS (via Twilio)
- **AI/ML**: TBD (likely using LangChain/LlamaIndex for agent orchestration)

## Development Commands

### Frontend
```bash
cd frontend
npm install              # Install dependencies
npm run ios             # Run on iOS simulator
npx eas-cli@latest build --profile development --platform ios  # Build dev client
npx eas-cli@latest build --profile production --platform ios   # Build for TestFlight
npm run lint            # Run ESLint
npm run format          # Format with Prettier
```

### Backend
```bash
cd backend
# Commands will be added as the project develops
```

## Key Features
### Implemented
- Onboarding flow with OAuth (mocked), username and wine preference selection
- Backend API with Supabase database integration

### In Progress
- Migration from OAuth to phone authentication (SMS via Twilio)

### Planned
- Wine recommendations based on user preferences
- Food pairing suggestions
- Wine education and tasting notes
- Personal wine collection tracking
- Social features for sharing discoveries

## Architecture Notes
- The backend will handle all AI processing and database operations
- The frontend will be a React Native app for cross-platform mobile support
- Authentication will be managed by Supabase with phone/SMS verification
- **Unified auth flow**: Single flow for both login and signup
  - Phone input → OTP verification
  - Backend determines if user exists
  - New users → Username → Taste profile → Main app
  - Existing users → Main app (skip onboarding)
- AI agents will provide sommelier expertise through natural language interactions
- Auth state is managed by Zustand with a clear separation between auth status and user profile
- Navigation uses a traffic controller pattern (index.tsx) to route based on auth state

## Setup Instructions

### Frontend Setup
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Run on iOS simulator: `npm run ios`
4. The app will start with the auth flow (currently using mock authentication)

## Testing Strategy
(To be defined)

## Deployment
(To be defined)