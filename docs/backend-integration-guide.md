# Backend Integration Guide

This guide describes how to connect the iRefer frontend with the real backend.

## 1. Setup Environment
Currently, the application runs in a "Mock-First" mode by checking `VITE_USE_MOCK`.

To connect to the local or staging backend, update the `.env` file in the frontend repository:
```env
VITE_API_BASE_URL=https://api.staging.ikameglobal.com/api/v1
VITE_USE_MOCK=false
```

## 2. Authentication
The frontend uses standard JWT tokens.
Wait for `apiClient.ts` interceptors to catch 401s and refresh. You only need to provide the authentication headers for all endpoints described in `api-contracts.md`.
Header: `Authorization: Bearer <Token>`

## 3. Removing Fake Delays
The UI provides graceful `.tsx` Loading Skeletons via React Query. The frontend currently mocks network delays via `const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));`.
When `VITE_USE_MOCK=false`, the Axios client makes real HTTP requests directly without artificial waits.

## 4. File Upload Methodology
The `POST /referrals/upload-cv` endpoint should return an S3 signed URL alongside the final CDN CV URL.
The frontend uses `PUT` directly to the `uploadUrl` so the backend does not process the binary data. The backend only records the URL upon `POST /referrals`.
