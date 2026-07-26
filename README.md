# Bodhrik Session Dashboard

An elegant, premium analytics and dashboard interface for managing and reviewing student coaching sessions. Built using Next.js 16 (App Router), Tailwind CSS, and Recharts.

## Overview
This application serves as an end-to-end prototype for coaches to monitor student session progression, query historical data, filter past sessions, and visualize quantitative key performance indicators (KPIs)—including **engagement**, **clarity**, and **pacing**—over the course of each session.

### Key Features
- **Mock Authentication Flow**: Reusable authentication helpers and custom hooks with layout routing guards.
- **Dynamic Search & Filtering**: Client-side name search and range-based date filters.
- **Session Progression Charting**: Fully responsive timeline rendering for session metrics using Recharts.
- **Deliberate State Handling**: Dedicated designs for loading, empty, and error states, with immediate click-to-retry actions.
- **Mobile-First Responsiveness**: Responsive grids, stacked forms, and elastic containers designed for all viewport sizes.

---

## Tech Stack
- **Framework**: Next.js 16.2.11 (App Router)
- **Runtime & Compilation**: React 19, TypeScript, Turbopack
- **Styling**: Tailwind CSS 4
- **Visualization**: Recharts (with SSR-safe rendering)

---

## Setup Instructions

### Prerequisites
Ensure you have Node.js (v18+) and npm installed.

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

### Mock Login Credentials
- **Email**: `reviewer@demo.com`
- **Password**: `password123`
*(Note: Any valid-looking email and password will bypass the mock authentication check).*

---

## Architecture Choices

1. **Client-Side Filtering**:
   - For the scope of this prototype, we implemented client-side state filtering on fetched data, combined with dynamic API route mock endpoints (`/api/sessions`).
2. **Next.js App Router Structure**:
   - Layout protection is centralized inside `/sessions/layout.tsx` to handle authentication routing redirects cleanly without relying on Next.js middleware (maintaining minimal overhead).
3. **Recharts SSR Wrapping**:
   - Implemented a custom React mounting state check inside the `MetricsChart` component to prevent hydration errors caused by Recharts referencing browser window objects during Next.js SSR.

---

## Trade-offs

- **Client-Side Filter State**:
  - *Trade-off*: Currently, filters are stored in local React states.
  - *Impact*: Refreshing the page resets filters. (URL sync was deprioritized under the timebox constraint).
- **LocalStorage Auth Mocking**:
  - *Trade-off*: Mock auth uses browser-based localStorage.
  - *Impact*: Sufficient for user walkthroughs, but lacks server-side HTTP-only session verification for true production security.

---

## Scaling to 10,000+ Sessions

If the application scaled to 10,000+ sessions, we would implement the following updates:

1. **Server-Side Filtering & Pagination**:
   - Replace client-side array operations with server-side pagination (e.g., cursor-based pagination) and indexed queries in a database (like PostgreSQL/MongoDB).
   - Update `getSessions()` to accept `page`, `limit`, and search parameters to be executed directly in database query filters.
2. **Database Indexing**:
   - Index the `student` string field (using full-text search index or prefix-index) and composite-index the `date` fields to ensure queries execute under 50ms.
3. **Optimized API Responses**:
   - Exclude heavy fields like `metrics` or `notes` in the list query. Only fetch summary fields for cards, then fetch full details on request.
4. **Caching & CDN**:
   - Introduce Redis for server-side caching of query patterns and session lists, invalidating entries on new session creations.
5. **Chart Data Downsampling**:
   - If timeline charts plotted thousands of points, use downsampling (e.g., LTTB algorithm) to keep render payload minimal.