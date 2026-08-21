// Meta-Agent Safety Gate - Risk Assessment

const RED_PATTERNS = [
  "rm -rf", "format ", "diskpart clean", "dd if=",
  "sudo rm", "chmod 777", "chattr -i",
  "password", "crack", "brute", "hashcat",
  "msfconsole", "exploit", "reverse_shell"
];

const YELLOW_PATTERNS = [
  "write", "delete", "move", "copy",
  "api", "curl", "wget", "npm install",
  "pip install", "docker", "kubectl"
];

const GREEN_PATTERNS = [
  "list", "read", "query", "search", "analyze",
  "generate", "create", "render", "visualize"
];

export function assessRisk(command, context) {
  const combined = (command + " " + context).toLowerCase();

  for (const pat of RED_PATTERNS) {
    if (combined.includes(pat.toLowerCase())) {
      return { level: "RED", reason: "Red pattern: " + pat, action: "require_confirmation" };
    }
  }

  for (const pat of YELLOW_PATTERNS) {
    if (combined.includes(pat.toLowerCase())) {
      return { level: "YELLOW", reason: "Yellow pattern: " + pat, action: "notify" };
    }
  }

  for (const pat of GREEN_PATTERNS) {
    if (combined.includes(pat.toLowerCase())) {
      return { level: "GREEN", reason: "Read-only operation", action: "proceed" };
    }
  }

  return { level: "WHITE", reason: "No risk patterns detected", action: "proceed" };
}

export function formatRiskReport(risk) {
  const icons = { RED: "[RED]", YELLOW: "[YELLOW]", GREEN: "[GREEN]", WHITE: "[WHITE]" };
  const actions = {
    require_confirmation: " Requires explicit user confirmation",
    notify: " Proceeding with risk notification",
    proceed: " Safe to proceed"
  };
  return icons[risk.level] + " - " + risk.reason + actions[risk.action];
}