export type Company = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  stage: string;
  location: string;
  founded: number;
  employees: string;
  funding: string;
  website: string;
  description: string;
  score: number;
  scoreBreakdown: {
    market: number;
    team: number;
    traction: number;
    product: number;
    financials: number;
  };
  tags: string[];
  highlights: string[];
  risks: string[];
};

export type SavedList = {
  id: string;
  name: string;
  companies: { companyId: string; notes: string; savedAt: string }[];
};

export type SavedSearch = {
  id: string;
  name: string;
  query: string;
  filters: SearchFilters;
  createdAt: string;
};

export type SearchFilters = {
  industry: string;
  stage: string;
  location: string;
  minScore: number;
};

export const INDUSTRIES = [
  "All Industries", "AI / Machine Learning", "FinTech", "HealthTech", "SaaS", "E-Commerce",
  "CleanTech", "EdTech", "Cybersecurity", "Biotech", "Web3 / Blockchain"
];

export const STAGES = [
  "All Stages", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Growth"
];

export const LOCATIONS = [
  "All Locations", "San Francisco, CA", "New York, NY", "Austin, TX",
  "London, UK", "Berlin, DE", "Singapore", "Tel Aviv, IL", "Toronto, CA"
];

export const MOCK_COMPANIES: Company[] = [
  {
    id: "1",
    name: "NeuralFlow AI",
    logo: "NF",
    industry: "AI / Machine Learning",
    stage: "Series A",
    location: "San Francisco, CA",
    founded: 2022,
    employees: "25-50",
    funding: "$12M",
    website: "neuralflow.ai",
    description: "NeuralFlow builds enterprise-grade AI infrastructure for automating complex document workflows. Their proprietary models achieve 95% accuracy on multi-modal extraction tasks.",
    score: 87,
    scoreBreakdown: { market: 90, team: 85, traction: 82, product: 92, financials: 86 },
    tags: ["AI Infrastructure", "Enterprise", "Document AI"],
    highlights: ["Strong founding team from Google & Meta", "$2M ARR growing 30% MoM", "3 Fortune 500 pilots"],
    risks: ["Competitive market", "High burn rate relative to revenue"],
  },
  {
    id: "2",
    name: "GreenVault",
    logo: "GV",
    industry: "CleanTech",
    stage: "Seed",
    location: "Austin, TX",
    founded: 2023,
    employees: "10-25",
    funding: "$4.5M",
    website: "greenvault.io",
    description: "GreenVault provides carbon credit management and trading platform for mid-market companies, making sustainability compliance accessible and automated.",
    score: 74,
    scoreBreakdown: { market: 88, team: 72, traction: 60, product: 78, financials: 72 },
    tags: ["Carbon Credits", "Sustainability", "B2B Platform"],
    highlights: ["Massive TAM in carbon markets", "Strong regulatory tailwinds", "First-mover in mid-market segment"],
    risks: ["Early stage traction", "Regulatory uncertainty", "Team needs senior hires"],
  },
  {
    id: "3",
    name: "PayGrid",
    logo: "PG",
    industry: "FinTech",
    stage: "Series B",
    location: "New York, NY",
    founded: 2020,
    employees: "100-200",
    funding: "$45M",
    website: "paygrid.com",
    description: "PayGrid is modernizing B2B payments with embedded payment infrastructure that reduces reconciliation time by 90%. Serving 500+ enterprise clients.",
    score: 91,
    scoreBreakdown: { market: 94, team: 90, traction: 95, product: 88, financials: 88 },
    tags: ["Payments", "B2B", "Infrastructure"],
    highlights: ["$8M ARR, 3x YoY growth", "Net revenue retention >130%", "Ex-Stripe leadership team"],
    risks: ["High competition from incumbents", "Enterprise sales cycles"],
  },
  {
    id: "4",
    name: "MediSync",
    logo: "MS",
    industry: "HealthTech",
    stage: "Series A",
    location: "London, UK",
    founded: 2021,
    employees: "50-100",
    funding: "$18M",
    website: "medisync.health",
    description: "MediSync uses AI to streamline clinical trial matching and patient recruitment, reducing trial enrollment time by 60%.",
    score: 82,
    scoreBreakdown: { market: 85, team: 88, traction: 75, product: 84, financials: 78 },
    tags: ["Clinical Trials", "Healthcare AI", "Patient Matching"],
    highlights: ["Partnership with NHS", "12 active pharma contracts", "FDA-cleared platform"],
    risks: ["Long sales cycles in healthcare", "Regulatory complexity"],
  },
  {
    id: "5",
    name: "ShieldNet",
    logo: "SN",
    industry: "Cybersecurity",
    stage: "Seed",
    location: "Tel Aviv, IL",
    founded: 2023,
    employees: "10-25",
    funding: "$6M",
    website: "shieldnet.security",
    description: "ShieldNet provides autonomous threat detection and response for cloud-native applications using behavioral AI models.",
    score: 78,
    scoreBreakdown: { market: 92, team: 82, traction: 58, product: 85, financials: 73 },
    tags: ["Cloud Security", "Threat Detection", "AI Security"],
    highlights: ["Founding team from Unit 8200", "Patent-pending detection algorithm", "10 design partners"],
    risks: ["Crowded cybersecurity market", "Early revenue", "Go-to-market strategy unproven"],
  },
  {
    id: "6",
    name: "EduPath",
    logo: "EP",
    industry: "EdTech",
    stage: "Pre-Seed",
    location: "Berlin, DE",
    founded: 2024,
    employees: "5-10",
    funding: "$1.2M",
    website: "edupath.learn",
    description: "EduPath delivers personalized learning paths using adaptive AI for corporate upskilling programs.",
    score: 62,
    scoreBreakdown: { market: 75, team: 68, traction: 40, product: 70, financials: 57 },
    tags: ["Corporate Learning", "Adaptive AI", "Upskilling"],
    highlights: ["Novel adaptive algorithm", "Growing corporate training market", "Strong initial user engagement"],
    risks: ["Very early stage", "No revenue yet", "Needs product-market fit validation"],
  },
  {
    id: "7",
    name: "ChainBridge",
    logo: "CB",
    industry: "Web3 / Blockchain",
    stage: "Series A",
    location: "Singapore",
    founded: 2022,
    employees: "25-50",
    funding: "$15M",
    website: "chainbridge.xyz",
    description: "ChainBridge provides cross-chain infrastructure for institutional DeFi, enabling compliant access to decentralized financial products.",
    score: 70,
    scoreBreakdown: { market: 72, team: 78, traction: 65, product: 74, financials: 61 },
    tags: ["DeFi", "Cross-Chain", "Institutional"],
    highlights: ["Partnerships with 3 major banks", "Unique regulatory-first approach", "Growing TVL"],
    risks: ["Crypto market volatility", "Regulatory headwinds", "Competition from TradFi"],
  },
  {
    id: "8",
    name: "DataForge",
    logo: "DF",
    industry: "SaaS",
    stage: "Series C+",
    location: "San Francisco, CA",
    founded: 2019,
    employees: "200-500",
    funding: "$120M",
    website: "dataforge.dev",
    description: "DataForge is a data observability platform that helps engineering teams detect, resolve, and prevent data quality issues across their pipelines.",
    score: 94,
    scoreBreakdown: { market: 95, team: 93, traction: 96, product: 92, financials: 94 },
    tags: ["Data Observability", "DevTools", "Enterprise"],
    highlights: ["$25M ARR", "200+ enterprise customers", "Category leader in data observability"],
    risks: ["Market saturation risk", "Expansion into adjacent markets needed"],
  },
];
