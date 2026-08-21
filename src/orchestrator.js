// Meta-Agent Orchestrator - Multi-phase task execution
import { detectDomain, getTargetSkill } from "./routing.js";
import { assessRisk, formatRiskReport } from "./safety.js";

const PHASES = ["intent", "precheck", "execute", "verify", "deliver"];

export class MetaAgent {
  constructor(options = {}) {
    this.debug = options.debug || false;
    this._logEntries = [];
  }

  addLog(msg) {
    const entry = { time: new Date().toISOString(), msg };
    this._logEntries.push(entry);
    if (this.debug) console.log("[meta-agent]", msg);
  }

  async route(input) {
    this.addLog("Routing: " + input.substring(0, 80));
    const domain = detectDomain(input);
    const skill = getTargetSkill(input);
    return { domain, skill, input, timestamp: new Date().toISOString() };
  }

  async assessRisk(command, context) {
    const risk = assessRisk(command, context);
    this.addLog("Risk: " + formatRiskReport(risk));
    return risk;
  }

  async execute(input) {
    const result = await this.route(input);
    this.addLog("Domain: " + result.domain + " -> Skill: " + result.skill);
    return result;
  }

  getReport() {
    return {
      phases: PHASES,
      log: this._logEntries,
      status: this._logEntries.length > 0 ? "completed" : "idle"
    };
  }
}

export function createAgent(options) {
  return new MetaAgent(options);
}

// CLI entry
if (process.argv[1] && process.argv[1].includes("orchestrator")) {
  const input = process.argv.slice(2).join(" ");
  if (!input) {
    console.log("Usage: node orchestrator.js <task-description>");
    process.exit(1);
  }
  const agent = createAgent({ debug: true });
  agent.execute(input).then(r => {
    console.log(JSON.stringify(r, null, 2));
    console.log(JSON.stringify(agent.getReport(), null, 2));
  });
}