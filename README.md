# iRefer — Hệ thống Giới thiệu Nhân sự iKame

Nền tảng gamification nội bộ giúp nhân viên iKame giới thiệu ứng viên tiềm năng và nhận điểm thưởng.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS v4 + `@frontend-team/ui-kit` |
| State | Zustand (auth) + TanStack Query v5 (server state) |
| Routing | React Router v7 |
| Icons | Lucide React |
| HTTP | Axios |

## Quick Start

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình environment
```bash
cp .env.example .env.local
```

Chỉnh sửa `.env.local`:
```bash
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_USE_MOCK=true   # Đặt false để dùng real API
VITE_GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
```

### 3. Chạy development server
```bash
npm run dev
# → http://localhost:3000
```

### 4. Build production
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── auth/          ← ProtectedRoute, auth guards
│   ├── dashboard/     ← Dashboard widget components
│   ├── layout/        ← Layout, Header, Sidebar, BottomNav
│   └── ui/            ← Shared UI primitives
├── hooks/             ← React Query data hooks
├── lib/               ← Utility functions (points, status)
├── pages/             ← Full page components
│   ├── Login.tsx      ← Google OAuth login page
│   ├── AuthCallback.tsx  ← OAuth redirect handler
│   └── ...
├── services/          ← API/mock service layer (see README.md)
│   ├── README.md      ← Endpoint mapping table
│   ├── api-client.ts  ← Axios instance + JWT interceptors
│   └── mock-data/     ← Mock response fixtures
├── store/             ← Zustand stores
└── types/             ← TypeScript interfaces (= API contracts)

docs/
├── api-contracts.md          ← Full REST API specification
├── backend-integration-guide.md ← Dev handoff guide
├── ihiring-integration.md    ← iHiring ATS integration
└── gamification-rules.md     ← Points/tier computation rules
```

## Mock vs Real API

**Chạy với mock data** (không cần backend):
```bash
VITE_USE_MOCK=true npm run dev
```
→ Tất cả dữ liệu từ `src/services/mock-data/`

**Kết nối backend thực:**
```bash
VITE_USE_MOCK=false VITE_API_BASE_URL=https://... npm run dev
```
→ Frontend gọi real HTTP endpoints

## Tài liệu

| Tài liệu | Mô tả |
|----------|-------|
| `docs/api-contracts.md` | Tất cả REST API endpoints với schema |
| `docs/backend-integration-guide.md` | Hướng dẫn kết nối backend |
| `docs/ihiring-integration.md` | Tích hợp iHiring ATS |
| `docs/gamification-rules.md` | Logic tính điểm & ambassador tiers |
| `src/services/README.md` | Bảng mapping Service → Endpoint |

## Scripts

```bash
npm run dev      # Dev server (port 3000)
npm run build    # Production build
npm run lint     # TypeScript type check
npm run preview  # Preview production build
```
