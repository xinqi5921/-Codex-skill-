// Meta-Agent Router - Task to Skill Mapping

export const DOMAIN_MAP = {
  code: {
    keywords: ["编码","debug","重构","代码审查","性能优化","refactor","commit","merge"],
    skills: ["karpathy-guidelines","code-analysis","review-agent"],
    priority: 1
  },
  security: {
    keywords: ["SRC","漏洞","渗透","nmap","sqlmap","WAF","绕过","pentest","bug bounty","扫描","scan","exploit"],
    skills: ["src-hunter","pentest-tools"],
    priority: 2
  },
  document: {
    keywords: ["DOCX","Word","Google Docs","合同","公文","文档","report"],
    skills: ["documents"],
    priority: 3
  },
  pdf: {
    keywords: ["PDF","表单","pdf","acroform"],
    skills: ["pdf"],
    priority: 4
  },
  presentation: {
    keywords: ["PPT","演示文稿","幻灯片","Google Slides","slide"],
    skills: ["presentations"],
    priority: 5
  },
  spreadsheet: {
    keywords: ["Excel","CSV","Sheets","表格","spreadsheet"],
    skills: ["spreadsheets"],
    priority: 6
  },
  image: {
    keywords: ["图片","图像","AI绘图","生成图片","image","photo"],
    skills: ["imagegen"],
    priority: 7
  },
  visualize: {
    keywords: ["可视化","图表","模拟器","chart","graph"],
    skills: ["visualize"],
    priority: 8
  },
  browser: {
    keywords: ["浏览器","截图","自动化","Chrome","browser"],
    skills: ["browser","chrome"],
    priority: 9
  },
  desktop: {
    keywords: ["桌面","GUI","桌面应用","computer-use"],
    skills: ["computer-use"],
    priority: 10
  },
  text: {
    keywords: ["润色","去AI味","AI味","humanize","润色"],
    skills: ["ai-flavor-remover","humanizer-zh"],
    priority: 11
  },
  skill: {
    keywords: ["skill","插件","plugin","创建skill","安装skill"],
    skills: ["skill-creator","skill-installer","plugin-creator"],
    priority: 12
  },
  system: {
    keywords: ["插件修复","repair","修复","update"],
    skills: ["codex-plugin-repair-windows-skill"],
    priority: 13
  },
  knowledge: {
    keywords: ["OpenAI","Codex文档","API","pricing"],
    skills: ["openai-docs"],
    priority: 14
  }
};

export function detectDomain(input) {
  const text = input.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;
  for (const [domain, config] of Object.entries(DOMAIN_MAP)) {
    let score = 0;
    for (const keyword of config.keywords) {
      if (text.includes(keyword.toLowerCase())) score += keyword.length;
    }
    if (score > bestScore) { bestScore = score; bestMatch = domain; }
  }
  return bestMatch;
}

export function getTargetSkill(input) {
  const domain = detectDomain(input);
  if (!domain) return null;
  return DOMAIN_MAP[domain].skills[0];
}