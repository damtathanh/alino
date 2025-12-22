import * as fs from 'fs';
import * as path from 'path';

// Config
const OUTPUT_FILE = 'repomix.md';
const MAX_FILE_SIZE = 100 * 1024; // 100KB limit per file
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
        if (path.basename(dir) === 'node_modules') return; // Safety check

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

    // Sort for consistency
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
