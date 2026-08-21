// Meta-Agent Plugin - Main Entry Point
import { createAgent } from "./orchestrator.js";
import { getTargetSkill, detectDomain } from "./routing.js";
import { assessRisk, formatRiskReport } from "./safety.js";

const VERSION = "1.0.0";
const NAME = "Meta-Agent";

function help() {
  console.log(`
    ${NAME} v${VERSION} - Universal Task Orchestrator for Codex CLI
    
    Usage:
      node index.js <task-description>
      node index.js --route "some task"
      node index.js --risk "some command"
      node index.js --debug
  `);
}

async function run(args) {
  const action = args[0];
  const task = args.slice(1).join(" ");
  const debug = args.includes("--debug");

  console.log(`
    === ${NAME} v${VERSION} === 
    executing task: ${task}
  `);

  const agent = createAgent({ debug });

  // Routing phase
  const domain = detectDomain(task);
  const skill = getTargetSkill(task);
  console.log(`Domain: ${domain || "unknown"} -> Skill: ${skill || "meta-agent"}`);
  
  // Risk assessment
  const risk = assessRisk(task, "");
  console.log(`Risk Level: ${formatRiskReport(risk)}`);
  
  // Execute
  await agent.execute(task);
  const report = agent.getReport();
  console.log(`Phases completed: ${report.log.length}`);
  console.log(`Status: ${report.status}`);
}

if ("module" in global) {
  module.exports = { MetaAgent: (function(){import("./orchestrator.js").then(m=>m)})() };
} else {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) { help(); }
  else if (args.length === 0) { help(); }
  else { run(args); }
}