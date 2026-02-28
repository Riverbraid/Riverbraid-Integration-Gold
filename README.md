# Riverbraid-Integration-Gold

**Signal:** `SEMANTIC_BRIDGE`
**Cluster:** [Riverbraid Gold v1.1](https://github.com/Riverbraid/Riverbraid-Golds)
**Language:** Python ≥ 3.10
**Status:** Active — Stationary

-----

## What It Is

Riverbraid-Integration-Gold is the **mode enactment petal** of the Riverbraid Gold Cluster. It receives the capacity mode determined by Riverbraid-Core (`rest`, `soften`, or `engage`) and translates it into a recorded system-level transition.

This is the only place in the cluster where a Core mode decision becomes an action. It is the semantic bridge between what the system knows and what the system does.

-----

## What It Is Not

- Not a policy engine — it does not decide what mode to enter
- Not an intelligence layer — it enacts decisions made elsewhere
- Not responsible for computing input metrics — those belong to the wrapper
- Not adaptive — transitions are recorded, not learned from

-----

## How It Works

`enact()` receives a validated mode string, loads the current integration state, records the transition (previous mode, new mode, transition count), and persists the updated state. It returns a structured enactment record.

`current_mode()` returns the last enacted mode without modifying state.

Valid modes: `rest`, `soften`, `engage`. Any other value raises `IntegrationError`.

-----

## Usage

```python
from integration import enact, current_mode

# Enact a mode returned by Riverbraid-Core
result = enact("soften")
# result["enacted_mode"] → "soften"
# result["previous_mode"] → "engage" (or None on first run)
# result["transition_count"] → int
# result["signal"] → "SEMANTIC_BRIDGE"

# Check the current mode without modifying state
mode = current_mode()  # → "soften"
```

**Full pipeline example:**

```python
from riverbraid.core.metrics import compute_metrics
from integration import enact

metrics = compute_metrics({
    "coherence": 0.5,
    "novelty": 0.6,
    "fragility": 0.4,
    "latency": 0.3,
})

enact(metrics["mode"])
```

**Verify from the command line:**

```bash
python verify.py
# Output: [Signal: SEMANTIC_BRIDGE | Braid: CLOSED-LOOP]
```

-----

## Files

|File               |Purpose                                       |
|-------------------|----------------------------------------------|
|`integration.py`   |Mode enactment and state transition logic     |
|`__init__.py`      |Public API surface                            |
|`verify.py`        |Fail-closed verification entry point          |
|`integration.state`|Persisted transition state (data, not code)   |
|`protocol.steps`   |Canonical protocol definition (data, not code)|

-----

## Design Properties

- **Single responsibility** — enacts modes, nothing else
- **Auditable** — every transition is recorded with previous mode and count
- **Fail-closed on invalid input** — unrecognized modes raise immediately
- **Stateful by design** — transition history is the point; state is not hidden
- **Standard library only** — no dependencies

-----

## Part of the Riverbraid Gold Cluster

|Petal                                                                             |Signal                   |Purpose                      |
|----------------------------------------------------------------------------------|-------------------------|-----------------------------|
|[Riverbraid-Golds](https://github.com/Riverbraid/Riverbraid-Golds)                |—                        |Cluster manifest and pipeline|
|[Riverbraid-Core](https://github.com/Riverbraid/Riverbraid-Core)                  |Root                     |Capacity control substrate   |
|[Riverbraid-Crypto-Gold](https://github.com/Riverbraid/Riverbraid-Crypto-Gold)    |`MECHANICAL_HONESTY`     |SHA-256 state anchoring      |
|[Riverbraid-Judicial-Gold](https://github.com/Riverbraid/Riverbraid-Judicial-Gold)|`LEAST_ENTROPY`          |Predicate governance         |
|[Riverbraid-Refusal-Gold](https://github.com/Riverbraid/Riverbraid-Refusal-Gold)  |`BOUNDARY_LOGIC`         |Boundary enforcement         |
|[Riverbraid-Memory-Gold](https://github.com/Riverbraid/Riverbraid-Memory-Gold)    |`MEANING_CENTRIC`        |Meaning-centric persistence  |
|[Riverbraid-Harness-Gold](https://github.com/Riverbraid/Riverbraid-Harness-Gold)  |`STATIONARY_STATE_ACTIVE`|Cluster verification harness |

-----

## License

See `LICENSE`.
