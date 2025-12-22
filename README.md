# Alino Monorepo

This is the production-ready monorepo for the Alino SaaS platform.

## Architecture

- **apps/web**: React application (Vite + TypeScript)
- **apps/api**: Node.js API server (Express + TypeScript)
- **packages/shared**: Shared TypeScript types and utilities
- **scripts**: Automation scripts (backup, context generation)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   - Copy `.env.example` to `.env` in `apps/api` and `apps/web`.
   - Fill in your Supabase credentials.

3. **Development**
   Run both frontend and backend concurrently:
   ```bash
   npm run dev
   ```

## Workflows

### 📦 Backup Code
Automatically add, commit, and push changes to GitHub.
```bash
npm run backup
```
*Note: Requires `gh` CLI or Git configured with remote origin.*

### 🧠 Generate Context (Repomox)
Aggregates all source code into a single markdown file (`repomix.md`) for LLM context instructions.
```bash
npm run repomox
```

## Commands

- `npm run build`: Build all workspaces
- `npm run lint`: Lint all workspaces
- `npm run test`: Run tests (placeholder)
