import React, { useState } from 'react';
import { Menu, X, CalendarCheck } from 'lucide-react';
import { COUNSELOR_INFO } from '../data/bkData';

interface NavbarProps {
  onOpenBooking: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'layanan', label: 'Layanan BK' },
    { id: 'asesmen', label: 'Asesmen AkuPintar' },
    { id: 'jadwal', label: 'Jadwal Konseling' },
    { id: 'suara-siswa', label: 'Suara Siswa' },
    { id: 'rpl', label: 'Portofolio RPL' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f3]/95 backdrop-blur-md border-b border-[#E5ECE6] transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand title with official institutional emblem */}
        <button
          onClick={() => handleNavClick('beranda')}
          className="text-left group cursor-pointer focus:outline-none flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#C29B38]/60 bg-white shadow-xs group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center p-0.5">
            <img
              src={COUNSELOR_INFO.schoolLogoUrl}
              alt="Logo SMA Muhammadiyah 1 Palangkaraya"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base md:text-lg font-bold tracking-tight text-[#163328] whitespace-nowrap shrink-0 group-hover:text-[#2D4A3E] transition-colors leading-tight">
              BK SMA Muhammadiyah 1
            </span>
            <span className="text-[11px] text-[#608066] font-medium hidden sm:inline leading-tight">
              Palangka Raya · Dewi Kumala Sari, S.Pd.
            </span>
          </div>
        </button>

        {/* Zone 2: Clean single-line text nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4F5E56]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 focus:outline-none cursor-pointer ${
                  isActive
                    ? 'text-[#163328] font-semibold'
                    : 'hover:text-[#163328]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D4A3E] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-all duration-150 shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap shrink-0"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Jadwalkan Konseling</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#2D4A3E] hover:bg-[#EBF2EC] rounded-md transition-colors focus:outline-none"
            aria-label="Buka Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5ECE6] bg-[#fbf9f3] px-5 py-4 space-y-2 animate-fadeIn shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left py-2.5 px-3 text-sm font-medium text-[#1A2821] hover:bg-[#EBF2EC] rounded-md transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('jurnal')}
            className="block w-full text-left py-2.5 px-3 text-sm font-medium text-[#1A2821] hover:bg-[#EBF2EC] rounded-md transition-colors"
          >
            Jurnal Refleksi Siswa
          </button>
          <button
            onClick={() => handleNavClick('karir')}
            className="block w-full text-left py-2.5 px-3 text-sm font-medium text-[#1A2821] hover:bg-[#EBF2EC] rounded-md transition-colors"
          >
            Kompas Karir & Mapel Pilihan
          </button>
          <div className="pt-3 border-t border-[#E5ECE6]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Jadwalkan Konseling</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
