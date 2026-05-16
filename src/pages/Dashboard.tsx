import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Search, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown,
  CheckCircle2, 
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  BrainCircuit,
  Loader2,
  ChevronDown,
  LayoutDashboard,
  Target,
  Zap,
  Star,
  Info,
  Activity,
  LogOut,
  User as UserIcon,
  BarChart3,
  ArrowUpRight,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { fetchSellerDetails, analyzeSeller } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { AISkillsConsole } from '../components/AISkillsConsole';

// --- Types ---

interface MonthlyMetric {
  pageviews: number;
  buylead_approved: number;
  unique_buylead_sold: number;
  NI_Hides: number;
}

interface MonthlyData {
  [month: string]: MonthlyMetric;
}

interface McatData {
  mcat_id: number;
  mcat_name: string;
  monthly_data: MonthlyData;
}

interface TicketSummary {
  id: number;
  reason: string;
  result: string;
  severity: 'Low' | 'Medium' | 'High';
}

interface AIAnalysis {
  satisfactionScore: number;
  churnRisk: 'Low' | 'Medium' | 'High';
  frustrationLevel: 'Low' | 'Medium' | 'High';
  topIssues: string[];
  retentionProbability: number;
  summaryPoints: string[];
  recommendedActions: string[];
  detailedReport?: string;
  summarizedTicketsAgainst?: TicketSummary[];
  summarizedTicketsBy?: TicketSummary[];
}

const InteractiveDemo = ({ onStartTrial }: { onStartTrial: (id: string) => void }) => {
  const demoGLID = "94955292";
  
  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden text-center max-w-5xl mx-auto"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-blue-500 to-emerald-500" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500 opacity-5 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500 opacity-5 blur-[100px] rounded-full" />
        
        <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-800 shadow-lg">
           <Zap size={14} className="text-orange-400 fill-orange-400" />
           Demo Seller Preview
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
          Maheeka Traders
        </h1>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl">
             <span className="text-xs font-bold text-emerald-700 uppercase">TSCATALOG</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
             <MapPin size={14} className="text-blue-500" />
             <span className="text-xs font-bold text-slate-800">Ghaziabad, UP</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
             <span className="text-[10px] font-black text-slate-400 uppercase">Member Since</span>
             <span className="text-xs font-bold text-slate-800">2019</span>
          </div>
        </div>

        <button 
          onClick={() => onStartTrial(demoGLID)}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center gap-3 mx-auto"
        >
          Explore PURE Insights
          <ArrowRight size={18} />
        </button>
      </motion.div>

      {/* Section 3: AI Insight Preview */}
      <section className="max-w-6xl mx-auto px-4 bg-slate-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden border-4 border-slate-800">
        <div className="relative z-10 mb-10">
           <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400 border border-orange-500/20">
               <BrainCircuit size={20} />
             </div>
             <h2 className="text-xl font-bold text-white tracking-tighter"><span className="text-orange-500">AI</span> Insight Preview</h2>
           </div>
           <p className="text-slate-400 text-xs font-medium max-w-xl">How our AI engine deciphers raw JSON metrics into actual business strategy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {[
            { label: 'Upsell Opportunity', val: 'High Potential', sub: '97% consumption rate', icon: Zap, color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' },
            { label: 'Category Traffic', val: 'Weak detected', sub: 'Footwear alignment < 20%', icon: Activity, color: 'text-red-400 border-red-500/20 bg-red-500/5' },
            { label: 'Catalog Relevance', val: 'Needs Enrichment', sub: 'High NI Count in Boots', icon: Target, color: 'text-orange-400 border-orange-500/20 bg-orange-500/5' },
            { label: 'Sentiment Risk', val: 'Low (Healthy)', sub: 'Responsive to enquiries', icon: ShieldCheck, color: 'text-blue-400 border-blue-500/20 bg-blue-500/5' }
          ].map((insight, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-5 rounded-2xl border ${insight.color}`}
            >
              <insight.icon size={20} className="mb-3" />
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{insight.label}</p>
              <p className="text-sm font-bold tracking-tight mb-1">{insight.val}</p>
              <p className="text-[9px] font-bold opacity-50 uppercase tracking-tighter">{insight.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Start Button Mobile */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden w-full px-8">
        <button 
          onClick={() => onStartTrial(demoGLID)}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 border border-slate-700"
        >
          View Trial Profile
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

// --- Components ---

const StatCard = ({ title, value, icon: Icon, color = "blue", subtitle }: any) => {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50/50 border-blue-100",
    orange: "text-orange-600 bg-orange-50/50 border-orange-100",
    green: "text-green-600 bg-green-50/50 border-green-100",
    red: "text-red-600 bg-red-50/50 border-red-100",
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-2">
        <div className={`p-2.5 rounded-xl border ${colors[color]}`}>
          <Icon size={20} className="group-hover:scale-110 transition-transform" />
        </div>
        {subtitle && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{subtitle}</span>}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800 tracking-tight">{value}</p>
        <p className="text-xs font-semibold text-slate-500 mt-0.5">{title}</p>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, icon: Icon }: any) => (
  <div className="flex items-center gap-3 mb-5">
    {Icon && (
      <div className="p-2 bg-slate-50 rounded-lg text-slate-600 border border-slate-100">
        <Icon size={18} />
      </div>
    )}
    <div>
      <h2 className="text-base font-bold text-slate-800 tracking-tight">{title}</h2>
      {subtitle && <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{subtitle}</p>}
    </div>
  </div>
);

const GrowthInsights = ({ data }: { data: any }) => {
  const m = data.seller.user_metrics;
  const mcats = (data.mcats || []) as McatData[];
  const blni = data.blni || [];

  // Helper to sum monthly metrics
  const sumMonthly = (mcat: McatData, key: keyof MonthlyMetric) => {
    return Object.values(mcat.monthly_data).reduce((acc, curr) => acc + (curr[key] || 0), 0);
  };

  // --- FACTOR CALCULATIONS ---
  
  // 1. Seller Satisfaction Factor
  // Normalizing metrics to 0-100 scales
  const pnsScore = m.pns_pick_rate_90d;
  const ratingScore = (m.avg_rating / 5) * 100;
  const lmsScore = Math.min(100, (m.lms_reply_count_90d / 50) * 100); // 50+ replies is considered 100%
  const satisfactionScore = (pnsScore * 0.4) + (ratingScore * 0.3) + (lmsScore * 0.3);

  // 2. Credit Consumption Factor
  const creditConsumptionPercent = (m.total_credit_consumed / m.total_credit_allocated) * 100;

  // 3. Demand Availability Factor
  const totalApproved = mcats.reduce((s: number, c: McatData) => s + sumMonthly(c, 'buylead_approved'), 0);
  const totalSold = mcats.reduce((s: number, c: McatData) => s + sumMonthly(c, 'unique_buylead_sold'), 0);
  const demandGap = totalApproved - totalSold;
  const demandGapPercent = totalApproved > 0 ? (demandGap / totalApproved) * 100 : 0;

  // --- CARD 1: UPSELL LOGIC ---
  // If satisfaction is low, penalize the score. If consumption and gap are high, boost it.
  let upsellScore = (creditConsumptionPercent * 0.5) + (demandGapPercent * 0.3) + (satisfactionScore * 0.2);
  
  // Penalize heavily if satisfaction is poor (< 50)
  if (satisfactionScore < 50) upsellScore *= 0.5;

  let upsellPotential = "LOW";
  let upsellColor = "text-red-500 bg-red-50 border-red-100";
  let upsellProgressColor = "#ef4444";
  
  if (upsellScore > 80) {
    upsellPotential = "HIGH";
    upsellColor = "text-emerald-500 bg-emerald-50 border-emerald-100";
    upsellProgressColor = "#10b981";
  } else if (upsellScore >= 60) {
    upsellPotential = "MEDIUM";
    upsellColor = "text-amber-500 bg-amber-50 border-amber-100";
    upsellProgressColor = "#f59e0b";
  }

  const currentPlan = m.customer_type?.toUpperCase() || 'FREE';
  const isLeader = currentPlan === 'LEADER';
  const upgradePath: { [key: string]: string } = {
    'CATALOG': 'TSCatalog',
    'TSCATALOG': 'Star',
    'STAR': 'Leader',
    'FREE': 'Catalog'
  };
  const recommendedPlan = upgradePath[currentPlan] || 'Custom Enterprise';

  // --- CARD 2: TRAFFIC LOGIC ---
  const isLowConsumption = creditConsumptionPercent < 80;
  const isLowDemandGap = demandGapPercent < 20; // Hardcoded threshold for "low difference"
  const trafficIssueDetected = isLowConsumption && isLowDemandGap;

  let trafficStatus = "HEALTHY TRAFFIC";
  let trafficColor = "text-emerald-500 bg-emerald-50 border-emerald-100";
  if (trafficIssueDetected) {
    trafficStatus = "LOW TRAFFIC";
    trafficColor = "text-red-500 bg-red-50 border-red-100";
  } else if (isLowConsumption || isLowDemandGap) {
    trafficStatus = "MODERATE TRAFFIC";
    trafficColor = "text-amber-500 bg-amber-50 border-amber-100";
  }

  // --- CARD 3: CATALOG RELEVANCE ---
  const problematicMcats = blni.filter((item: any) => item && item.ni_count > 0).sort((a: any, b: any) => b.ni_count - a.ni_count);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mt-4">
        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100 shadow-sm">
          <TrendingUp size={20} />
        </div>
        <h2 className="text-xl font-black text-slate-800 tracking-tight">Growth & Upsell Opportunity Insights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Upsell Opportunity */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col relative group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">STRATEGIC GROWTH</p>
              <h3 className="text-lg font-bold text-slate-800">Upsell Opportunity</h3>
            </div>
            <div className={`px-2 py-1 rounded-md text-[9px] font-black border uppercase tracking-widest ${upsellColor}`}>
              {upsellPotential} POTENTIAL
            </div>
          </div>

          <div className="flex-1 space-y-6">
             <div className="flex items-center gap-8 px-2">
                <div className="relative w-20 h-20">
                   <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="transparent" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <motion.path
                        initial={{ strokeDasharray: "0, 100" }}
                        animate={{ strokeDasharray: `${upsellScore}, 100` }}
                        className="transition-all"
                        strokeWidth="4"
                        strokeDasharray={`${upsellScore}, 100`}
                        strokeLinecap="round"
                        stroke={upsellProgressColor}
                        fill="transparent"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-xs font-black text-slate-800">{Math.round(upsellScore)}%</span>
                   </div>
                </div>
                <div className="flex-1 space-y-2">
                   <div className="flex justify-between items-end">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Current Tier</p>
                      <p className="text-xs font-black text-slate-900">{currentPlan}</p>
                   </div>
                   <div className="flex justify-between items-end">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Recommended</p>
                      <p className={`text-xs font-black ${isLeader ? 'text-slate-300' : 'text-blue-600'}`}>{isLeader ? 'PLAN MAXED' : recommendedPlan}</p>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                   <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Consumption</p>
                   <p className="text-sm font-black text-slate-800">{creditConsumptionPercent.toFixed(1)}%</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                   <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Demand Gap</p>
                   <p className="text-sm font-black text-slate-800">{demandGapPercent.toFixed(1)}%</p>
                </div>
             </div>

             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                   <Star size={12} className="text-orange-500" />
                   <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">AI Strategic Bullets</p>
                </div>
                <div className="space-y-2">
                   {upsellScore > 60 ? (
                      <>
                        <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">• Seller has consumed {creditConsumptionPercent.toFixed(0)}% credits while marketplace demand remains high.</p>
                        <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">• Strong engagement and healthy satisfaction signals indicate high upgrade probability.</p>
                      </>
                   ) : (
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">• Seller activity is moderate and demand gap is limited. Upsell opportunity currently weak.</p>
                   )}
                </div>
             </div>
          </div>

          <button 
            disabled={isLeader}
            className={`mt-6 w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              isLeader 
              ? "bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100" 
              : "bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-100"
            }`}
          >
            {isLeader ? "MAX PLAN ACTIVE" : `UPGRADE TO ${recommendedPlan.toUpperCase()}`}
          </button>
        </div>

        {/* Card 2: MCAT Traffic Opportunity */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col relative group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">DEMAND INTELLIGENCE</p>
              <h3 className="text-lg font-bold text-slate-800">Traffic Opportunity</h3>
            </div>
            <div className={`px-2 py-1 rounded-md text-[9px] font-black border uppercase tracking-widest shadow-sm ${trafficColor}`}>
              {trafficStatus}
            </div>
          </div>

          <div className="flex-1 space-y-6">
             <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-white border border-slate-100 ${trafficIssueDetected ? 'text-red-500' : 'text-emerald-500'}`}>
                         <Activity size={18} />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase">Marketplace Demand</p>
                         <p className="text-sm font-black text-slate-800">{trafficIssueDetected ? 'Weak Supply/Demand' : 'Strong Category View'}</p>
                      </div>
                   </div>
                   <div className={`w-2 h-2 rounded-full animate-pulse ${trafficIssueDetected ? 'bg-red-500' : 'bg-emerald-500'}`} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Credit util.</p>
                      <p className="text-lg font-black text-slate-800">{creditConsumptionPercent.toFixed(1)}%</p>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Alignment</p>
                      <p className={`text-lg font-black ${demandGapPercent > 30 ? 'text-emerald-500' : 'text-amber-500'}`}>{demandGapPercent > 30 ? 'HEALTHY' : 'MISMATCH'}</p>
                   </div>
                </div>
             </div>

             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                   <BrainCircuit size={12} className="text-blue-500" />
                   <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Platform Insight</p>
                </div>
                <div className="space-y-2">
                   {trafficIssueDetected ? (
                      <>
                        <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">• Seller categories show weak lead availability despite remaining credits.</p>
                        <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">• Preferred MCATs may require category enrichment for better marketplace visibility.</p>
                      </>
                   ) : (
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">• Traffic flow appears stable across primary and secondary MCATs at current tier.</p>
                   )}
                </div>
             </div>
          </div>

          <button 
            disabled={!trafficIssueDetected}
            className={`mt-6 w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              !trafficIssueDetected 
              ? "bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100" 
              : "bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-200"
            }`}
          >
            <Mail size={14} />
            Send Mail to Category Team
          </button>
        </div>

        {/* Card 3: Catalog Relevance */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col relative group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">LEAD QUALITY</p>
              <h3 className="text-lg font-bold text-slate-800">Catalog Relevance</h3>
            </div>
            <div className={`p-2 rounded-xl border ${problematicMcats.length > 2 ? 'bg-red-50 border-red-100 text-red-500' : 'bg-emerald-50 border-emerald-100 text-emerald-500'}`}>
               <Target size={16} />
            </div>
          </div>

          <div className="flex-1 space-y-4">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Problematic MCATs (NI Trend)</p>
             
             <div className="space-y-2 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar-slate">
                {problematicMcats.length > 0 ? problematicMcats.map((item: any, idx: number) => (
                   <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-orange-200 transition-colors">
                      <div className="flex items-center gap-3 overflow-hidden">
                         <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-[10px] font-black shrink-0">
                            NI
                         </div>
                         <span className="text-[11px] font-black text-slate-700 truncate">{item.mcat_name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                         <span className="text-[10px] font-black text-red-500">{item.ni_count}</span>
                         <span className="text-[8px] font-bold text-slate-400 uppercase">HIDES</span>
                      </div>
                   </div>
                )) : (
                   <div className="flex flex-col items-center justify-center py-10 text-center opacity-40">
                      <ShieldCheck size={32} className="text-emerald-500 mb-2" />
                      <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Healthy Alignment</p>
                   </div>
                )}
             </div>

             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-auto">
                <div className="flex items-center gap-2 mb-2">
                   <Activity size={12} className="text-red-500" />
                   <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Catalog Intelligence</p>
                </div>
                <div className="space-y-2">
                   {problematicMcats.length > 0 ? (
                      <>
                        <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">• Seller frequently rejects leads from <span className="text-slate-900 font-bold">"{problematicMcats[0].mcat_name}"</span>, indicating possible category mismatch.</p>
                        <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">• Catalog enrichment and category remapping may improve lead relevance.</p>
                      </>
                   ) : (
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">• Catalog alignment appears healthy. No major "Not Interested" trends detected.</p>
                   )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RiskMeter = ({ score, risk }: { score: number, risk: string }) => {
  const data = [
    { value: score, fill: risk === 'High' ? '#ef4444' : risk === 'Medium' ? '#f59e0b' : '#10b981' },
    { value: 100 - score, fill: '#1e293b' }
  ];

  return (
    <div className="relative w-full h-40 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={85}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-2 text-center">
        <p className="text-3xl font-black text-white">{Number(score).toFixed(2)}%</p>
        <p className={`text-[10px] font-black uppercase tracking-widest ${risk === 'High' ? 'text-red-400' : risk === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
          {risk} CHURN RISK
        </p>
      </div>
    </div>
  );
};

// --- MCAT Monthly Performance Components ---

const McatTrendGraph = ({ monthlyData }: { monthlyData: MonthlyData }) => {
  const data = Object.entries(monthlyData).map(([month, metrics]) => ({
    name: month.split('-')[0], // Just the month part for X-axis
    unique_buylead_sold: metrics.unique_buylead_sold,
    buyleads: metrics.buylead_approved,
    fullMonth: month
  }));

  return (
    <div className="h-32 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorBl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }}
            dy={5}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              borderRadius: '12px', 
              border: '1px solid #f1f5f9',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              fontSize: '10px',
              fontWeight: 700
            }}
          />
          <Area 
            type="monotone" 
            dataKey="unique_buylead_sold" 
            stroke="#3b82f6" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorPv)" 
          />
          <Area 
            type="monotone" 
            dataKey="buyleads" 
            stroke="#f97316" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorBl)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const McatDetailModal = ({ mcat, onClose }: { mcat: McatData, onClose: () => void }) => {
  const months = Object.keys(mcat.monthly_data);
  const metrics = ['pageviews', 'buylead_approved', 'unique_buylead_sold', 'NI_Hides'];
  const labels: { [key: string]: string } = {
    pageviews: 'Pageviews',
    buylead_approved: 'BL approved',
    unique_buylead_sold: 'Unique BL sold',
    NI_Hides: 'NI Hides'
  };

  // Optional insights
  const dataArr = Object.entries(mcat.monthly_data);
  const highestBlMonth = dataArr.reduce((prev, curr) => 
    curr[1].buylead_approved > prev[1].buylead_approved ? curr : prev
  );

  const firstMonth = dataArr[0][1].buylead_approved;
  const lastMonth = dataArr[dataArr.length - 1][1].buylead_approved;
  const growth = ((lastMonth - firstMonth) / firstMonth) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8 border-b border-slate-50 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-orange-500 rounded-lg text-white">
                <Target size={18} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MCAT DEEP-DIVE</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{mcat.mcat_name}</h2>
            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">MCAT ID: #{mcat.mcat_id}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
          >
             <ChevronDown size={24} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Metric</th>
                  {months.map(m => (
                    <th key={m} className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-bold">
                {metrics.map(metric => (
                  <tr key={metric} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-xs text-slate-600">{labels[metric]}</td>
                    {months.map(m => (
                      <td key={`${metric}-${m}`} className="p-4 text-xs text-slate-900 text-center">
                        {mcat.monthly_data[m][metric as keyof MonthlyMetric]?.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-emerald-500" />
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">AI Insights</span>
              </div>
              <p className="text-xs font-bold text-emerald-900 leading-tight">
                {highestBlMonth[0]} showed highest engagement growth with {highestBlMonth[1].buylead_approved} approved buyleads.
              </p>
            </div>
            <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2 text-blue-500">
                <Zap size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Demand indicator</span>
              </div>
              <p className="text-xs font-bold text-blue-900 leading-tight">
                Demand {growth >= 0 ? 'grew' : 'decreased'} by {Math.abs(growth).toFixed(1)}% over the last 4 months compared to start of cycle.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AccordionItem = ({ title, children, isOpen, onClick, icon: Icon }: any) => (
  <div className="border-b border-slate-800 last:border-0 overflow-hidden">
    <button 
      onClick={onClick}
      className={`w-full py-4 text-left flex justify-between items-center transition-colors hover:text-orange-400 ${isOpen ? 'text-orange-400' : 'text-slate-400'}`}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon size={16} />}
        <span className="text-xs font-black uppercase tracking-widest">{title}</span>
      </div>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
        <ChevronDown size={16} />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="pb-6 text-slate-300">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- Dashboard Component ---

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [openSection, setOpenSection] = useState<string>('summary');
  const [selectedMcat, setSelectedMcat] = useState<McatData | null>(null);
  const [viewingTicket, setViewingTicket] = useState<any>(null);
  const [viewReport, setViewReport] = useState(false);

  const handleSearch = async (e?: React.FormEvent, id?: string) => {
    if (e) e.preventDefault();
    const targetId = id || searchId;
    if (!targetId) return;
    
    // If it's a trial/demo click, update the search input too
    if (id) setSearchId(id);

    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await fetchSellerDetails(targetId);
      setData(result);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Seller not found. Please try a valid GL ID.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!data) return;
    setAnalyzing(true);
    try {
      const result = await analyzeSeller(data);
      setAnalysis(result);
      setOpenSection('summary');
    } catch (err: any) {
      setError('AI Analysis failed. Gateway might be busy.');
    } finally {
      setAnalyzing(false);
    }
  };

  const engagementData = data ? [
    { name: 'Day 1', score: 30 },
    { name: 'Day 2', score: 45 },
    { name: 'Day 3', score: 40 },
    { name: 'Day 4', score: 65 },
    { name: 'Day 5', score: 55 },
    { name: 'Day 6', score: 80 },
    { name: 'Day 7', score: data.seller.user_metrics.pns_pick_rate_90d },
  ] : [];

  const groupTickets = (tickets: any[]) => {
    const groups: { [key: string]: number } = {};
    tickets.forEach(t => {
      const cat = t.complaint_type || 'Uncategorized';
      groups[cat] = (groups[cat] || 0) + 1;
    });
    return Object.entries(groups).map(([type, count]) => ({ type, count }));
  };

  const ticketsAgainstGrouped = data ? groupTickets(data.ticketsAgainst) : [];
  const ticketsByGrouped = data ? groupTickets(data.ticketsBy) : [];

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 font-sans selection:bg-orange-100">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => { setData(null); setSearchId(''); setError(null); }}
          >
            <img 
              src="/indiamart-logo.png" 
              alt="IndiaMART Logo" 
              className="h-8 w-auto"
            />
            <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block" />
            <div className="flex flex-col items-center">
              <h1 className="text-lg font-extrabold text-black tracking-tighter leading-none">
                IndiaMART <span className="text-orange-500">P U R E</span>
              </h1>
              <p className="text-[9px] font-bold text-slate-500 tracking-tight mt-1 text-center">
                Predictive Upsell & Retention Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search GL User ID..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg w-48 lg:w-64 focus:ring-2 focus:ring-orange-500 transition-all text-sm font-medium"
              />
            </form>
            <button 
              onClick={handleSearch}
              disabled={loading}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={14} /> : 'Fetch data'}
            </button>

            {/* Profile Section */}
            <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />
            <div className="flex items-center gap-3 pl-2">
               <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black uppercase text-slate-900 leading-none">{user?.displayName}</p>
                  <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Authorized Auditor</p>
               </div>
               <div className="relative group">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-9 h-9 rounded-xl border border-slate-200 shadow-sm" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-9 h-9 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center border border-orange-200">
                       <UserIcon size={18} />
                    </div>
                  )}
                  <button 
                    onClick={logout}
                    className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full border border-slate-200 shadow-md text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <LogOut size={12} />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center justify-between font-bold"
            >
              <div className="flex items-center gap-3">
                <AlertCircle size={18} />
                <span className="text-sm">{error}</span>
              </div>
              <button onClick={() => setError(null)} className="text-xs uppercase tracking-widest opacity-50 hover:opacity-100">Dismiss</button>
            </motion.div>
          )}

          {!data && !loading && !error && (
            <InteractiveDemo onStartTrial={(id) => handleSearch(undefined, id)} />
          )}

          {data && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Dashboard Content */}
              <div className="lg:col-span-8 space-y-8 pb-20">
                
                {/* Header Profile Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-2">
                   <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ${data.seller.user_metrics.customer_type !== 'FREE' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-600'}`}>
                          {data.seller.user_metrics.customer_type} USER
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member Since {data.seller.user_metrics.member_since.split('-')[0]}</span>
                      </div>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{data.seller.user_metrics.company_name}</h2>
                      <div className="flex items-center gap-4 mt-3 text-sm font-medium text-slate-500">
                        <div className="flex items-center gap-1.5"><MapPin size={14} className="text-blue-500" /> {data.seller.user_metrics.city}</div>
                      </div>
                   </div>

                   <button 
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="w-full md:w-auto bg-orange-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {analyzing ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} fill="white" />}
                    Run AI Health Analysis
                  </button>
                </div>

                {/* Primary Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard title="Enquiries" value={data.seller.user_metrics.enquiry_received} icon={Mail} color="blue" subtitle="90 Days" />
                  <StatCard title="Avg Rating" value={Number(data.seller.user_metrics.avg_rating).toFixed(2)} icon={Star} color="orange" subtitle="Feedback" />
                  <StatCard title="PNS Pick Rate" value={`${Number(data.seller.user_metrics.pns_pick_rate_90d).toFixed(2)}%`} icon={Phone} color="green" subtitle="Engagement" />
                  <StatCard title="Credits Used" value={`${((data.seller.user_metrics.total_credit_consumed / data.seller.user_metrics.total_credit_allocated) * 100).toFixed(2)}%`} icon={Zap} color="red" subtitle="Engagement" />
                </div>

                {/* Preferred MCAT monthly performance Analysis */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <SectionHeader title="Preferred MCAT monthly performance Analysis" subtitle="Trend based demand monitoring" icon={Activity} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.mcats.map((mcat: McatData, idx: number) => (
                      <div key={idx} className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100 relative group overflow-hidden hover:border-orange-200 transition-all">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 blur-2xl -mr-10 -mt-10 group-hover:bg-orange-500/10 transition-all" />
                        <div className="flex justify-between items-start mb-2 relative z-10">
                          <div className="flex-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">ID: #{mcat.mcat_id}</p>
                            <h4 className="text-sm font-black text-slate-800 leading-tight pr-4">{mcat.mcat_name}</h4>
                          </div>
                          <button 
                            onClick={() => setSelectedMcat(mcat)}
                            className="bg-white p-2 rounded-xl shadow-sm text-slate-400 hover:text-orange-500 hover:scale-110 transition-all border border-slate-50"
                          >
                            <Maximize2 size={16} />
                          </button>
                        </div>
                        <McatTrendGraph monthlyData={mcat.monthly_data} />
                        <div className="mt-4 flex items-center justify-between relative z-10">
                           <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              <span className="text-[9px] font-bold text-slate-400 uppercase">Unique BL sold</span>
                           </div>
                           <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                              <span className="text-[9px] font-bold text-slate-400 uppercase">BL approved</span>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Agent Skills Console */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-10" />
                  <AISkillsConsole sellerData={data} />
                </div>

                {/* Ticket Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full">
                    <SectionHeader title="Grievances" subtitle="Against Seller" icon={AlertTriangle} />
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {ticketsAgainstGrouped.length > 0 ? ticketsAgainstGrouped.map((group, index) => {
                        return (
                          <div key={`against-group-${index}`} className="p-4 rounded-2xl bg-white border border-slate-100 hover:border-orange-200 transition-all shadow-sm flex justify-between items-center group">
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Ticket Category</p>
                               <h4 className="text-sm font-black text-slate-800">{group.type}</h4>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Count</p>
                               <div className="inline-flex items-center justify-center min-w-[28px] h-7 bg-orange-500 text-white text-xs font-black rounded-lg px-2">
                                 {group.count}
                               </div>
                            </div>
                          </div>
                        );
                      }) : (
                        <div className="flex flex-col items-center justify-center py-12 opacity-40">
                           <CheckCircle2 size={32} />
                           <p className="text-xs font-bold mt-2 uppercase tracking-widest">No risks found</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full">
                    <SectionHeader title="VOC" subtitle="By seller" icon={Mail} />
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {ticketsByGrouped.length > 0 ? ticketsByGrouped.map((group, index) => {
                        return (
                          <div key={`by-group-${index}`} className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-blue-200 transition-all shadow-sm flex justify-between items-center group">
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Ticket Category</p>
                               <h4 className="text-sm font-black text-slate-800">{group.type}</h4>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Count</p>
                               <div className="inline-flex items-center justify-center min-w-[28px] h-7 bg-blue-600 text-white text-xs font-black rounded-lg px-2">
                                 {group.count}
                               </div>
                            </div>
                          </div>
                        );
                      }) : (
                        <div className="flex flex-col items-center justify-center py-12 opacity-40">
                           <Info size={32} />
                           <p className="text-xs font-bold mt-2 uppercase tracking-widest">No inquiries found</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Growth & Upsell Opportunity Insights */}
                {analysis && <GrowthInsights data={data} />}
              </div>

              {/* Right Column: AI Insights Panel */}
              <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
                <div className="bg-slate-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[calc(100vh-120px)] border-4 border-slate-800">
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-orange-600/30 blur-[60px]" />
                  <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-600/20 blur-[60px]" />
                  
                  {/* AI Header */}
                  <div className="p-6 pb-2 border-b border-slate-800 z-10">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-orange-500 rounded-md">
                          <BrainCircuit size={16} />
                        </div>
                        <h3 className="text-sm font-black italic tracking-widest text-white">AI INSIGHTS</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {analysis && (
                          <button 
                            onClick={() => setViewReport(!viewReport)}
                            className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest transition-all border flex items-center gap-2 ${
                              viewReport 
                                ? 'bg-orange-500 text-white border-orange-400' 
                                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                            }`}
                          >
                            {viewReport ? 'Stats View' : (
                              <>
                                Strategic Report
                                <span className="bg-orange-500 text-white text-[7px] px-1 rounded animate-pulse">NEW</span>
                              </>
                            )}
                          </button>
                        )}
                        <span className="text-[8px] font-black text-slate-500 bg-slate-800 px-2 py-1 rounded-full uppercase tracking-widest">Live Engine</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar z-10">
                    {!analysis && !analyzing && (
                       <div className="flex flex-col items-center justify-center py-20 text-center">
                          <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 border border-slate-700">
                            <Zap className="text-slate-600" size={24} />
                          </div>
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Ready for analysis</p>
                          <p className="text-slate-500 text-[10px] mt-2 px-8 leading-relaxed italic">Click the orange button to start the AI retention evaluation.</p>
                       </div>
                    )}

                    {analyzing && (
                      <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="relative mb-6">
                          <div className="absolute -inset-4 bg-orange-500/40 rounded-full blur-xl animate-pulse" />
                          <Loader2 className="animate-spin text-orange-500 relative" size={40} />
                        </div>
                        <p className="font-black text-sm uppercase tracking-widest animate-pulse">Scanning Profile...</p>
                        <p className="text-slate-500 text-[10px] mt-3 uppercase tracking-tighter max-w-[200px]">Evaluating churn signals and sentiment...</p>
                      </div>
                    )}

                    {analysis && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        {viewReport && analysis.detailedReport ? (
                          <div className="markdown-body text-xs text-slate-300 leading-relaxed font-medium">
                            <ReactMarkdown
                              components={{
                                h1: ({ node, ...props }) => <h1 className="text-lg font-black text-white mt-6 mb-4 uppercase tracking-tighter border-b border-slate-800 pb-2" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-base font-black text-orange-500 mt-6 mb-3 uppercase tracking-tight" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-sm font-black text-white mt-4 mb-2" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-4 text-slate-400" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-4 space-y-2" {...props} />,
                                li: ({ node, ...props }) => <li className="text-slate-400" {...props} />,
                                hr: ({ node, ...props }) => <hr className="border-slate-800 my-6" {...props} />,
                                strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-orange-500 pl-4 italic text-slate-500 my-4" {...props} />,
                              }}
                            >
                              {analysis.detailedReport}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <>
                            {/* Dominant Health Score */}
                            <RiskMeter score={analysis.satisfactionScore} risk={analysis.churnRisk} />

                            {/* Accordions */}
                            <div className="mt-8 space-y-1">
                          <AccordionItem 
                            title="Executive Summary" 
                            icon={LayoutDashboard}
                            isOpen={openSection === 'summary'} 
                            onClick={() => setOpenSection(openSection === 'summary' ? '' : 'summary')}
                          >
                            <ul className="space-y-2">
                              {analysis.summaryPoints.map((p, idx) => (
                                <li key={idx} className="flex gap-2 text-xs leading-relaxed">
                                  <div className="mt-1.5 w-1 h-1 rounded-full bg-orange-500 shrink-0" />
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionItem>

                          <AccordionItem 
                            title="Priority Concerns" 
                            icon={AlertTriangle}
                            isOpen={openSection === 'concerns'} 
                            onClick={() => setOpenSection(openSection === 'concerns' ? '' : 'concerns')}
                          >
                            <div className="flex flex-wrap gap-2">
                              {analysis.topIssues.map((issue, idx) => (
                                <span key={idx} className="bg-slate-800 text-slate-300 px-2 py-1 rounded-md text-[10px] font-bold border border-slate-700 capitalize">
                                  # {issue}
                                </span>
                              ))}
                            </div>
                          </AccordionItem>

                          <AccordionItem 
                            title="Risk Profile" 
                            icon={Target}
                            isOpen={openSection === 'risk'} 
                            onClick={() => setOpenSection(openSection === 'risk' ? '' : 'risk')}
                          >
                             <div className="space-y-4">
                                <div>
                                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1.5">
                                      <span className="text-slate-500">Retention Prob.</span>
                                      <span className="text-emerald-400">{Number(analysis.retentionProbability).toFixed(2)}%</span>
                                   </div>
                                   <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${analysis.retentionProbability}%` }}
                                        className="h-full bg-emerald-500"
                                      />
                                   </div>
                                </div>
                                <div>
                                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1.5">
                                      <span className="text-slate-500">Sentiment Rank</span>
                                      <span className={analysis.frustrationLevel === 'High' ? 'text-red-400' : 'text-amber-400'}>{analysis.frustrationLevel} Frustration</span>
                                   </div>
                                   <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: analysis.frustrationLevel === 'High' ? '80%' : analysis.frustrationLevel === 'Medium' ? '50%' : '20%' }}
                                        className={`h-full ${analysis.frustrationLevel === 'High' ? 'bg-red-500' : 'bg-amber-500'}`}
                                      />
                                   </div>
                                </div>
                             </div>
                          </AccordionItem>
                        </div>
                        {/* Action Chips */}
                        <div className="pt-4 border-t border-slate-800">
                          <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-4">Next Best Actions</p>
                          <div className="grid grid-cols-1 gap-2">
                             {analysis.recommendedActions.map((action, idx) => (
                               <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 p-2.5 rounded-xl flex items-center gap-2 group cursor-default transition-all"
                               >
                                 <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                    <CheckCircle2 size={12} />
                                 </div>
                                 <p className="text-[10px] font-bold text-slate-300 leading-tight group-hover:text-white transition-colors">{action}</p>
                               </motion.div>
                             ))}
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </div>
                  
                  {/* Subtle Footer */}
                  <div className="p-4 text-[8px] font-bold text-slate-600 uppercase tracking-widest text-center border-t border-slate-800/50">
                    Generated for Enterprise Audit | v2.4.0
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedMcat && (
          <McatDetailModal 
            mcat={selectedMcat} 
            onClose={() => setSelectedMcat(null)} 
          />
        )}
        {viewingTicket && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setViewingTicket(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-8 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col border border-slate-200 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Ticket History</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">ID: #{viewingTicket.customer_ticket_id}</p>
                </div>
                <button 
                  onClick={() => setViewingTicket(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <ChevronDown size={24} className="rotate-180" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar-slate">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-slate-900 text-white text-[10px] font-black rounded uppercase tracking-widest">
                       {viewingTicket.complaint_type}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{viewingTicket.issue_date?.split(' ')[0]}</span>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 text-sm font-medium leading-relaxed whitespace-pre-wrap">
                      {viewingTicket.ticket_summary}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS for custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar-slate::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar-slate::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar-slate::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
