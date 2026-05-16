import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, Loader2, ShieldCheck, Zap, BrainCircuit } from 'lucide-react';
import { motion } from 'motion/react';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await login();
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-xl text-center space-y-12"
      >
        {/* Branding Header */}
        <div className="flex flex-col items-center space-y-4">
          <img 
            src="/indiamart-logo.png" 
            alt="IndiaMART Logo" 
            className="h-10 w-auto opacity-90"
          />
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">IMartRocks</span>
            <span className="text-[8px] font-bold text-slate-300 tracking-[0.5em] uppercase">PRESENTS</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none">
            <span className="text-[#002F52]">IndiaMART</span>
            <br />
            <span className="text-[#FF6A00]">PURE</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-bold uppercase tracking-[0.2em]">
            Predictive Upsell & Retention Engine
          </p>
        </div>

        {/* Description & Login */}
        <div className="max-w-md mx-auto space-y-8">
          <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
            Welcome to our hackathon innovation. Sign in with your Google account to explore the platform.
          </p>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-bold leading-relaxed"
            >
              {error}
            </motion.div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="group relative w-full bg-[#002F52] text-white py-5 px-8 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 transition-all hover:bg-[#001D33] hover:shadow-2xl hover:shadow-[#002f5233] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="pt-20">
          <p className="text-slate-300 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
            Hackathon 2026 Project by Team IMartRocks
          </p>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF6A00] to-transparent opacity-20" />
      <div className="fixed bottom-0 right-0 p-12 opacity-5 pointer-events-none">
        <BrainCircuit size={300} strokeWidth={0.5} />
      </div>
    </div>
  );
};
