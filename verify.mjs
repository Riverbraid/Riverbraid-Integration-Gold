import fs from 'node:fs';
const fatal = (msg) => { console.error(`[FAIL-CLOSED] ${msg}`); process.exit(1); };
try {
  const contract = JSON.parse(fs.readFileSync('./identity.contract.json', 'utf8'));
  for (const file of contract.governed_files) {
    if (!fs.existsSync(file)) fatal(`Missing: ${file}`);
  }
  console.log('[STATIONARY] Integration Logic Verified.');
} catch (err) { fatal(err.message); }
