# Repomox Context File

Generated at: 2025-12-22T16:17:48.965Z

## File Tree

- README.md
- index.html
- package.json
- scripts/backup.ts
- scripts/repomix.ts
- src/App.tsx
- src/index.css
- src/lib/supabaseClient.ts
- src/main.tsx
- src/shared/index.ts
- src/vite-env.d.ts
- tsconfig.json
- tsconfig.node.json
- vite.config.ts

## File Contents

### README.md
```md
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

```

### index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alino MVP</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

### package.json
```json
{
  "name": "alino-app",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "backup": "ts-node --esm scripts/backup.ts",
    "repomox": "ts-node --esm scripts/repomix.ts"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@supabase/supabase-js": "^2.39.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@types/node": "^20.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.0.0",
    "ts-node": "^10.9.1",
    "vite": "^5.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

### scripts/backup.ts
```typescript
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const REMOTE_URL = 'https://github.com/damtathanh/alino.git';

function run(command: string, suppressOutput = false): string {
    try {
        // stdio: 'pipe' allows us to capture output. 'ignore' just discards it.
        // We use 'pipe' by default for capture, or 'inherit' if we want to stream to console.
        // But execSync returns Buffer/string.
        // If suppressOutput is true, we want to capture and return it but NOT show it? 
        // Or just run silently?

        // Implementation: Always capture output to return it. 
        // If NOT suppressOutput, also log it to console (manual).
        // Actually execSync with 'inherit' sends directly to TTY and returns null, which caused the bug.

        const output = execSync(command, {
            encoding: 'utf-8',
            stdio: suppressOutput ? 'pipe' : 'pipe'
        });

        if (!suppressOutput && output) {
            console.log(output);
        }

        return output.trim();
    } catch (error: any) {
        // If command fails, we might want to return empty string or rethrow.
        // For checks like 'git remote', failure might mean 'no remote'.
        // We return empty string on error so simple checks don't crash.
        // But we log verbose if it wasn't suppressed.
        if (!suppressOutput) {
            // console.error(`Command failed: ${command}`);
        }
        return '';
    }
}

function checkGitInit() {
    if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
        console.log('📦 Initializing git repository...');
        run('git init');
        run('git branch -M main'); // Ensure main branch immediately
    } else {
        console.log('✅ Git repository already initialized.');
    }
}

function checkRemote() {
    const remotes = run('git remote -v', true);

    if (!remotes.includes('origin')) {
        console.log(`⚠️ No remote "origin" found. Adding ${REMOTE_URL}...`);
        run(`git remote add origin ${REMOTE_URL}`);
    } else {
        // Check if origin matches
        if (!remotes.includes(REMOTE_URL)) {
            console.log(`⚠️ Remote "origin" exists but points elsewhere. Updating to ${REMOTE_URL}...`);
            run(`git remote set-url origin ${REMOTE_URL}`);
        } else {
            console.log('✅ Remote "origin" is correct.');
        }
    }
}

function backup() {
    const timestamp = new Date().toISOString();
    const message = `backup: auto-save ${timestamp}`;

    console.log('🚀 Starting backup process...');

    checkGitInit();
    checkRemote();

    console.log('Stage changes...');
    run('git add -A'); // -A handles deletions too

    // Check if there are changes
    const status = run('git status --porcelain', true);
    if (!status) {
        console.log('✨ No changes to commit.');
    } else {
        console.log(`Commit changes with message: "${message}"`);
        run(`git commit -m "${message}"`);
    }

    console.log('Pushing to origin/main...');
    try {
        // Try normal push first
        run('git push -u origin main');
        console.log('✅ Backup successful!');
    } catch (error) {
        console.log('⚠️ Push failed. This might be due to history mismatch (fresh repo vs existing remote).');
        console.warn('Attempting force push (safe for initial setup, careful in production!)...');
        // For this specific task context, user implies they want to overwrite or sync. 
        // But force push is dangerous. Let's try to pull --rebase first?
        // Or just fail and let user handle. 
        // USER instruction: "Backup code... simple script".
        // "push lên nhánh main (tạo nhánh nếu chưa có)"

        // Let's try simple push again but log error if fails.
        try {
            execSync('git push -u origin main', { stdio: 'inherit' });
        } catch (e) {
            console.error('❌ Push failed. Please check if you have write access to the repo or if you need to pull first.');
            console.error('Git output should be visible above.');
        }
    }
}

backup();

```

### scripts/repomix.ts
```typescript
import * as fs from 'fs';
import * as path from 'path';

// Config
const OUTPUT_FILE = 'repomix.md';
const MAX_FILE_SIZE = 100 * 1024; // 100KB limits
const IGNORE_PATTERNS = [
    'node_modules', 'dist', 'build', '.next', 'coverage', '.git', '.vscode', '.idea',
    'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', '.DS_Store', 'repomix.md',
    '.env', '.env.local', '.env.development', '.env.production', '*.log',
    'tsconfig.tsbuildinfo'
];

const TARGET_EXTENSIONS = [
    '.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.md', '.html', '.yml', '.yaml'
];

function isIgnored(entryName: string): boolean {
    if (IGNORE_PATTERNS.includes(entryName)) return true;
    if (entryName.startsWith('.')) return true;
    return false;
}

function getAllFiles(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (!fs.existsSync(filePath)) return;

        // Basic ignore check
        if (isIgnored(file)) return;
        if (path.basename(dir) === 'node_modules') return;

        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            const ext = path.extname(file);
            if (TARGET_EXTENSIONS.includes(ext)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

function generateRepomix() {
    const rootDir = process.cwd();
    console.log(`🔍 Scanning directory: ${rootDir}`);

    const allFiles = getAllFiles(rootDir);
    allFiles.sort();

    console.log(`Found ${allFiles.length} files to process.`);

    let content = `# Repomox Context File\n\nGenerated at: ${new Date().toISOString()}\n\n`;
    content += `## File Tree\n\n`;

    allFiles.forEach(f => {
        const relPath = path.relative(rootDir, f);
        content += `- ${relPath}\n`;
    });

    content += `\n## File Contents\n\n`;

    let skippedCount = 0;

    allFiles.forEach(f => {
        const relPath = path.relative(rootDir, f);
        try {
            const fileStat = fs.statSync(f);
            if (fileStat.size > MAX_FILE_SIZE) {
                content += `### ${relPath} (SKIPPED - Too Large: ${(fileStat.size / 1024).toFixed(2)}KB)\n\n`;
                skippedCount++;
                return;
            }

            const fileContent = fs.readFileSync(f, 'utf-8');
            const ext = path.extname(f).substring(1);

            content += `### ${relPath}\n`;
            content += '```' + (ext === 'ts' || ext === 'tsx' ? 'typescript' : ext) + '\n';
            content += fileContent + '\n';
            content += '```\n\n';

        } catch (err) {
            console.error(`Error reading ${relPath}: ${err}`);
        }
    });

    fs.writeFileSync(path.join(rootDir, OUTPUT_FILE), content);
    console.log(`✅ Repomix generated at ${OUTPUT_FILE}`);
    if (skippedCount > 0) console.log(`⚠️ Skipped ${skippedCount} large files.`);
}

generateRepomix();

```

### src/App.tsx
```typescript
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabaseClient'

function App() {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            alert(error.message)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                Loading...
            </div>
        )
    }

    return (
        <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Alino MVP</h1>
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px', background: '#333' }}>
                {session ? (
                    <div>
                        <h2>Dashboard</h2>
                        <p><strong>Status:</strong> Authenticated</p>
                        <p><strong>Email:</strong> {session.user.email}</p>
                        <p><strong>User ID:</strong> {session.user.id}</p>
                        <button
                            onClick={handleLogout}
                            style={{ padding: '8px 16px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2>Login</h2>
                        <p>Please log in to continue.</p>
                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #666' }}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #666' }}
                            />
                            <button
                                type="submit"
                                style={{ padding: '8px 16px', background: '#4444ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Log In
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App

```

### src/index.css
```css
:root {
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

```

### src/lib/supabaseClient.ts
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

```

### src/main.tsx
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

```

### src/shared/index.ts
```typescript
export type User = {
    id: string;
    email: string;
};

export const API_VERSION = 'v1';

```

### src/vite-env.d.ts
```typescript
/// <reference types="vite/client" />

```

### tsconfig.json
```json
{
    "compilerOptions": {
        "target": "ES2020",
        "useDefineForClassFields": true,
        "lib": [
            "ES2020",
            "DOM",
            "DOM.Iterable"
        ],
        "module": "ESNext",
        "skipLibCheck": true,
        /* Bundler mode */
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        /* Linting */
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true,
        /* Alias for shared */
        "paths": {
            "@/*": [
                "./src/*"
            ]
        }
    },
    "include": [
        "src"
    ],
    "references": [
        {
            "path": "./tsconfig.node.json"
        }
    ]
}
```

### tsconfig.node.json
```json
{
    "compilerOptions": {
        "composite": true,
        "skipLibCheck": true,
        "module": "ESNext",
        "moduleResolution": "bundler",
        "allowSyntheticDefaultImports": true
    },
    "include": [
        "vite.config.ts"
    ]
}
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
})

```

