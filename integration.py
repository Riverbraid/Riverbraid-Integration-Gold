from pathlib import Path
import json

INVARIANT_SIGNAL = "SEMANTIC_BRIDGE"
VALID_MODES = {"rest", "soften", "engage"}

def load_state(state_path: str | None = None) -> dict:
    path = Path(state_path) if state_path else Path(__file__).parent / "integration.state"
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else {"current_mode": None, "transition_count": 0}

def enact(mode: str, state_path: str | None = None) -> dict:
    if mode not in VALID_MODES: raise ValueError("Invalid mode")
    state = load_state(state_path)
    state["current_mode"] = mode
    state["transition_count"] = state.get("transition_count", 0) + 1
    path = Path(state_path) if state_path else Path(__file__).parent / "integration.state"
    path.write_text(json.dumps(state, indent=2, sort_keys=True), encoding="utf-8")
    return {"enacted_mode": mode, "transition_count": state["transition_count"], "signal": INVARIANT_SIGNAL}
