import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { createServer as createViteServer } from 'vite';
import { OpenAI } from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Initialize LLM Gateway (OpenAI-compatible)
const getOpenAI = () => {
  const apiKey = process.env.LLM_GATEWAY_KEY;
  const baseURL = process.env.LLM_GATEWAY_URL || 'https://imllm.intermesh.net/v1';
  
  if (!apiKey) {
    throw new Error('LLM_GATEWAY_KEY is missing. Please set it in the environment.');
  }

  return new OpenAI({
    apiKey,
    baseURL,
  });
};

// Helper to read JSON data
async function readData(fileName: string) {
  const filePath = path.join(process.cwd(), 'data', fileName);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return {};
  }
}

// API Routes
app.get('/api/seller/:id', async (req, res) => {
  const gl_user_id = req.params.id;
  
  try {
    const sellers = await readData('paid_seller_details.json');
    const ticketsAgainstData = await readData('tickets_against.json');
    const ticketsByData = await readData('tickets_by.json');
    const mcatData = await readData('updated_mcat_data.json');
    const blniData = await readData('updated_blni_data.json');

    const seller = sellers[gl_user_id];
    
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    const ticketsAgainst = ticketsAgainstData[gl_user_id]?.tickets || [];
    const ticketsBy = ticketsByData[gl_user_id]?.tickets || [];
    
    // Normalize GLID key for data
    const normalizedKey = `GLID: ${gl_user_id}`;
    const mcats = mcatData[normalizedKey] || {};
    const blni = blniData[normalizedKey] || {};

    res.json({
      seller,
      ticketsAgainst,
      ticketsBy,
      mcats: Object.values(mcats),
      blni: Object.values(blni),
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/analyze', async (req, res) => {
  const { seller, ticketsAgainst, ticketsBy, mcats } = req.body;

  if (!seller || !seller.user_metrics) {
    return res.status(400).json({ error: 'Missing seller data' });
  }

  const m = seller.user_metrics;
    const prompt = `
    You are an elite AI-powered Business Intelligence unit for an IndiaMART-style B2B marketplace.
    Analyze this seller's multidimensional dataset and generate deep, strategic intelligence.

    SELLER CORE METRICS:
    - Company: ${m.company_name} (${m.city})
    - Tier: ${m.customer_type} (Paid Since: ${m.paid_since})
    - Engagement: PNS Pick Rate: ${m.pns_pick_rate_90d}%, PNS Calls: ${m.pns_call_count}, LMS Replies: ${m.lms_reply_count_90d}
    - Platform ROI: Enquiries: ${m.enquiry_received}, Rating: ${m.avg_rating}
    - Credits: Allocated: ${m.total_credit_allocated}, Consumed: ${m.total_credit_consumed}, BL Consumed: ${m.total_bl_consumed}

    MARKET DEMAND & CATEGORY PERFORMANCE (MCATs):
    ${JSON.stringify(mcats || [], null, 2)}

    COMPLAINTS AGAINST SELLER (Buyer Risk/Sentiment):
    ${JSON.stringify((ticketsAgainst || []).map((t: any) => ({
      id: t.customer_ticket_id,
      summary: t.ticket_summary.substring(0, 1500),
      type: t.complaint_type,
      date: t.issue_date
    })), null, 2)}

    ISSUES RAISED BY SELLER (Seller Frustration):
    ${JSON.stringify((ticketsBy || []).map((t: any) => ({
      id: t.customer_ticket_id,
      summary: t.ticket_summary.substring(0, 800),
      type: t.complaint_type,
      date: t.issue_date
    })), null, 2)}

    IMPORTANT ANALYSIS RULES:
    1. ROLE: Senior marketplace strategist, churn prediction analyst, seller success consultant, fraud/risk investigator.
    2. OBJECTIVE: Think about "What business action should be taken and why?" NOT "What raw data exists?".
    3. RELATIONSHIPS: Correlate credits consumed, engagement, ticket sentiment, and category demand.
    4. THINKING FRAMEWORK: Simultaneously evaluate Engagement, Churn, Upsell, Market Demand, Lead Quality, and Risk.

    OUTPUT STRUCTURE (Return ONLY valid JSON):
    {
      "satisfactionScore": number (0-100),
      "churnRisk": "Low" | "Medium" | "High",
      "frustrationLevel": "Low" | "Medium" | "High",
      "topIssues": string[] (max 5 keywords),
      "retentionProbability": number (0-100),
      "summaryPoints": string[] (exactly 3 analytical points),
      "recommendedActions": string[] (max 5 actionable steps under 12 words each),
      "detailedReport": string (Extensive Markdown report following ALL 10 sections requested: 1. Executive Summary, 2. Key Insights, 3. Behavioral Analysis, 4. Comparative Analysis, 5. Root Cause Analysis, 6. Opportunity Identification, 7. Predictive Insights, 8. Prioritized Recommendations, 9. Score Explanations, 10. Data Confidentiality/Confidence),
      "summarizedTicketsAgainst": [
        { "id": number, "reason": string, "result": string, "severity": "Low" | "Medium" | "High" }
      ],
      "summarizedTicketsBy": [
        { "id": number, "reason": string, "result": string, "severity": "Low" | "Medium" | "High" }
      ]
    }
  `;

  try {
    const openai = getOpenAI();
    const model = process.env.LLM_GATEWAY_MODEL || 'openrouter/qwen/qwen3-32b';

    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'You are a McKinsey-style marketplace intelligence engine for IndiaMART. Your goal is to transform raw seller data into strategic business intelligence. Return ONLY a valid JSON object matching the requested schema.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    const analysis = JSON.parse(content || '{}');
    res.json(analysis);
  } catch (error: any) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({ error: 'AI analysis failed', details: error.message });
  }
});

// Vite Middleware & Health
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
