import React from 'react';
import { COUNSELOR_INFO } from '../data/bkData';
import { Award, Mail, Phone, MapPin, Clock, MessageCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

interface CounselorProfileProps {
  onOpenBooking: () => void;
}

export const CounselorProfile: React.FC<CounselorProfileProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#608066] uppercase tracking-wider mb-2">
            <Award className="w-4 h-4 text-[#2D4A3E]" />
            <span>Profil Guru Bimbingan & Konseling</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#163328]">
            Mengenal Ibu Dewi Kumala Sari, S.Pd.
          </h2>
          <p className="text-sm sm:text-base text-[#4F5E56] mt-2 font-normal">
            Dedikasi profesional mendampingi masa transisi remaja, penguatan karakter Islami, dan pencapaian prestasi siswa SMA Muhammadiyah 1 Palangkaraya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Counselor Profile Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E5ECE6] overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              {/* Dual tone top banner */}
              <div className="bg-[#FAF9F5] p-6 sm:p-7 border-b border-[#E5ECE6] flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="w-28 h-28 rounded-xl overflow-hidden border-2 border-white shadow-xs shrink-0 bg-[#EBF2EC]">
                  <img
                    src={COUNSELOR_INFO.photoUrl}
                    alt="Ibu Dewi Kumala Sari, S.Pd."
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6E5517] bg-[#FCF9EE] border border-[#C29B38]/40 px-2.5 py-0.5 rounded-full mb-1.5">
                    <Award className="w-3 h-3 text-[#C29B38]" />
                    <span>PPG Guru BK Bersertifikat</span>
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#163328]">
                    {COUNSELOR_INFO.name}
                  </h3>
                  <p className="text-xs font-medium text-[#608066]">
                    {COUNSELOR_INFO.title}
                  </p>
                  <p className="text-[11px] text-[#727974] mt-0.5 font-mono">
                    NIP: {COUNSELOR_INFO.nip}
                  </p>
                </div>
              </div>

              {/* Profile Details List */}
              <div className="p-6 sm:p-7 space-y-4 text-xs sm:text-sm text-[#4F5E56]">
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D4A3E] shrink-0 mt-0.5" />
                    <span><strong>Pendidikan:</strong> {COUNSELOR_INFO.education}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D4A3E] shrink-0 mt-0.5" />
                    <span><strong>Organisasi Profesi:</strong> {COUNSELOR_INFO.organization}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D4A3E] shrink-0 mt-0.5" />
                    <span><strong>Kepala Sekolah:</strong> {COUNSELOR_INFO.principal.name} (NIP. {COUNSELOR_INFO.principal.nip})</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D4A3E] shrink-0 mt-0.5" />
                    <span><strong>Keahlian Layanan:</strong> Penelusuran Asesmen AkuPintar, Pemilihan Mapel Fase F, Sosiometri & Home Visit.</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5ECE6] space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#608066] shrink-0" />
                    <span>{COUNSELOR_INFO.office}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#608066] shrink-0" />
                    <span>{COUNSELOR_INFO.consultationHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                    <a
                      href={COUNSELOR_INFO.waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[#2D4A3E] hover:underline font-bold"
                    >
                      WA: {COUNSELOR_INFO.phoneHotline}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#608066] shrink-0" />
                    <span className="font-mono text-[#1A2821]">{COUNSELOR_INFO.contactEmail}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom action */}
            <div className="p-6 sm:p-7 pt-0 flex flex-col sm:flex-row gap-2">
              <button
                onClick={onOpenBooking}
                className="flex-1 py-3 text-xs sm:text-sm font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Jadwalkan Konsultasi</span>
              </button>
              <a
                href={COUNSELOR_INFO.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-xs sm:text-sm font-semibold text-[#163328] bg-[#EBF2EC] hover:bg-[#DDE8DE] border border-[#CFDED1] rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat WA</span>
              </a>
            </div>
          </div>

          {/* Right Column: Ruang BK Interior & Crisis Protocol */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Counseling Room Interior Image Card */}
            <div className="bg-white rounded-2xl border border-[#E5ECE6] overflow-hidden shadow-xs flex-1 flex flex-col">
              <div className="h-60 sm:h-72 relative bg-[#EBF2EC] overflow-hidden">
                <img
                  src="/src/assets/images/counseling_room_interior_1793004692283.jpg"
                  alt="Suasana Ruang Bimbingan dan Konseling SMA Muhammadiyah 1 Palangkaraya"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-[#163328]/85 text-white text-[11px] px-3 py-1 rounded-md backdrop-blur-xs">
                  Ruang BK SMA Muhammadiyah 1 Palangkaraya
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-base sm:text-lg font-bold text-[#163328] mb-1.5">
                  Fasilitas Konseling yang Tenang, Sejuk, dan Nyaman
                </h3>
                <p className="text-xs sm:text-sm text-[#4F5E56] leading-relaxed mb-4">
                  Ruang BK dirancang dengan sentuhan biofilik dan tata ruang yang menjamin privasi visual maupun akustik. Dilengkapi sudut asesmen digital AkuPintar, sofa konseling individual yang tenang, dan ruang mediasi kelompok ramah remaja.
                </p>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E5ECE6]">
                  <span className="text-[11px] font-semibold text-[#2D4A3E] bg-[#EBF2EC] px-2.5 py-1 rounded-lg border border-[#CFDED1]">
                    🌿 Tanaman Biofilik & Udara Sejuk
                  </span>
                  <span className="text-[11px] font-semibold text-[#7D5F18] bg-[#FCF9EE] px-2.5 py-1 rounded-lg border border-[#C29B38]/30">
                    🛋️ Sofa Konseling Privat
                  </span>
                  <span className="text-[11px] font-semibold text-[#163328] bg-white px-2.5 py-1 rounded-lg border border-[#D6E0D8]">
                    💻 Sudut Asesmen Digital AkuPintar
                  </span>
                </div>
              </div>
            </div>

            {/* Crisis / Emergency Assistance Hotline Box */}
            <div className="bg-[#FAF9F5] border border-[#E5ECE6] rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#93000a] flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-[#ba1a1a]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#163328]">
                  Layanan Bantuan Mendesak & Pos Bimbingan Siaga (Crisis Hotline)
                </h4>
                <p className="text-xs text-[#4F5E56] mt-0.5 leading-relaxed">
                  Jika kamu atau temanmu mengalami tekanan mental yang sangat berat, perundungan berbahaya, atau situasi darurat keselamatan, segera hubungi Guru BK:
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs">
                  <a
                    href={COUNSELOR_INFO.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-bold text-white bg-[#25D366] hover:bg-[#20ba59] px-3.5 py-1.5 rounded-md transition-colors shadow-2xs"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>WhatsApp BK: {COUNSELOR_INFO.phoneHotline}</span>
                  </a>
                  <span className="text-[#727974]">Respon tanggap darurat untuk seluruh siswa</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
