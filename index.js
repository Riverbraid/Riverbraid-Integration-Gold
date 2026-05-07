export const PETAL = "Integration-Gold";
export const INVARIANT = "INTEGRATION_COHERENCE";

export function verify(input) {
  if (!input || !Array.isArray(input.petals)) {
    return {
      pass: false,
      coherence: false,
      signal: "integration:INVALID_INPUT",
      reason: "input.petals must be an array"
    };
  }

  const validIds = input.petals.every(p =>
    p &&
    typeof p.id === "string" &&
    p.id.length > 0
  );

  const allActive = input.petals.every(p =>
    p &&
    p.status === "active"
  );

  const coherence = validIds && allActive;

  return {
    pass: true,
    coherence,
    signal: coherence ? "integration:COHERENT" : "integration:INCOHERENT",
    reason: coherence
      ? `Verified ${input.petals.length} petals with valid ids and active status`
      : "One or more petals failed id or active status requirements"
  };
}
