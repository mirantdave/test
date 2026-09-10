import React, { useState, useEffect } from 'react';
import { Wifi, X, Copy, Check, Smartphone, Tablet, Monitor, ExternalLink, QrCode } from 'lucide-react';
import QRCode from 'qrcode';

interface WifiTestingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WifiTestingModal: React.FC<WifiTestingModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [qrSvg, setQrSvg] = useState<string>('');
  const localIp = '192.168.6.167';
  const port = '5173';
  const testUrl = `http://${localIp}:${port}`;

  useEffect(() => {
    if (isOpen) {
      QRCode.toString(testUrl, {
        type: 'svg',
        color: {
          dark: '#38bdf8',
          light: '#0b1329'
        },
        margin: 2,
        width: 220
      }).then(svg => {
        setQrSvg(svg);
      }).catch(err => {
        console.error("QR generation error:", err);
      });
    }
  }, [isOpen, testUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(testUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg glass-panel-glow rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl text-slate-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700/60 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-sky-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Wifi className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                Live Wi-Fi Testing Hub
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                  Active LAN Broadcast
                </span>
              </h3>
              <p className="text-xs text-slate-400">Anyone connected to this hospital Wi-Fi can test</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="p-3 bg-[#0b1329] rounded-xl border border-cyan-500/40 shadow-lg mb-3">
              {qrSvg ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: qrSvg }} 
                  className="w-[200px] h-[200px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                />
              ) : (
                <div className="w-[200px] h-[200px] flex items-center justify-center text-cyan-400">
                  <QrCode className="w-16 h-16 animate-spin" />
                </div>
              )}
            </div>

            <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5" /> Scan with iPhone / Android Camera
            </span>
            <p className="text-xs text-slate-400 mt-1">Instant mobile spine care clinical workstation</p>
          </div>

          {/* Direct Address */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Direct Browser Network URL
            </label>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80">
              <code className="flex-1 font-mono text-sm text-cyan-400 select-all px-2">
                {testUrl}
              </code>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition active:scale-95 shadow-md shadow-cyan-600/20"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
              <a
                href={testUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Instructions */}
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2 text-xs text-slate-300">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-cyan-400" />
              Testing Instructions for Stavya Team:
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Ensure your smartphone or tablet is connected to this same Wi-Fi network.</li>
              <li>Open your camera or mobile browser (Safari, Chrome) and scan the QR code or enter <strong className="text-cyan-300">{testUrl}</strong>.</li>
              <li>Test real-time patient switching, log-rolling, WHO checklists, and bedside patient portal view.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span>Stavya Spine Intelligence Ecosystem (SSIE)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
