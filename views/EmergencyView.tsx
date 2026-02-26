
import React from 'react';
import { EmergencyRule } from '../types';

interface EmergencyViewProps {
  rule: EmergencyRule;
  setRule: React.Dispatch<React.SetStateAction<EmergencyRule>>;
  t: any;
}

const EmergencyView: React.FC<EmergencyViewProps> = ({ rule, setRule, t }) => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">{t.emergencyRuleTitle}</h2>
        <p className="text-slate-500">{t.ruleDesc}</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-1">{t.inactivityLabel}</h3>
              <p className="text-slate-500 text-sm">How long should the app wait before notifying nominees?</p>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="7" 
                max="365" 
                value={rule.inactivityDays}
                onChange={e => setRule({...rule, inactivityDays: parseInt(e.target.value)})}
                className="w-48 h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-2xl font-bold text-blue-600 w-20 text-right">{rule.inactivityDays}d</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-1">{t.deathProofLabel}</h3>
              <p className="text-slate-500 text-sm">Nominees must upload official documentation to gain full access.</p>
            </div>
            <button 
              onClick={() => setRule({...rule, requireDeathProof: !rule.requireDeathProof})}
              className={`w-14 h-8 rounded-full transition-colors relative ${rule.requireDeathProof ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${rule.requireDeathProof ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 flex gap-4">
          <span className="text-2xl">💡</span>
          <p className="text-sm text-yellow-800">
            <strong>Pro Tip:</strong> We recommend setting this to 30 days. This gives you enough time to check-in if you lose access to your phone temporarily.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 text-white">
        <h3 className="text-xl font-bold mb-4">How it works</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-blue-400 border border-slate-700">1</div>
            <div>
              <p className="font-medium">Inactivity Monitor</p>
              <p className="text-slate-400 text-sm">The system tracks your last login/interaction.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-blue-400 border border-slate-700">2</div>
            <div>
              <p className="font-medium">Trigger Alert</p>
              <p className="text-slate-400 text-sm">After {rule.inactivityDays} days, we send SMS/Email alerts to you first.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-blue-400 border border-slate-700">3</div>
            <div>
              <p className="font-medium">Nominee Access</p>
              <p className="text-slate-400 text-sm">If no response, nominees are invited {rule.requireDeathProof ? 'to upload proof' : 'to view records'}.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyView;
