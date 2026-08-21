// Meta-Agent Plugin Tests
import { detectDomain, getTargetSkill, DOMAIN_MAP } from '../src/routing.js';
import { assessRisk, formatRiskReport } from '../src/safety.js';
import { MetaAgent, createAgent } from '../src/orchestrator.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) { passed++; console.log(`  PASS: ${message}`); }
  else { failed++; console.error(`  FAIL: ${message}`); }
}

console.log('\n=== Meta-Agent Plugin Tests ===\n');

// Routing tests
console.log('--- Routing ---');
assert(detectDomain('帮我重构代码') === 'code', 'code domain detected');
assert(detectDomain('SRC漏洞挖掘') === 'security', 'security domain detected');
assert(detectDomain('生成PPT报告') === 'presentation', 'presentation domain detected');
assert(detectDomain('润色文章') === 'text', 'text domain detected');
assert(detectDomain('今天天气') === null, 'unknown returns null');
assert(getTargetSkill('帮我debug这个模块') === 'karpathy-guidelines', 'code skill routed');
assert(getTargetSkill('扫描target.com') === 'src-hunter', 'security skill routed');

// Safety tests
console.log('\n--- Safety ---');
const red = assessRisk('rm -rf /tmp', 'delete all files');
assert(red.level === 'RED', 'rm -rf is RED risk');
assert(red.action === 'require_confirmation', 'RED requires confirmation');

const yellow = assessRisk('npm install', 'install packages');
assert(yellow.level === 'YELLOW', 'npm install is YELLOW risk');

const green = assessRisk('read file', 'read data');
assert(green.level === 'GREEN', 'read is GREEN risk');

const white = assessRisk('some unknown task', '');
assert(white.level === 'WHITE', 'unknown task is WHITE risk');

assert(formatRiskReport(red).includes('RED'), 'risk report contains RED');

// Orchestrator tests
console.log('\n--- Orchestrator ---');
const agent = createAgent({ debug: false });
assert(agent instanceof MetaAgent, 'createAgent returns MetaAgent instance');

const result = await agent.execute('帮我重构代码');
assert(result.domain === 'code', 'orchestrator routes to code domain');
assert(result.skill === 'karpathy-guidelines', 'orchestrator selects correct skill');

const report = agent.getReport();
assert(report.log.length > 0, 'orchestrator logs execution');
assert(report.status === 'completed', 'report status is completed');
assert(report.phases.length === 5, 'report has 5 phases');

// Summary
console.log('\n=== Results ===');
console.log(`Passed: ${passed}, Failed: ${failed}`);
process.exit(failed > 0 ? 1 : 0);