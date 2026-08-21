# Meta-Agent Plugin

<div align="center">

[![GitHub Stars](https://img.shields.io/github/stars/xinqi5921/-Codex-skill-?style=social)](https://github.com/xinqi5921/-Codex-skill-/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![Tests](https://img.shields.io/badge/tests-19_passing-brightgreen.svg)](./tests/test.js)

<p><strong>Universal task orchestrator for Codex CLI</strong><br>
路由 14+ 任务域 · 四级风险门控 · 五阶段工作流 · 跨域质量校验</p>

[📦 安装](#-安装) · [🚀 快速开始](#-快速开始) · [🗺️ 路由映射](#-路由映射) · [💖 支持项目](#-支持项目)

</div>

---

## 💖 支持项目

这个项目持续维护需要时间和精力，你的支持是最大动力。

| 方式 | 说明 | 链接 |
|---|---|---|
| ☕ **Buy Me a Coffee** | 一次性打赏，请作者喝咖啡 | [支持我](https://buymeacoffee.com/xinqi5921) |
| 🍞 **爱发电** | 国内用户首选，月付订阅 | [爱发电主页](https://afdian.net/@xinqi5921) |
| ⭐ **GitHub Stars** | 免费支持，让更多人看到 | [Star 仓库](https://github.com/xinqi5921/-Codex-skill-/stargazers) |
| 🐛 **报告问题** | 帮助改进，间接支持 | [Issues](https://github.com/xinqi5921/-Codex-skill-/issues) |
| 📖 **分享推荐** | 推荐给需要的开发者 | [Twitter / 微博](https://twitter.com/xinqi5921) |

> 打赏不是必须的，Star 和 Fork 也是很大的支持 ❤️

---

## 📦 安装

```bash
# 克隆仓库
git clone https://github.com/xinqi5921/-Codex-skill-.git
cd -Codex-skill-

# 安装依赖
npm install

# 运行测试（19 个全部通过）
npm test
```

---

## 🚀 快速开始

### 命令行使用

```bash
# 路由任务到对应 skill
node src/index.js "帮我重构这个模块"
node src/index.js "帮我对 target.com 做 SRC 漏洞挖掘"
node src/index.js "生成项目启动报告"
node src/index.js "润色这篇 AI 文章"

# Debug 模式，查看完整日志
node src/index.js --debug "扫描 example.com"
```

### 代码调用

```javascript
import { createAgent, detectDomain, getTargetSkill, assessRisk } from './src/index.js';

// 创建 agent
const agent = createAgent({ debug: true });

// 路由任务
const result = await agent.execute("帮我重构代码");
console.log(result.domain);   // "code"
console.log(result.skill);    // "karpathy-guidelines"

// 风险评估
const risk = await agent.assessRisk("npm install", "更新依赖");
console.log(risk.level);      // "GREEN"
```

---

## 🗺️ 路由映射

| 任务域 | 关键词 | 目标 Skill |
|---|---|---|
| **代码开发** | 编码, debug, 重构, 审查, 性能优化 | `karpathy-guidelines` |
| **安全测试** | SRC, 漏洞, 渗透, nmap, sqlmap, WAF | `src-hunter` |
| **文档生成** | DOCX, Word, Google Docs, 合同 | `documents` |
| **PDF 处理** | PDF, 表单, acroform | `pdf` |
| **演示制作** | PPT, 演示文稿, Google Slides | `presentations` |
| **表格处理** | Excel, CSV, Sheets | `spreadsheets` |
| **图像生成** | 图片, AI 绘图, 生成图片 | `imagegen` |
| **数据可视化** | 可视化, 图表, 模拟器 | `visualize` |
| **浏览器自动化** | 浏览器, 截图, Chrome | `browser` |
| **桌面自动化** | 桌面, GUI | `computer-use` |
| **文本润色** | 润色, 去 AI 味, humanize | `ai-flavor-remover` |
| **技能管理** | skill, 插件, plugin | `skill-creator` |
| **系统维护** | 插件修复, repair | `codex-plugin-repair-windows-skill` |
| **知识查询** | OpenAI, Codex 文档 | `openai-docs` |

---

## 🔒 四级风险门控

| 等级 | 判定 | 处理 |
|---|---|---|
| 🔴 **RED** | 网络攻击 / 密码破解 / 系统修改 | 必须用户显式确认 |
| 🟡 **YELLOW** | 文件写入 / API 调用 / 数据处理 | 提示风险后执行 |
| 🟢 **GREEN** | 只读查询 / 文本生成 / 可视化 | 直接执行 |
| ⚪ **WHITE** | 纯知识问答 / 文件读取 | 直接执行 |

---

## 📂 项目结构

```
-Codex-skill-/
├── .github/
│   └── FUNDING.yml          # 打赏配置
├── src/
│   ├── index.js             # 主入口
│   ├── routing.js           # 14 域路由映射
│   ├── safety.js            # 四级风险判定
│   └── orchestrator.js      # 五阶段编排引擎
├── tests/
│   └── test.js              # 19 个测试用例
├── docs/                    # 文档目录
├── scripts/                 # 辅助脚本
├── assets/                  # 静态资源
├── package.json
└── README.md
```

---

## 🧪 测试

```bash
npm test
```

```
=== Meta-Agent Plugin Tests ===

--- Routing ---
  PASS: code domain detected
  PASS: security domain detected
  PASS: presentation domain detected
  PASS: text domain detected
  PASS: unknown returns null
  PASS: code skill routed
  PASS: security skill routed

--- Safety ---
  PASS: rm -rf is RED risk
  PASS: RED requires confirmation
  PASS: npm install is YELLOW risk
  PASS: read is GREEN risk
  PASS: unknown task is WHITE risk
  PASS: risk report contains RED

--- Orchestrator ---
  PASS: createAgent returns MetaAgent instance
  PASS: orchestrator routes to code domain
  PASS: orchestrator selects correct skill
  PASS: orchestrator logs execution
  PASS: report status is completed
  PASS: report has 5 phases

=== Results ===
Passed: 19, Failed: 0
```

---

## 📄 License

[MIT License](./LICENSE)

---

Made with ❤️ by [xinqi5921](https://github.com/xinqi5921)