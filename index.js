export const RB_PETAL_ID = 'Riverbraid-Temporal-Gold';
export function validateSequence(steps) {
  for (let i = 1; i < steps.length; i++) {
    if (steps[i].index <= steps[i-1].index) return { valid: false, reason: 'OUT_OF_ORDER' };
  }
  return { valid: true };
}
export function getStatus() { return { status: 'STATIONARY', petal: RB_PETAL_ID }; }
