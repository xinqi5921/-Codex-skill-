# Meta-Agent Plugin

Universal task orchestration plugin for Codex CLI. Routes tasks to the appropriate specialized skills, performs safety risk assessment, tracks progress, and validates output quality.

## Features

- **Intent Routing**: 14+ task domain detection and skill mapping
- **Safety Gate**: RED/YELLOW/GREEN/WHITE 4-level risk assessment
- **Workflow Execution**: 5-phase template (intent -> precheck -> execute -> verify -> deliver)
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

# Check risk
node src/index.js --risk "扫描 target.com"
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
├── docs/
├── scripts/
├── assets/
├── package.json
└── README.md
```

## License

MIT