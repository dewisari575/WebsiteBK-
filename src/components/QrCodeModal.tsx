import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, Printer, Download, Smartphone, ExternalLink, QrCode } from 'lucide-react';
import { COUNSELOR_INFO } from '../data/bkData';

interface QrCodeModalProps {
  tool: {
    id: string;
    title: string;
    shortTitle: string;
    appSource: string;
    testFormUrl: string;
  };
  onClose: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ tool, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(tool.testFormUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      console.warn('Copy failed', e);
    }
  };

  const handlePrintQr = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F362D]/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-2xl border border-[#E5ECE6] max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-6">
        
        {/* Header (hidden in print) */}
        <div className="no-print flex items-center justify-between pb-3 mb-4 border-b border-[#E5ECE6]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF2EC] text-[#2D4A3E] flex items-center justify-center">
              <QrCode className="w-4 h-4 text-[#2D4A3E]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#163328]">
                QR Code Asesmen Siswa
              </h3>
              <span className="text-[11px] text-[#727974]">Pindai Cepat Perangkat HP</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#727974] hover:text-[#163328] hover:bg-[#FAF9F5] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable QR Card */}
        <div className="print-content bg-[#FAF9F5] p-6 rounded-2xl border border-[#E5ECE6] text-center flex flex-col items-center">
          
          {/* School Badge Tag */}
          <div className="text-[11px] font-bold text-[#608066] uppercase tracking-wider mb-1">
            SMA Muhammadiyah 1 Palangkaraya
          </div>
          
          <h4 className="text-base font-extrabold text-[#163328] mb-1">
            {tool.title}
          </h4>
          
          <p className="text-xs text-[#4F5E56] max-w-xs mb-4">
            Unit Bimbingan dan Konseling · Guru BK: {COUNSELOR_INFO.name}
          </p>

          {/* QR Code Container */}
          <div className="p-4 bg-white rounded-2xl border-2 border-[#2D4A3E] shadow-sm mb-4 inline-block">
            <QRCodeSVG
              value={tool.testFormUrl}
              size={180}
              level="H"
              fgColor="#163328"
              bgColor="#ffffff"
            />
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#163328] mb-2">
            <Smartphone className="w-4 h-4 text-[#2D4A3E]" />
            <span>Pindai menggunakan kamera HP / Google Lens</span>
          </div>

          <p className="text-[11px] text-[#727974] max-w-xs leading-relaxed">
            Peserta didik akan langsung diarahkan ke form instrumen asesmen resmi untuk pengisian mandiri.
          </p>

          {/* Link URL Preview */}
          <div className="mt-4 pt-3 border-t border-[#E5ECE6] w-full text-left">
            <span className="text-[10px] font-bold text-[#727974] uppercase tracking-wider block mb-1">
              Tautan Instrumen:
            </span>
            <div className="p-2 bg-white rounded-lg border border-[#D6E0D8] text-[11px] font-mono text-[#2D4A3E] truncate flex items-center justify-between gap-2">
              <span className="truncate">{tool.testFormUrl}</span>
              <a
                href={tool.testFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#608066] hover:text-[#2D4A3E] shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons (no-print) */}
        <div className="no-print mt-5 flex items-center justify-between gap-2">
          <button
            onClick={handleCopyLink}
            className="flex-1 py-2.5 px-3 text-xs font-semibold text-[#163328] bg-[#FAF9F5] hover:bg-[#EBF2EC] border border-[#D6E0D8] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin!' : 'Salin Tautan'}</span>
          </button>

          <button
            onClick={handlePrintQr}
            className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#c9ead9]" />
            <span>Cetak Kartu QR</span>
          </button>
        </div>

      </div>
    </div>
  );
};
