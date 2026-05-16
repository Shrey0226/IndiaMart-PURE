# IndiaMart PURE – Project Skills & Developer Guide

A practical reference for building, extending, and maintaining this project.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Environment Setup](#4-environment-setup)
5. [Running the App](#5-running-the-app)
6. [Architecture Deep-Dive](#6-architecture-deep-dive)
7. [Data Layer](#7-data-layer)
8. [API Routes](#8-api-routes)
9. [Authentication (Firebase)](#9-authentication-firebase)
10. [Frontend Components](#10-frontend-components)
11. [AI / LLM Integration](#11-ai--llm-integration)
12. [Adding New Features](#12-adding-new-features)
13. [Common Patterns & Conventions](#13-common-patterns--conventions)
14. [Troubleshooting](#14-troubleshooting)

---

## 1. Project Overview

**IndiaMart PURE** is a B2B marketplace seller intelligence dashboard. It allows internal analysts or account managers to:

- Look up a paid seller by their **GL User ID (GLID)**
- View engagement metrics, category performance (MCATs), BLNI signals, and support tickets
- Run an AI-powered analysis that produces churn risk scores, retention probability, frustration level, summarised tickets, and a detailed strategic report
- Authenticate via Google (Firebase Auth) before accessing any data

The app is a **full-stack Node.js + React** project:  
- The **Express backend** serves data from local JSON files and proxies calls to an LLM Gateway  
- The **React frontend** (Vite + TypeScript) renders the dashboard with charts and AI insights

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19, TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animations | Motion (Framer Motion) |
| Charts | Recharts |
| Icons | Lucide React |
| Routing | React Router v7 |
| Auth | Firebase Auth (Google Sign-In) |
| Database (auth state) | Firestore |
| Backend | Express 4 + tsx (TypeScript runner) |
| AI / LLM | OpenAI-compatible LLM Gateway (`imllm.intermesh.net`) |
| HTTP client | Axios |
| Markdown rendering | react-markdown |

---

## 3. Project Structure

```
IndiaMart-PURE-main/
├── data/                        # Static JSON data files (local "database")
│   ├── paid_seller_details.json  # Seller profiles keyed by GLID
│   ├── tickets_against.json      # Buyer complaints keyed by GLID
│   ├── tickets_by.json           # Seller-raised issues keyed by GLID
│   ├── updated_mcat_data.json    # Market category demand keyed by "GLID: <id>"
│   ├── updated_blni_data.json    # Buy Lead / NI data keyed by "GLID: <id>"
│   ├── mcat_data.json            # Raw MCAT source
│   └── blni.json                 # Raw BLNI source
│
├── public/
│   └── indiamart-logo.png
│
├── src/
│   ├── components/
│   │   ├── Login.tsx             # Google Sign-In page
│   │   └── ProtectedRoute.tsx    # Auth guard wrapper
│   ├── context/
│   │   └── AuthContext.tsx       # Firebase auth state provider
│   ├── lib/
│   │   └── firebase.ts           # Firebase app initialisation
│   ├── pages/
│   │   └── Dashboard.tsx         # Main page (search + data + AI panel)
│   ├── services/
│   │   └── api.ts                # Axios wrappers for /api/* endpoints
│   ├── App.tsx                   # Router + AuthProvider shell
│   ├── index.css                 # Tailwind base styles
│   ├── main.tsx                  # React entry point
│   └── vite-env.d.ts
│
├── server.ts                     # Express server (API routes + Vite middleware)
├── index.html                    # HTML shell
├── vite.config.ts
├── tsconfig.json
├── package.json
├── .env.example                  # Environment variable template
└── SKILLS.md                     # ← You are here
```

---

## 4. Environment Setup

Copy `.env.example` to `.env.local` (Vite reads this automatically):

```bash
cp .env.example .env.local
```

Then fill in the values:

```env
# LLM Gateway – internal IndiaMART gateway (OpenAI-compatible API)
LLM_GATEWAY_URL="https://imllm.intermesh.net/v1"
LLM_GATEWAY_KEY="<your-key>"
LLM_GATEWAY_MODEL="openrouter/qwen/qwen3-32b"

# Firebase – get these from Firebase Console → Project Settings → Your Apps
VITE_FIREBASE_API_KEY="<your-key>"
VITE_FIREBASE_AUTH_DOMAIN="seller-dashboard-a99dd.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="seller-dashboard-a99dd"
VITE_FIREBASE_STORAGE_BUCKET="seller-dashboard-a99dd.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="758766783522"
VITE_FIREBASE_APP_ID="<your-app-id>"
VITE_FIREBASE_MEASUREMENT_ID="G-S2MN4L6S7K"

APP_URL="http://localhost:3000"
```

> **Important:** Variables prefixed with `VITE_` are exposed to the browser bundle.  
> Never put `LLM_GATEWAY_KEY` in a `VITE_` variable — it stays server-side only.

---

## 5. Running the App

```bash
# Install dependencies
npm install

# Development (Express + Vite HMR together on port 3000)
npm run dev

# Type-check without emitting
npm run lint

# Production build
npm run build

# Serve production build
npm start
```

The dev server runs at **http://localhost:3000**.  
Express handles `/api/*` routes; everything else is served by Vite's SPA middleware.

---

## 6. Architecture Deep-Dive

```
Browser (React SPA)
  │
  │  /api/seller/:id   →  reads JSON files, returns merged seller payload
  │  /api/analyze      →  sends payload to LLM Gateway, returns AI analysis
  ▼
Express (server.ts)
  │
  ├── data/*.json       (local static data, replaces a database)
  └── LLM Gateway       (OpenAI-compatible HTTP endpoint)
```

**Request flow for a seller lookup:**

1. User types a GLID and hits Search in `Dashboard.tsx`
2. `fetchSellerDetails(glid)` calls `GET /api/seller/:id`
3. Express reads `paid_seller_details.json`, `tickets_against.json`, `tickets_by.json`, `updated_mcat_data.json`, `updated_blni_data.json`
4. Merges them and returns a single JSON object
5. Dashboard renders the metrics, charts, and ticket tables
6. User clicks "Analyse" → `analyzeSeller(payload)` calls `POST /api/analyze`
7. Express constructs a detailed prompt and sends it to the LLM Gateway
8. AI returns a structured JSON analysis; dashboard renders scores, cards, and the markdown report

---

## 7. Data Layer

All data lives in `data/` as static JSON files. There is no live database.

### Key lookups

| File | Key format | Contains |
|---|---|---|
| `paid_seller_details.json` | `"<GLID>"` (e.g. `"94955292"`) | Seller profile + `user_metrics` |
| `tickets_against.json` | `"<GLID>"` | `{ tickets: [...] }` – buyer complaints |
| `tickets_by.json` | `"<GLID>"` | `{ tickets: [...] }` – seller-raised issues |
| `updated_mcat_data.json` | `"GLID: <GLID>"` | MCAT demand by month |
| `updated_blni_data.json` | `"GLID: <GLID>"` | Buy Lead / NI data by month |

> Note the key format difference: seller details use a bare GLID string, while MCAT and BLNI use `"GLID: <GLID>"`.  
> This normalisation happens in `server.ts`:
> ```typescript
> const normalizedKey = `GLID: ${gl_user_id}`;
> ```

### Adding or updating data

1. Edit or replace the relevant JSON file in `data/`
2. No server restart needed in dev — `readData()` reads from disk on every request
3. In production, rebuild the Docker image / redeploy to pick up new data

---

## 8. API Routes

Both routes are defined in `server.ts`.

### `GET /api/seller/:id`

Returns a merged payload for a seller:

```json
{
  "seller": { ...seller_profile, "user_metrics": { ... } },
  "ticketsAgainst": [ ...ticket_objects ],
  "ticketsBy": [ ...ticket_objects ],
  "mcats": [ ...mcat_objects ],
  "blni": [ ...blni_objects ]
}
```

**Error responses:**
- `404` – GLID not found in `paid_seller_details.json`
- `500` – File read or parse error

### `POST /api/analyze`

**Request body:**
```json
{
  "seller": { ...seller_object },
  "ticketsAgainst": [...],
  "ticketsBy": [...],
  "mcats": [...]
}
```

**Response** (AI-generated JSON):
```json
{
  "satisfactionScore": 72,
  "churnRisk": "Medium",
  "frustrationLevel": "Low",
  "topIssues": ["Lead quality", "..."],
  "retentionProbability": 68,
  "summaryPoints": ["...", "...", "..."],
  "recommendedActions": ["...", "..."],
  "detailedReport": "# Executive Summary\n...",
  "summarizedTicketsAgainst": [{ "id": 1, "reason": "...", "result": "...", "severity": "High" }],
  "summarizedTicketsBy": [...]
}
```

---

## 9. Authentication (Firebase)

Authentication uses **Firebase Auth with Google Sign-In**.

### Files involved

| File | Role |
|---|---|
| `src/lib/firebase.ts` | Initialises Firebase app, exports `auth`, `db`, `googleProvider` |
| `src/context/AuthContext.tsx` | React context that wraps `onAuthStateChanged`; exposes `user` and `signOut` |
| `src/components/Login.tsx` | Sign-in page with Google button |
| `src/components/ProtectedRoute.tsx` | Redirects to `/login` if `user` is null |

### Auth flow

1. Unauthenticated users land on `/login`
2. Clicking "Sign in with Google" calls `signInWithPopup(auth, googleProvider)`
3. On success, `AuthContext` receives the user and stores it in state
4. `ProtectedRoute` renders the `Dashboard`

### Adding a new protected page

```tsx
// App.tsx
<Route
  path="/new-page"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

---

## 10. Frontend Components

### `Dashboard.tsx`

The entire application UI lives here. Key sections:

| Section | What it renders |
|---|---|
| `InteractiveDemo` | Landing/hero shown before any search |
| Search bar | GLID input + Search button |
| Seller header | Company name, city, tier, rating |
| Metrics grid | Engagement, credit, enquiry KPI cards |
| MCAT charts | Bar charts for page views and buy leads per category |
| Tickets panel | Tables for complaints against / by the seller |
| AI Analysis panel | Score gauges, risk badges, recommendations, detailed markdown report |

### State shape in Dashboard

```typescript
const [sellerData, setSellerData] = useState<SellerData | null>(null);
const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
const [loading, setLoading] = useState(false);
const [analysisLoading, setAnalysisLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'analysis'>('overview');
```

### Adding a new tab

1. Add the tab label to the `activeTab` union type
2. Add a button in the tab bar (search for the existing tab buttons)
3. Conditionally render your content: `{activeTab === 'my-tab' && <MySection />}`

### Adding a new chart

Use Recharts. All charts follow this wrapper pattern:

```tsx
<ResponsiveContainer width="100%" height={220}>
  <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
    <YAxis tick={{ fontSize: 11 }} />
    <Tooltip />
    <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
```

---

## 11. AI / LLM Integration

### LLM Gateway

The gateway at `https://imllm.intermesh.net/v1` is an OpenAI-compatible endpoint (same `chat.completions.create` interface). The client is initialised in `server.ts`:

```typescript
const openai = new OpenAI({
  apiKey: process.env.LLM_GATEWAY_KEY,
  baseURL: process.env.LLM_GATEWAY_URL,
});
```

### Changing the model

Set `LLM_GATEWAY_MODEL` in `.env.local`. Default: `openrouter/qwen/qwen3-32b`.

### Prompt structure (`/api/analyze`)

The prompt is assembled server-side and includes:

- Seller core metrics (engagement, credits, rating)
- MCAT data (JSON-serialised)
- Ticket summaries (truncated: 1500 chars for buyer complaints, 800 for seller issues)
- Explicit output schema in the prompt so the model returns valid JSON

The system prompt instructs the model to behave as a "McKinsey-style marketplace intelligence engine" and return **only a valid JSON object** — no markdown fences, no preamble.

### Extending the AI output schema

1. Add the new field to the `AIAnalysis` TypeScript interface in `Dashboard.tsx`
2. Add it to the `OUTPUT STRUCTURE` section of the prompt in `server.ts`
3. Add it to the system prompt's schema description if needed
4. Render the new field in the dashboard

### JSON safety

The server strips markdown code fences before parsing (models sometimes wrap JSON in ` ```json `):

```typescript
if (cleanContent.startsWith('```')) {
  const match = cleanContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (match?.[1]) cleanContent = match[1].trim();
}
```

---

## 12. Adding New Features

### New data source

1. Add the JSON file to `data/`
2. Call `readData('your-file.json')` in the relevant route in `server.ts`
3. Include the data in the API response
4. Update `src/services/api.ts` if the response shape changes
5. Consume in `Dashboard.tsx`

### New API endpoint

```typescript
// server.ts
app.get('/api/your-endpoint', async (req, res) => {
  try {
    const data = await readData('your-file.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

Then add a corresponding function in `src/services/api.ts`:

```typescript
export const fetchYourData = async (param: string) => {
  const response = await api.get(`/your-endpoint?param=${param}`);
  return response.data;
};
```

### Replacing static JSON with a real database

The `readData()` helper in `server.ts` is the single seam. Replace it with your ORM/query call:

```typescript
// Before
const sellers = await readData('paid_seller_details.json');
const seller = sellers[gl_user_id];

// After (e.g. with Prisma)
const seller = await prisma.seller.findUnique({ where: { glid: gl_user_id } });
```

---

## 13. Common Patterns & Conventions

### TypeScript interfaces

All data shapes are typed in `Dashboard.tsx` near the top of the file. Keep them colocated with the component that uses them; extract to `src/types/` only if shared across multiple files.

### Error handling

Loading and error states follow this pattern throughout:

```typescript
setLoading(true);
setError(null);
try {
  const data = await fetchSellerDetails(glid);
  setSellerData(data);
} catch (err: any) {
  setError(err.response?.data?.error || 'Something went wrong');
} finally {
  setLoading(false);
}
```

### Tailwind styling

Tailwind v4 is used. Utility classes are written inline. The brand accent colour used throughout is `orange-500` / `orange-600`. Background palette is `slate-50` / `slate-100`.

### Environment variables in frontend

Access Vite env vars with `import.meta.env.VITE_*`. These are replaced at build time; they are not available at Node.js runtime.

---

## 14. Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| `LLM_GATEWAY_KEY is missing` | `.env.local` not created or key not set | Copy `.env.example` → `.env.local` and fill in the key |
| Seller not found (404) | GLID not in `paid_seller_details.json` | Verify the GLID; check file for the exact key format |
| MCAT/BLNI data empty | Key mismatch | Keys in those files must be `"GLID: <id>"` not just `"<id>"` |
| Firebase login loop | `VITE_FIREBASE_API_KEY` missing or wrong | Check Firebase Console → Project Settings → Your Apps |
| `JSON Parse Error` from AI | Model returned non-JSON or markdown-fenced JSON | The server strips fences automatically; check model response in logs |
| Charts not rendering | `recharts` `ResponsiveContainer` needs a defined parent height | Wrap in a `div` with explicit `h-*` class |
| Port 3000 already in use | Another process is running | Kill it with `lsof -ti:3000 \| xargs kill` or change `PORT` in `server.ts` |
