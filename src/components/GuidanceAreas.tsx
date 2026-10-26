import React, { useState } from 'react';
import { GUIDANCE_PROGRAMS } from '../data/bkData';
import { GuidanceProgram, GuidanceArea } from '../types';
import { User, Users, GraduationCap, Compass, ArrowRight, CheckCircle2, CalendarPlus, X } from 'lucide-react';

interface GuidanceAreasProps {
  onSelectAreaForBooking: (area: GuidanceArea) => void;
}

export const GuidanceAreas: React.FC<GuidanceAreasProps> = ({ onSelectAreaForBooking }) => {
  const [selectedProgram, setSelectedProgram] = useState<GuidanceProgram | null>(null);

  const getAreaMeta = (area: GuidanceArea) => {
    switch (area) {
      case 'pribadi':
        return {
          icon: User,
          badgeBg: 'bg-[#EFF3F0] text-[#345241] border-[#c1c8c3]/40',
          accentBorder: 'border-t-[#608066]',
          label: 'Bimbingan Pribadi',
        };
      case 'sosial':
        return {
          icon: Users,
          badgeBg: 'bg-[#E7EFEB] text-[#2D4A3E] border-[#c5e9ca]/60',
          accentBorder: 'border-t-[#46654d]',
          label: 'Bimbingan Sosial',
        };
      case 'belajar':
        return {
          icon: GraduationCap,
          badgeBg: 'bg-[#FAF4E6] text-[#7D5F18] border-[#ffdf99]/60',
          accentBorder: 'border-t-[#C29B38]',
          label: 'Bimbingan Belajar',
        };
      case 'karir':
        return {
          icon: Compass,
          badgeBg: 'bg-[#E5EDE7] text-[#2A4839] border-[#adcebe]/60',
          accentBorder: 'border-t-[#2D4A3E]',
          label: 'Bimbingan Karir',
        };
    }
  };

  return (
    <section id="layanan" className="py-12 md:py-16 bg-[#FAF9F5] border-y border-[#E5ECE6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#608066] mb-2">
              <span>Kurikulum Merdeka</span>
              <span aria-hidden="true">·</span>
              <span>4 Pilar BK Komprehensif</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#163328]">
              Empat Bidang Layanan Bimbingan & Konseling
            </h2>
            <p className="text-sm sm:text-base text-[#4F5E56] mt-2 max-w-2xl font-normal">
              Dirancang untuk memfasilitasi kemandirian, kematangan emosi, prestasi akademik, dan perencanaan karir jangka panjang siswa SMA Muhammadiyah 1 Palangkaraya.
            </p>
          </div>
          <div className="text-xs text-[#727974] hidden md:block">
            <span>Klik kartu untuk melihat rincian silabus & topik</span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUIDANCE_PROGRAMS.map((prog) => {
            const meta = getAreaMeta(prog.area);
            const Icon = meta.icon;

            return (
              <div
                key={prog.id}
                className={`bg-white rounded-2xl border border-[#E5ECE6] border-t-4 ${meta.accentBorder} p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 group`}
              >
                <div>
                  {/* Category chip & icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full border shadow-2xs ${meta.badgeBg}`}
                    >
                      {meta.label}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] text-[#2D4A3E] flex items-center justify-center border border-[#E5ECE6] group-hover:scale-110 group-hover:bg-[#2D4A3E] group-hover:text-white transition-all duration-300 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-base font-bold text-[#163328] mb-2 leading-snug group-hover:text-[#2D4A3E] transition-colors">
                    {prog.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-[#4F5E56] leading-relaxed mb-4">
                    {prog.shortDesc}
                  </p>

                  {/* Sample topics list */}
                  <div className="space-y-2 pt-3 border-t border-[#E5ECE6]">
                    <span className="text-[11px] font-bold text-[#727974] uppercase tracking-wider block">
                      Fokus Materi:
                    </span>
                    {prog.topics.slice(0, 2).map((topic, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#1A2821] bg-[#FAF9F5] px-2.5 py-1.5 rounded-lg border border-[#E5ECE6]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D4A3E] shrink-0" />
                        <span className="truncate font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-[#E5ECE6] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProgram(prog)}
                    className="text-xs font-bold text-[#2D4A3E] hover:text-[#163328] hover:underline cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Rincian Layanan</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => onSelectAreaForBooking(prog.area)}
                    className="p-2 rounded-lg text-[#2D4A3E] bg-[#EBF2EC] hover:bg-[#2D4A3E] hover:text-white transition-all duration-200 cursor-pointer shadow-2xs"
                    title="Jadwalkan sesi bimbingan ini"
                  >
                    <CalendarPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Photography rest section featuring students in counseling */}
        <div className="mt-12 bg-white rounded-2xl border border-[#E5ECE6] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-xs">
          <div className="lg:col-span-5 h-64 lg:h-auto relative overflow-hidden bg-[#EBF2EC]">
            <img
              src="/src/assets/images/students_study_counseling_1793004693229.jpg"
              alt="Diskusi bimbingan kelompok siswa SMA Muhammadiyah 1"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#608066] mb-1">
              Pendekatan Humanis & Edukatif
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#163328] mb-3">
              Bimbingan Kelompok & Mediasi Sebaya
            </h3>
            <p className="text-sm text-[#4F5E56] leading-relaxed mb-4">
              Selain sesi individual empat mata, kami secara berkala mengadakan forum bimbingan kelompok tematik. Siswa saling menguatkan, berlatih memecahkan masalah bersama, dan menciptakan iklim madrasah yang bebas dari perundungan maupun diskriminasi sosial.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-xs text-[#1A2821]">
                <strong className="block text-sm font-bold text-[#2D4A3E]">RPL Terpadu</strong>
                Tersinkronisasi dengan Capaian Pembelajaran Kurikulum Merdeka Fase E & F.
              </div>
              <div className="text-xs text-[#1A2821]">
                <strong className="block text-sm font-bold text-[#2D4A3E]">Keterlibatan Wali</strong>
                Laporan perkembangan non-akademik yang berkala untuk orang tua siswa.
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F362D]/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E5ECE6] max-w-lg w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-semibold text-[#608066] uppercase tracking-wider">
                  Silabus Bimbingan
                </span>
                <h3 className="text-xl font-bold text-[#163328] mt-0.5">
                  {selectedProgram.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProgram(null)}
                className="p-1.5 text-[#727974] hover:text-[#163328] hover:bg-[#fbf9f3] rounded-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#4F5E56] leading-relaxed mb-5">
              {selectedProgram.description}
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-bold text-[#163328] uppercase tracking-wider mb-2">
                  Tujuan Capaian Layanan:
                </h4>
                <ul className="space-y-1.5">
                  {selectedProgram.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#4F5E56]">
                      <CheckCircle2 className="w-4 h-4 text-[#2D4A3E] shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#163328] uppercase tracking-wider mb-2">
                  Daftar Topik & Modul Tersedia:
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {selectedProgram.topics.map((top, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-[#FAF9F5] border border-[#E5ECE6] rounded-md text-xs text-[#1A2821] flex items-center gap-2"
                    >
                      <span className="text-[11px] font-mono text-[#727974]">{i + 1}.</span>
                      <span>{top}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-[#E5ECE6]">
                <div>
                  <span className="text-[#727974] block">Sasaran:</span>
                  <span className="font-semibold text-[#1A2821]">{selectedProgram.targetClass}</span>
                </div>
                <div>
                  <span className="text-[#727974] block">Durasi Sesi:</span>
                  <span className="font-semibold text-[#1A2821]">{selectedProgram.duration}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5ECE6]">
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-4 py-2 text-xs font-semibold text-[#4F5E56] hover:text-[#163328] cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  const area = selectedProgram.area;
                  setSelectedProgram(null);
                  onSelectAreaForBooking(area);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Jadwalkan Konsultasi Sesi Ini</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
