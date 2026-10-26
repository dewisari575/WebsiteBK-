import React, { useState } from 'react';
import { Lock, ChevronDown, ChevronUp, CheckCircle, HeartHandshake, Shield, BookOpen, UserCheck, Scale, Award } from 'lucide-react';
import { KODE_ETIK_ABKIN } from '../data/bkData';

export const ConfidentialitySeal: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'asas' | 'hak'>('asas');

  const getPrincipleIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Shield className="w-4 h-4 text-[#2D4A3E]" />;
      case 1:
        return <HeartHandshake className="w-4 h-4 text-[#2D4A3E]" />;
      case 2:
        return <UserCheck className="w-4 h-4 text-[#2D4A3E]" />;
      case 3:
        return <CheckCircle className="w-4 h-4 text-[#2D4A3E]" />;
      case 5:
        return <Award className="w-4 h-4 text-[#C29B38]" />;
      case 6:
        return <Scale className="w-4 h-4 text-[#2D4A3E]" />;
      default:
        return <BookOpen className="w-4 h-4 text-[#2D4A3E]" />;
    }
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="bg-gradient-to-br from-[#F5F2EA] to-[#FBF9F3] border border-[#E5ECE6] rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Soft decorative background seal watermark */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#2D4A3E]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-13 h-13 rounded-2xl bg-[#2D4A3E] text-white flex items-center justify-center shrink-0 shadow-md ring-2 ring-[#C29B38]/40">
              <Lock className="w-6 h-6 text-[#C29B38]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#608066]">
                  Jaminan Keamanan & Perlindungan Siswa
                </span>
                <span className="text-xs text-[#727974]">·</span>
                <span className="text-[11px] text-[#6E5517] font-semibold bg-[#FCF9EE] border border-[#C29B38]/40 px-2.5 py-0.5 rounded-full">
                  {KODE_ETIK_ABKIN.version}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#163328] tracking-tight">
                {KODE_ETIK_ABKIN.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4F5E56] mt-1 max-w-3xl leading-relaxed">
                {KODE_ETIK_ABKIN.summary}
              </p>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="self-start sm:self-center px-4 py-2.5 text-xs font-bold text-[#163328] bg-white hover:bg-[#FAF9F5] border border-[#CFDED1] rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 whitespace-nowrap shadow-2xs hover:shadow-xs"
          >
            <span>{expanded ? 'Tutup Rincian Kode Etik' : 'Pelajari Kode Etik ABKIN'}</span>
            {expanded ? <ChevronUp className="w-4 h-4 text-[#2D4A3E]" /> : <ChevronDown className="w-4 h-4 text-[#2D4A3E]" />}
          </button>
        </div>

        {/* Expandable detailed ethics */}
        {expanded && (
          <div className="mt-7 pt-6 border-t border-[#D6E0D8] space-y-6 animate-fadeIn relative z-10">
            {/* Sub-tabs */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('asas')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'asas'
                    ? 'bg-[#2D4A3E] text-white shadow-2xs'
                    : 'bg-white text-[#4F5E56] border border-[#E5ECE6] hover:bg-[#FAF9F5]'
                }`}
              >
                9 Asas Pokok Pelayanan BK ABKIN
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('hak')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'hak'
                    ? 'bg-[#2D4A3E] text-white shadow-2xs'
                    : 'bg-white text-[#4F5E56] border border-[#E5ECE6] hover:bg-[#FAF9F5]'
                }`}
              >
                Hak & Perlindungan Siswa (Konseli)
              </button>
            </div>

            {/* TAB 1: 9 Asas ABKIN */}
            {activeTab === 'asas' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {KODE_ETIK_ABKIN.principles.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl border border-[#E5ECE6] hover:border-[#608066]/50 transition-all flex flex-col justify-between shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold text-[#608066] bg-[#EBF2EC] px-2 py-0.5 rounded">
                          ASAS {item.code}
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-[#FAF9F5] flex items-center justify-center border border-[#E5ECE6]">
                          {getPrincipleIcon(idx)}
                        </div>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#163328] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#4F5E56] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#F0EEE8] text-[10px] font-semibold text-[#727974] uppercase tracking-wider">
                      Kategori: {item.category}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: Hak & Perlindungan Siswa */}
            {activeTab === 'hak' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {KODE_ETIK_ABKIN.rights.map((right, idx) => {
                    const [title, desc] = right.split(': ');
                    return (
                      <div key={idx} className="bg-white p-4.5 rounded-xl border border-[#E5ECE6] shadow-2xs">
                        <div className="w-8 h-8 rounded-lg bg-[#EBF2EC] text-[#2D4A3E] flex items-center justify-center mb-2.5">
                          <CheckCircle className="w-4 h-4 text-[#2D4A3E]" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#163328] mb-1">
                          {title}
                        </h4>
                        <p className="text-xs text-[#4F5E56] leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-[#FCF9EE] border border-[#C29B38]/40 rounded-xl text-xs text-[#6E5517]">
                  <strong>Komitmen Etik Konselor:</strong> Layanan BK SMA Muhammadiyah 1 Palangkaraya dilaksanakan di bawah sumpah profesi konselor, senantiasa berorientasi pada kemaslahatan siswa, dan memelihara kehormatan almamater Muhammadiyah.
                </div>
              </div>
            )}

            <div className="pt-2 text-[11px] text-[#727974] flex flex-wrap items-center justify-between gap-2 border-t border-[#E5ECE6]">
              <span>Rujukan: Anggaran Dasar & Anggaran Rumah Tangga ABKIN · Permendikbud No. 111/2014</span>
              <span className="font-semibold text-[#2D4A3E]">Konselor: Dewi Kumala Sari, S.Pd. (MGBK Kalteng)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
