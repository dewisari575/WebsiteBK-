import React from 'react';
import { COUNSELOR_INFO } from '../data/bkData';
import { ShieldCheck, MapPin, Mail, Phone, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#163328] text-white pt-12 pb-8 border-t border-[#2D4A3E]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#2D4A3E]">
          
          {/* Col 1: Institutional Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C29B38]/60 bg-white p-0.5 shrink-0 shadow-xs">
                <img
                  src={COUNSELOR_INFO.schoolLogoUrl}
                  alt="Logo SMA Muhammadiyah 1 Palangkaraya"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                  Unit Bimbingan dan Konseling (BK)
                </h3>
                <p className="text-xs text-[#99b9a9] font-medium leading-tight">
                  SMA Muhammadiyah 1 Palangkaraya
                </p>
              </div>
            </div>
            <p className="text-xs text-[#adcebe] leading-relaxed max-w-sm">
              Mewujudkan layanan bimbingan konseling yang inklusif, memuliakan fitrah peserta didik, dan menumbuhkan karakter berakhlak mulia berlandaskan nilai Islam berkemajuan dan Kurikulum Merdeka.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-[#d5ac48]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Menjunjung Tinggi Asas Kerahasiaan Konseling (Kode Etik ABKIN)</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#99b9a9]">
              Navigasi Layanan
            </h4>
            <ul className="space-y-2 text-xs text-[#adcebe]">
              <li>
                <a href="#layanan" className="hover:text-white transition-colors">4 Bidang Layanan BK</a>
              </li>
              <li>
                <a href="#asesmen" className="hover:text-white transition-colors">Asesmen AkuPintar (AKPD & Minat)</a>
              </li>
              <li>
                <a href="#jadwal" className="hover:text-white transition-colors">Jadwal & Reservasi Konseling</a>
              </li>
              <li>
                <a href="#suara-siswa" className="hover:text-white transition-colors">Suara Sahabat Siswa</a>
              </li>
              <li>
                <a href="#jurnal" className="hover:text-white transition-colors">Jurnal Refleksi Siswa</a>
              </li>
              <li>
                <a href="#rpl" className="hover:text-white transition-colors">Portofolio RPL & Home Visit</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Office */}
          <div className="md:col-span-4 space-y-3 text-xs text-[#adcebe]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#99b9a9]">
              Kontak & Lokasi Ruang BK
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#99b9a9] shrink-0 mt-0.5" />
              <span>{COUNSELOR_INFO.office}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
              <a
                href={COUNSELOR_INFO.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-white hover:underline font-bold"
              >
                Hotline / WA: {COUNSELOR_INFO.phoneHotline}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#99b9a9] shrink-0" />
              <span className="font-mono text-white">{COUNSELOR_INFO.contactEmail}</span>
            </div>
            <div className="pt-2 border-t border-[#2D4A3E] text-[11px] text-[#99b9a9] space-y-0.5">
              <p>Guru BK: {COUNSELOR_INFO.name} (NIP. {COUNSELOR_INFO.nip})</p>
              <p>Kepala Sekolah: {COUNSELOR_INFO.principal.name} (NIP. {COUNSELOR_INFO.principal.nip})</p>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#727974] gap-3">
          <p>
            © {new Date().getFullYear()} Unit Bimbingan dan Konseling SMA Muhammadiyah 1 Palangkaraya. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Kurikulum Merdeka</span>
            <span aria-hidden="true">·</span>
            <span>Aplikasi AkuPintar</span>
            <span aria-hidden="true">·</span>
            <span>Kode Etik ABKIN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
