import { SYSTEM_STATE } from './state.js';
if (SYSTEM_STATE === "INTEGRATION_REST") {
    console.log("✅ Integration-Gold Invariant Verified: System is in Rest.");
} else {
    process.exit(1);
}
