# Dominat8.io — Full Automation (Walk Away)

## What this repo now does
- Any push to main triggers: install -> build -> deploy to Vercel production
- Post-deploy probe: GET /api/__probe__

## One-time GitHub Secrets to set
Repo -> Settings -> Secrets and variables -> Actions

Required:
- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID

Recommended:
- PROD_BASE_URL   (example: https://www.dominat8.io)

## Get ORG_ID + PROJECT_ID (PowerShell)
From repo root:
1) vercel login
2) vercel link
Then open: .vercel\\project.json and copy orgId + projectId into GitHub Secrets.

## Local manual deploy button
powershell -NoProfile -ExecutionPolicy Bypass -File .\\RUN_AUTOMATION.ps1