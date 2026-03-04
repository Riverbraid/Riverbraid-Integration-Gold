/**
 * Riverbraid-Integration-Gold: index.js
 * Cross-Petal Coordination and Sequencing (v1.3.0)
 */

export const RB_PETAL_ID = 'Riverbraid-Integration-Gold';

export function runSequence(input, steps) {
  if (!Array.isArray(steps) || steps.length === 0) {
    throw new TypeError('INTEGRATION_ERROR: steps must be a non-empty array');
  }
  const trace = [];
  let current = input;
  for (const step of steps) {
    if (typeof step.fn !== 'function') {
      throw new TypeError(`INTEGRATION_ERROR: step '${step.name ?? 'unnamed'}' has no fn`);
    }
    try {
      current = step.fn(current);
      trace.push(`PASS: ${step.name ?? 'unnamed'}`);
    } catch (err) {
      trace.push(`FAIL: ${step.name ?? 'unnamed'}: ${err.message}`);
      return { success: false, output: null, trace };
    }
  }
  return { success: true, output: current, trace };
}

export function checkPetalStatus(petals) {
  const results = petals.map(petal => {
    try {
      const s = petal.getStatus();
      return { name: petal.name, status: s.status, ok: s.status === 'STATIONARY' };
    } catch (err) {
      return { name: petal.name, status: 'ERROR', ok: false, reason: err.message };
    }
  });
  return { allStationary: results.every(r => r.ok), results };
}

export function getStatus() {
  return { status: 'STATIONARY', petal: RB_PETAL_ID };
}
