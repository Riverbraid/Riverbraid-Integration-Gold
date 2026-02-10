import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
    const readme = readFileSync(join(__dirname, 'README.md'), 'utf8');
    // The Integration Signal requires the presence of the Semantic Bridge anchor
    if (!readme.includes('[Signal: SEMANTIC_BRIDGE]')) {
        throw new Error("Integration Signal Missing: The Bridge is broken.");
    }
    
    const protocol = readFileSync(join(__dirname, 'protocol.steps'), 'utf8');
    if (protocol.includes('Standard Helpful Assistant')) {
        throw new Error("Frequency Distortion Detected: Generic AI patterns found.");
    }

    console.log("🌉 Integration-Gold: Semantic Bridge Verified.");
    process.exit(0);
} catch (e) {
    console.error(`❌ Integration-Gold: Audit Failed - ${e.message}`);
    process.exit(1);
}
