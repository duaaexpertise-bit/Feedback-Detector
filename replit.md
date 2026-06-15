# Feedback Detector

AI-powered client sentiment analyzer that classifies incoming emails as Positive, Neutral, or Negative before you read them.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/mobile run dev` — run the Expo mobile app
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Required env: `OPENAI_API_KEY` — OpenAI API key for sentiment analysis and reply generation

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Mobile: Expo (React Native) with expo-router
- API: Express 5 + OpenAI SDK
- DB: PostgreSQL + Drizzle ORM (not yet used — app is frontend-first with AsyncStorage)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/mobile/` — Expo React Native app
  - `app/(auth)/` — Login and email connect screens
  - `app/(tabs)/` — Dashboard, Inbox, Analytics, Notifications, Profile tabs
  - `app/email/[id].tsx` — Email detail with sentiment analysis display
  - `app/reply/[id].tsx` — AI Reply Assistant
  - `context/AppContext.tsx` — App state (auth, emails, stats)
  - `components/SentimentBadge.tsx` — Reusable sentiment indicator
  - `components/MiniPieChart.tsx` — SVG pie chart for dashboard
  - `hooks/useGenerateReply.ts` — Calls backend to generate AI replies
- `artifacts/api-server/src/routes/sentiment.ts` — `/api/sentiment/analyze` and `/api/sentiment/reply` endpoints

## Architecture decisions

- Frontend-first: All email data is seeded locally via AsyncStorage and AppContext for the first build. No email provider OAuth is wired (demo mode).
- AI reply generation hits the Express backend (`/api/sentiment/reply`) which calls OpenAI gpt-5-nano, with a local fallback if the API is unavailable.
- Sentiment is pre-computed on mock emails; real-time analysis endpoint (`/api/sentiment/analyze`) is ready for live email sync integration.
- Tab bar uses NativeTabs (liquid glass) on iOS 26+, classic BlurView tabs on older devices.

## Product

- **Login / Demo mode** — sign in or try instantly with demo account
- **Connect Email** — OAuth flow UI for Gmail, Outlook, Office 365, IMAP
- **Dashboard** — Positive/Neutral/Negative counts, wellbeing streak, pie chart, reputation score, recent emails
- **Inbox** — Full email list with search, filter by sentiment, unread indicators
- **Email Detail** — Full sentiment banner, confidence score, key indicators, suggested response tones
- **AI Reply Assistant** — Choose tone (Professional/Friendly/Apologetic/Sales/Confident) + length, generate and edit reply
- **Analytics** — Bar chart trends (weekly/monthly), reputation monitor, mental health indicator
- **Notifications** — Priority alerts (High/Medium/Low Risk) with unread badges
- **Profile** — Connected accounts, notification settings, plan info, logout

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The OpenAI API key must be set as `OPENAI_API_KEY` secret for AI reply generation to work in production.
- Expo workflow uses HMR — only restart when adding packages or hitting Metro errors.
- Web preview has different safe area insets than native — always test on device via Expo Go for accurate layout.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
