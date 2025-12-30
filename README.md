# MVP Codebase

A clean, modern, production-oriented MVP environment built with Next.js, TypeScript, and React.

## Tech Stack

- Node.js (LTS)
- TypeScript (strict mode)
- React
- Next.js (App Router)
- npm

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This starts the development server at [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

### Backup

```bash
npm run backup
```

This script:
1. Runs repomix to bundle the entire codebase
2. Commits the repomix output
3. Pushes to the connected GitHub repository

## Project Structure

- `app/` - UI components and routes (Next.js App Router)
- `core/` - Domain models, types, and business logic
- `infra/` - Backend integration, auth, and external services
- `lib/` - Shared utilities and helpers
- `scripts/` - Build and utility scripts
- `public/` - Static assets

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values. Never commit `.env.local` or any files containing secrets.

## TypeScript

The project uses TypeScript in strict mode with absolute imports:
- `@/app` - App directory
- `@/core` - Core business logic
- `@/infra` - Infrastructure code
- `@/lib` - Shared utilities
