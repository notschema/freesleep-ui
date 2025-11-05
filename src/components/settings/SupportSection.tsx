import { MessageCircle, Heart, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import SettingSection from './SettingSection';

export default function SupportSection() {
  const [copied, setCopied] = useState(false);
  const walletAddress = 'bc1qjapkufh65gs68v2mkvrzq2ney3vnvv87jdxxg6';

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SettingSection title="Support & Feature Requests">
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white mb-1">Join the Community</h4>
              <p className="text-xs text-gray-400 mb-3">
                Get support, share feedback, and connect with other users on Discord
              </p>
              <button
                onClick={() => window.open('https://discord.gg/your-discord', '_blank')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-lg text-blue-400 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Join Discord
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white mb-1">Support Development</h4>
              <p className="text-xs text-gray-400 mb-3">
                Enjoying the app? Support continued development with a contribution
              </p>
              <div className="flex items-center gap-2 p-3 bg-black/30 rounded-lg border border-neutral-700/50">
                <code className="flex-1 text-xs text-gray-300 font-mono overflow-x-auto">
                  {walletAddress}
                </code>
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 p-2 hover:bg-neutral-700/50 rounded transition-colors"
                  title="Copy address"
                >
                  {copied ? (
                    <span className="text-xs text-emerald-400 font-semibold">Copied!</span>
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SettingSection>
  );
}
