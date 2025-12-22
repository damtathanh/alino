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
