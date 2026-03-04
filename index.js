export const RB_PETAL_ID = 'Riverbraid-Integration-Gold';
export function runSequence(input, steps) {
  if (!Array.isArray(steps) || steps.length === 0) throw new TypeError('INTEGRATION_ERROR: steps must be non-empty');
  const trace = [];
  let current = input;
  for (const step of steps) {
    try { current = step.fn(current); trace.push(`PASS: ${step.name}`); }
    catch (err) { trace.push(`FAIL: ${step.name}: ${err.message}`); return { success: false, output: null, trace }; }
  }
  return { success: true, output: current, trace };
}
export function getStatus() { return { status: 'STATIONARY', petal: RB_PETAL_ID }; }
