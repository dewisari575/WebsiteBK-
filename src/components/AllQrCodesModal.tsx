import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Printer, QrCode, Smartphone, Sparkles } from 'lucide-react';
import { ASSESSMENT_TOOLS, COUNSELOR_INFO } from '../data/bkData';

interface AllQrCodesModalProps {
  onClose: () => void;
}

export const AllQrCodesModal: React.FC<AllQrCodesModalProps> = ({ onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1F362D]/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-[#E5ECE6] my-6 max-h-[92vh] overflow-y-auto">
        
        {/* Top bar (no print) */}
        <div className="no-print flex items-center justify-between pb-4 mb-6 border-b border-[#E5ECE6]">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#2D4A3E]" />
            <div>
              <h3 className="text-base font-bold text-[#163328]">
                Lembar Cetak QR Code Seluruh Asesmen BK
              </h3>
              <p className="text-xs text-[#727974]">
                Format poster A4 / pamflet kelas untuk dipindai oleh peserta didik
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#c9ead9]" />
              <span>Cetak Poster 4 QR Code</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#727974] hover:text-[#163328] hover:bg-[#FAF9F5] rounded-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Poster Canvas */}
        <div className="print-content text-center">
          
          {/* Header Poster */}
          <div className="border-b-2 border-[#2D4A3E] pb-4 mb-6">
            <div className="text-xs font-bold uppercase tracking-widest text-[#608066]">
              Pimpinan Daerah Muhammadiyah Kota Palangka Raya · Majelis Dikdasmen
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-[#163328] mt-1">
              SMA Muhammadiyah 1 Palangkaraya
            </h2>
            <p className="text-xs font-semibold text-[#6E5517]">
              Unit Bimbingan dan Konseling (BK) · Asesmen Diagnostik Siswa Kurikulum Merdeka
            </p>
            <p className="text-[11px] text-[#727974] mt-0.5">
              Guru BK: {COUNSELOR_INFO.name} ({COUNSELOR_INFO.organization}) · Hotline WA: {COUNSELOR_INFO.phoneHotline}
            </p>
          </div>

          {/* Subtitle instructions */}
          <div className="mb-6 p-3 bg-[#FAF9F5] rounded-xl border border-[#E5ECE6] max-w-xl mx-auto flex items-center justify-center gap-2 text-xs font-semibold text-[#163328]">
            <Smartphone className="w-4 h-4 text-[#2D4A3E]" />
            <span>Pindai QR Code di bawah menggunakan kamera HP untuk langsung mengisi asesmen</span>
          </div>

          {/* 4 QR Codes Grid (2x2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {ASSESSMENT_TOOLS.map((tool, idx) => (
              <div
                key={tool.id}
                className="p-5 bg-white rounded-2xl border-2 border-[#E5ECE6] flex flex-col items-center text-center shadow-xs"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#608066] mb-1">
                  Instrumen 0{idx + 1}
                </span>
                <h4 className="text-sm font-bold text-[#163328] mb-1">
                  {tool.title}
                </h4>
                <p className="text-[11px] text-[#727974] mb-3 line-clamp-1">
                  {tool.desc}
                </p>

                {/* QR Code Box */}
                <div className="p-3.5 bg-white rounded-xl border-2 border-[#2D4A3E] shadow-2xs mb-3 inline-block">
                  <QRCodeSVG
                    value={tool.testFormUrl}
                    size={135}
                    level="H"
                    fgColor="#163328"
                    bgColor="#ffffff"
                  />
                </div>

                <span className="text-[10px] font-mono font-medium text-[#2D4A3E] bg-[#EBF2EC] px-2 py-0.5 rounded truncate max-w-xs block">
                  {tool.testFormUrl}
                </span>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-4 border-t border-[#E5ECE6] text-[11px] text-[#727974] flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© Unit BK SMA Muhammadiyah 1 Palangkaraya · Seluruh hak cipta dilindungi</span>
            <span>Asas Kerahasiaan ABKIN & Permendikbudristek No. 111/2014</span>
          </div>

        </div>

      </div>
    </div>
  );
};
