import React from 'react';
import { ShieldCheck, CalendarCheck, ArrowRight, MapPin, Clock, Award, BookOpen, MessageCircle, Sparkles } from 'lucide-react';
import { COUNSELOR_INFO } from '../data/bkData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExplorePrograms: () => void;
  onViewRpl: () => void;
  onExploreAssessment: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onExplorePrograms,
  onViewRpl,
  onExploreAssessment,
}) => {
  return (
    <section id="beranda" className="relative pt-6 pb-16 md:py-16 overflow-hidden bg-gradient-to-b from-[#F5F2EA]/60 via-[#FBF9F3] to-[#FAF9F5]">
      {/* Ambient background soft light glows */}
      <div className="absolute top-0 right-1/4 w-[480px] h-[480px] bg-[#2D4A3E]/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/4 left-10 w-[360px] h-[360px] bg-[#C29B38]/6 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split-Screen Hero: 2-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Live Status Beacon & Accreditation */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-[#CFDED1] rounded-full text-xs font-semibold text-[#163328] shadow-2xs backdrop-blur-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Layanan Konseling Aktif · 07.00 - 15.00 WIB</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/90 border border-[#C29B38]/50 rounded-full text-xs font-semibold text-[#6E5517] shadow-2xs">
                <img
                  src={COUNSELOR_INFO.schoolLogoUrl}
                  alt="Akreditasi A"
                  className="w-4 h-4 rounded-full object-contain"
                />
                <span>Terakreditasi A</span>
              </div>
              <span className="text-xs text-[#727974] hidden sm:inline">·</span>
              <span className="text-xs font-semibold text-[#C29B38] hidden sm:inline">
                Majelis Dikdasmen PDM Kota Palangka Raya
              </span>
            </div>

            {/* Clean unboxed kicker with separator */}
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-semibold tracking-wide text-[#608066] uppercase mb-4">
              <span>Kurikulum Merdeka</span>
              <span aria-hidden="true">·</span>
              <span>Layanan BK Profesional</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#C29B38]">SMA Muhammadiyah 1</span>
            </div>

            {/* Headline with text-wrap balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-[#163328] leading-[1.18] mb-5 [text-wrap:balance]">
              Ruang Aman Menemukan Arah, Merawat Potensi, dan Meraih Cita-Cita.
            </h1>

            {/* Subtitle / Lead copy */}
            <p className="text-base sm:text-lg text-[#4F5E56] leading-relaxed mb-8 max-w-2xl font-normal">
              Selamat datang di Unit Bimbingan dan Konseling SMA Muhammadiyah 1 Palangkaraya bersama <strong>Ibu Dewi Kumala Sari, S.Pd.</strong> Kami hadir sebagai mitra tumbuh kembang siswa yang bersahabat, terpercaya, dan menjunjung tinggi kode etik kerahasiaan konseling.
            </p>

            {/* Primary, Secondary, & WhatsApp Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#2D4A3E] to-[#1F362D] hover:from-[#1F362D] hover:to-[#162720] rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap shrink-0 group transform hover:-translate-y-0.5"
              >
                <CalendarCheck className="w-4 h-4 text-[#C29B38] group-hover:scale-110 transition-transform" />
                <span>Jadwalkan Konseling</span>
                <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreAssessment}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#2D4A3E] bg-[#EBF2EC] hover:bg-[#DDE8DE] border border-[#CFDED1] rounded-xl transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 hover:shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-[#C29B38]" />
                <span>Asesmen AkuPintar</span>
              </button>

              <a
                href={COUNSELOR_INFO.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-[#163328] bg-white hover:bg-[#FAF9F5] border border-[#D6E0D8] rounded-xl transition-all duration-150 shadow-2xs hover:shadow-xs whitespace-nowrap shrink-0"
                title="Chat WhatsApp Konseling BK"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WA: {COUNSELOR_INFO.phoneHotline}</span>
              </a>
            </div>

            {/* Confidentiality seal teaser with polished card styling */}
            <div className="flex items-center gap-3.5 py-3.5 px-4 bg-white/90 border border-[#E5ECE6] rounded-xl max-w-xl shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-[#EBF2EC] text-[#2D4A3E] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#2D4A3E]" />
              </div>
              <p className="text-xs sm:text-sm text-[#4F5E56] leading-snug">
                <strong className="text-[#163328]">Asas Kerahasiaan Terjamin:</strong> Setiap percakapan, identitas, dan hasil asesmen siswa dilindungi kode etik resmi konselor ABKIN & Permendikbud No. 111/2014.
              </p>
            </div>
          </div>

          {/* Right Column: Counselor Profile Dossier Card with User's Uploaded Portrait */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white rounded-2xl border border-[#E5ECE6] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full ring-1 ring-[#C29B38]/20">
              
              {/* Dual-tone header banner with Counselor Image */}
              <div className="relative bg-gradient-to-br from-[#FAF8F2] to-[#F3EFE6] p-6 pb-5 border-b border-[#E5ECE6] flex flex-col items-center sm:items-start sm:flex-row gap-5">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0 bg-[#EBF2EC] ring-2 ring-[#C29B38]/40 ring-offset-2">
                  <img
                    src={COUNSELOR_INFO.photoUrl}
                    alt="Ibu Dewi Kumala Sari, S.Pd. - Guru BK SMA Muhammadiyah 1 Palangkaraya"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-1 right-1 bg-[#2D4A3E] text-white p-1 rounded-full shadow-xs" title="PPG Terverifikasi">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C29B38]" />
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left pb-1">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#6E5517] bg-[#FCF9EE] border border-[#C29B38]/50 px-2.5 py-0.5 rounded-full mb-2 shadow-2xs">
                    <Award className="w-3.5 h-3.5 text-[#C29B38]" />
                    <span>Guru BK PPG Bersertifikat</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#163328] tracking-tight">
                    {COUNSELOR_INFO.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#608066] mt-0.5">
                    {COUNSELOR_INFO.title}
                  </p>
                  <p className="text-[11px] text-[#727974] font-mono mt-0.5">
                    NIP: {COUNSELOR_INFO.nip} · {COUNSELOR_INFO.organization}
                  </p>
                </div>
              </div>

              {/* Dossier Contact & Institutional Specifications */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3 text-xs sm:text-sm text-[#4F5E56]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EBF2EC] text-[#2D4A3E] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-[#2D4A3E]" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#1A2821] block">Lokasi Pelayanan:</span>
                      <span>{COUNSELOR_INFO.office}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF4E6] text-[#7D5F18] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-[#C29B38]" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#1A2821] block">Jam Pelayanan BK:</span>
                      <span>{COUNSELOR_INFO.consultationHours}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E7F6EC] text-[#1E7E34] flex items-center justify-center shrink-0 mt-0.5">
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#1A2821] block">Hotline Konseling / WA:</span>
                      <a
                        href={COUNSELOR_INFO.waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[#2D4A3E] hover:underline font-bold text-sm"
                      >
                        {COUNSELOR_INFO.phoneHotline}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Counselor Motto Quote */}
                <div className="pt-2 border-t border-[#E5ECE6]">
                  <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#E5ECE6] flex items-start gap-2.5">
                    <span className="text-xl text-[#C29B38] font-serif leading-none shrink-0">“</span>
                    <p className="text-xs italic text-[#4F5E56] leading-relaxed">
                      {COUNSELOR_INFO.motto}
                    </p>
                  </div>
                </div>

                {/* Quick Profile Footer Link */}
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-[#727974]">{COUNSELOR_INFO.education}</span>
                  <button
                    onClick={onViewRpl}
                    className="text-xs font-bold text-[#2D4A3E] hover:underline cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Lihat Portofolio RPL</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 4-Column KPI / Metric Strip with elevated card visuals */}
        <div className="mt-14 pt-8 border-t border-[#E5ECE6] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-[#E5ECE6] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#163328] font-mono tabular-nums">
                450+
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#EBF2EC] text-[#2D4A3E] flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#2D4A3E]" />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#608066]">
                Siswa Terdampingi
              </p>
              <p className="text-[11px] text-[#727974] mt-0.5">
                Kelas X, XI, & XII Fase E/F
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5ECE6] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#2D4A3E] font-mono tabular-nums">
                100%
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#EBF2EC] text-[#2D4A3E] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-[#2D4A3E]" />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#608066]">
                Asas Kerahasiaan
              </p>
              <p className="text-[11px] text-[#727974] mt-0.5">
                Standar Kode Etik ABKIN
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5ECE6] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#163328] font-mono tabular-nums">
                4 Asesmen
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#FCF9EE] text-[#C29B38] flex items-center justify-center border border-[#C29B38]/30">
                <Sparkles className="w-4 h-4 text-[#C29B38]" />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#608066]">
                Aplikasi AkuPintar
              </p>
              <p className="text-[11px] text-[#727974] mt-0.5">
                AKPD, Minat Bakat, Sosiometri, VAK
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5ECE6] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#C29B38] font-mono tabular-nums">
                94.6%
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#FAF4E6] text-[#C29B38] flex items-center justify-center">
                <Award className="w-4 h-4 text-[#C29B38]" />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#608066]">
                Ketercapaian RPL BK
              </p>
              <p className="text-[11px] text-[#727974] mt-0.5">
                Evaluasi Mutu Kurikulum Merdeka
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
