# Meta-Agent Plugin

<div align="center">

[![GitHub Stars](https://img.shields.io/github/stars/xinqi5921/-Codex-skill-?style=social)](https://github.com/xinqi5921/-Codex-skill-/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<p>Universal task orchestrator for Codex CLI. Route tasks to 14+ specialized skills with built-in safety gates.</p>

</div>

---

## 打赏支持

如果你喜欢这个项目，欢迎请我喝杯咖啡！

| ☕ Buy Me a Coffee | 🍞 爱发电 |
|---|---|
| [bmc.link/xinqi5921](https://buymeacoffee.com/xinqi5921) | [afdian.net/@xinqi5921](https://afdian.net/@xinqi5921) |

> ⭐ Star 和 Fork 就是最大的支持 ❤️

---

## Features

- **Intent Routing**: 14+ task domain detection and skill mapping
- **Safety Gate**: RED/YELLOW/GREEN/WHITE 4-level risk assessment
- **Workflow Execution**: 5-phase template (intent → precheck → execute → verify → deliver)
- **Quality Validation**: Cross-domain unified delivery standards

## Installation

```bash
npm install
```

## Usage

```bash
# Route a task
node src/index.js "帮我重构这个模块，提取为插件"

# Debug mode
node src/index.js --debug "生成项目启动报告"
```

## Domain Map

| Domain | Keywords | Target Skill |
|---|---|---|
| code | 编码, debug, 重构, 审查 | karpathy-guidelines |
| security | SRC, 漏洞, 渗透, nmap | src-hunter |
| document | DOCX, Word, 合同 | documents |
| pdf | PDF, 表单 | pdf |
| presentation | PPT, 演示文稿 | presentations |
| spreadsheet | Excel, CSV, Sheets | spreadsheets |
| image | 图片, AI绘图 | imagegen |
| visualize | 可视化, 图表 | visualize |
| browser | 浏览器, 截图 | browser |
| desktop | 桌面, GUI | computer-use |
| text | 润色, 去AI味 | ai-flavor-remover |
| skill | skill, 插件 | skill-creator |
| system | 修复, repair | codex-plugin-repair-windows-skill |
| knowledge | OpenAI, Codex文档 | openai-docs |

## Project Structure

```
meta-agent-plugin/
├── src/
│   ├── index.js        # Main entry point
│   ├── routing.js      # Task domain detection
│   ├── safety.js       # Risk assessment
│   └── orchestrator.js # Multi-phase execution
├── tests/
│   └── test.js         # 19 passing tests
├── docs/
├── scripts/
├── assets/
├── .github/
│   └── FUNDING.yml     # Sponsor links
├── package.json
└── README.md
```

## Test

```bash
npm test
# 19 passing, 0 failing
```

## License

MIT