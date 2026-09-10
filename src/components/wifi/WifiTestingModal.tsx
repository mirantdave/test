import React, { useState, useEffect } from 'react';
import { Wifi, X, Copy, Check, Smartphone, Monitor, ExternalLink, QrCode } from 'lucide-react';
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
          dark: '#1d6fb8',
          light: '#ffffff'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl overflow-hidden border border-blue-200 shadow-2xl text-slate-900"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-blue-50/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 border border-blue-200 text-blue-700">
              <Wifi className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                Live Wi-Fi Testing Hub
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
                  Active LAN Broadcast
                </span>
              </h3>
              <p className="text-xs text-slate-500">Anyone connected to this hospital Wi-Fi can test</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center p-5 rounded-xl bg-slate-50 border border-slate-200 text-center relative overflow-hidden">
            <div className="p-3 bg-white rounded-2xl border border-blue-200 shadow-md mb-3">
              {qrSvg ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: qrSvg }} 
                  className="w-[200px] h-[200px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                />
              ) : (
                <div className="w-[200px] h-[200px] flex items-center justify-center text-blue-600">
                  <QrCode className="w-16 h-16 animate-spin" />
                </div>
              )}
            </div>

            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5" /> Scan with iPhone / Android Camera
            </span>
            <p className="text-xs text-slate-500 mt-1">Instant mobile spine care clinical workstation</p>
          </div>

          {/* Direct Address */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Direct Browser Network URL
            </label>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <code className="flex-1 font-mono text-sm text-blue-700 font-bold select-all px-2">
                {testUrl}
              </code>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition active:scale-95 shadow-sm shadow-blue-600/20"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
              <a
                href={testUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Instructions */}
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2 text-xs text-slate-700">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-blue-600" />
              Testing Instructions for Stavya Team:
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Ensure your smartphone or tablet is connected to this same Wi-Fi network.</li>
              <li>Open your camera or mobile browser (Safari, Chrome) and scan the QR code or enter <strong className="text-blue-700">{testUrl}</strong>.</li>
              <li>Test real-time patient switching, log-rolling, WHO checklists, and bedside patient portal view.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium">Stavya Spine Intelligence Ecosystem (SSIE)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition font-semibold shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
