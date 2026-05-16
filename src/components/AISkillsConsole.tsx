import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Activity, 
  Zap, 
  Terminal, 
  ShieldAlert, 
  CheckCircle2, 
  Loader2,
  ChevronRight,
  BrainCircuit,
  UserCircle,
  TrendingUp,
  AlertOctagon,
  BarChart3,
  FileSearch,
  UserMinus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { agentManager } from '../agent-skills/manager';
import { SkillId, SkillMetadata, SkillExecutionResult } from '../agent-skills/types';

const ICON_MAP: Record<string, any> = {
  UserMinus,
  TrendingUp,
  AlertOctagon,
  BarChart3,
  FileSearch,
  Activity
};

interface AISkillsConsoleProps {
  sellerData: any;
}

export const AISkillsConsole: React.FC<AISkillsConsoleProps> = ({ sellerData }) => {
  const [availableSkills, setAvailableSkills] = useState<SkillMetadata[]>([]);
  const [history, setHistory] = useState<SkillExecutionResult[]>([]);
  const [executingSkill, setExecutingSkill] = useState<SkillId | null>(null);
  const [logs, setLogs] = useState<{msg: string, time: string}[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAvailableSkills(agentManager.getAvailableSkills());
    addLog("Skill Discovery system initialized. Ready for activation.");
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, { msg, time: new Date().toLocaleTimeString() }].slice(-50));
  };

  const handleExecute = async (skillId: SkillId) => {
    setExecutingSkill(skillId);
    addLog(`Activating skill context: ${skillId}...`);
    
    await agentManager.activateSkill(skillId);
    addLog(`Skill ${skillId} context loaded. Executing reasoning engine...`);
    
    // Artificial delay for futuristic feel
    await new Promise(r => setTimeout(r, 1200));
    
    const result = await agentManager.executeSkill(skillId, sellerData);
    setHistory(agentManager.getHistory());
    
    result.reasoningTrace.forEach(line => addLog(line));
    addLog(`Execution completed: ${skillId}. Confidence: ${(result.confidence * 100).toFixed(1)}%`);
    
    setExecutingSkill(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px] text-slate-300 font-mono text-sm">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-800 bg-slate-950/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <BrainCircuit size={20} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              AGENT SKILLS CONSOLE
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] rounded-full border border-emerald-500/20 uppercase tracking-tighter">
                System Active
              </span>
            </h3>
            <p className="text-[10px] text-slate-500">v1.2.4-stable // Multi-Agent Orchestrator</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-700 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Available Skills */}
        <div className="w-1/3 border-r border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800 bg-slate-950/20 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Available Intelligence Skills
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {availableSkills.map((skill) => {
              const Icon = ICON_MAP[skill.icon] || Zap;
              const isExecuting = executingSkill === skill.id;
              
              return (
                <button
                  key={skill.id}
                  onClick={() => handleExecute(skill.id)}
                  disabled={!!executingSkill}
                  className={`w-full text-left p-3 rounded-xl transition-all group relative overflow-hidden ${
                    isExecuting 
                      ? 'bg-indigo-500/20 border-indigo-500/40' 
                      : 'hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3 relative z-10">
                    <div className={`p-2 rounded-lg ${isExecuting ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-indigo-400'}`}>
                      {isExecuting ? <Loader2 size={16} className="animate-spin" /> : <Icon size={16} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-200 mb-0.5 truncate">{skill.name}</h4>
                      <p className="text-[9px] text-slate-500 leading-tight line-clamp-2">{skill.description}</p>
                    </div>
                  </div>
                  {isExecuting && (
                    <motion.div 
                      layoutId="active-skill-bg"
                      className="absolute inset-0 bg-indigo-500/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Operations & Logs */}
        <div className="flex-1 flex flex-col bg-slate-950/50">
          {/* Diagnostic Display */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-800/50 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Terminal size={12} /> Execution Logs
              </span>
              <span className="text-[10px] text-indigo-400/70">AGENT_ADDR://localhost:3000</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar font-mono text-[11px]">
              <AnimatePresence initial={false}>
                {logs.map((log, i) => (
                  <motion.div
                    key={`log-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3"
                  >
                    <span className="text-slate-600 shrink-0">[{log.time}]</span>
                    <span className={log.msg.includes('completed') ? 'text-emerald-400' : log.msg.includes('Executing') ? 'text-indigo-400' : 'text-slate-400'}>
                      <span className="text-slate-700 mr-2">›</span>
                      {log.msg}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={logEndRef} />
            </div>
          </div>

          {/* Execution Result Area */}
          <div className="h-48 border-t border-slate-800 bg-slate-900/80 p-4">
            {history.length > 0 ? (
              <div className="h-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                    Last Result: {history[0].skillId.replace('-', ' ')}
                  </span>
                  <span className="px-1.5 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] rounded border border-indigo-500/20">
                    Confidence: {(history[0].confidence * 100)}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 h-[calc(100%-24px)] overflow-y-auto custom-scrollbar">
                  {Object.entries(history[0].insights).map(([key, val]: [string, any]) => (
                    <div key={key} className="bg-slate-950/40 rounded-lg p-2 border border-slate-800/40">
                      <p className="text-[9px] text-slate-500 uppercase mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="text-[11px] text-slate-200 font-bold">
                        {Array.isArray(val) ? val.join(', ') || 'None' : String(val)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 italic text-xs">
                <Cpu size={24} className="mb-2 opacity-20" />
                Waiting for skill invocation...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
