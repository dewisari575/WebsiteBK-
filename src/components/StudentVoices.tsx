import React, { useState, useEffect } from 'react';
import {
  MessageSquareHeart,
  Shield,
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  Lock,
  PlusCircle,
  X,
  CheckCircle2,
  Compass,
  GraduationCap,
  Users,
  User,
  Quote
} from 'lucide-react';
import { StudentTestimonial, GuidanceArea } from '../types';
import { INITIAL_STUDENT_TESTIMONIALS, SCHOOL_CLASSES } from '../data/bkData';

interface StudentVoicesProps {
  onOpenBooking?: () => void;
}

export const StudentVoices: React.FC<StudentVoicesProps> = ({ onOpenBooking }) => {
  const [testimonials, setTestimonials] = useState<StudentTestimonial[]>(INITIAL_STUDENT_TESTIMONIALS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | GuidanceArea>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // New feedback form state
  const [newFeedback, setNewFeedback] = useState({
    gradeGroup: 'XII-1',
    guidanceArea: 'karir' as GuidanceArea,
    serviceType: 'Konsultasi Karir & Pilihan Kampus',
    outcomeHighlight: '',
    quote: '',
  });

  const filteredTestimonials = selectedFilter === 'all'
    ? testimonials
    : testimonials.filter((t) => t.guidanceArea === selectedFilter);

  // Keep index within bounds when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedFilter]);

  // Autoplay slider logic
  useEffect(() => {
    if (!isAutoPlaying || filteredTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredTestimonials.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? filteredTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handleFilterClick = (filter: 'all' | GuidanceArea) => {
    setSelectedFilter(filter);
    setIsAutoPlaying(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedback.quote.trim()) return;

    const areaName =
      newFeedback.guidanceArea === 'karir' ? 'Karir' :
      newFeedback.guidanceArea === 'belajar' ? 'Belajar' :
      newFeedback.guidanceArea === 'sosial' ? 'Sosial' : 'Pribadi';

    const createdItem: StudentTestimonial = {
      id: `testi-${Date.now()}`,
      anonymousLabel: `Siswa Kelas ${newFeedback.gradeGroup} (Anonim)`,
      gradeGroup: newFeedback.gradeGroup,
      guidanceArea: newFeedback.guidanceArea,
      serviceType: newFeedback.serviceType || `Layanan Bimbingan ${areaName}`,
      datePeriod: 'Tahun Ajaran 2026/2027',
      quote: newFeedback.quote.trim(),
      outcomeHighlight: newFeedback.outcomeHighlight.trim() || 'Mendapatkan Arahan & Solusi Positif dari Guru BK',
      helpfulnessRating: 5,
      confidentialityNote: 'Anonimitas dilindungi penuh sesuai Asas Kerahasiaan ABKIN',
    };

    setTestimonials([createdItem, ...testimonials]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsModalOpen(false);
      setNewFeedback({
        gradeGroup: 'XII-1',
        guidanceArea: 'karir',
        serviceType: 'Konsultasi Karir & Pilihan Kampus',
        outcomeHighlight: '',
        quote: '',
      });
    }, 1800);
  };

  const currentItem = filteredTestimonials[currentIndex] || filteredTestimonials[0];

  return (
    <section id="suara-siswa" className="py-14 md:py-20 bg-gradient-to-b from-[#FAF9F5] via-[#F4EFE6]/40 to-[#FBF9F3] border-t border-[#E5ECE6] relative overflow-hidden">
      {/* Soft atmospheric ambient orbs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#C29B38]/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#2D4A3E]/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#608066] uppercase tracking-wider mb-2">
              <MessageSquareHeart className="w-4 h-4 text-[#2D4A3E]" />
              <span>Suara Sahabat Siswa · Student Voices</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#163328]">
              Cerita & Pengalaman Nyata di Ruang Bimbingan
            </h2>
            <p className="text-sm sm:text-base text-[#4F5E56] mt-2.5 font-normal leading-relaxed">
              Kesan tulus dari peserta didik SMA Muhammadiyah 1 Palangkaraya yang telah berkonsultasi bersama <strong>Ibu Dewi Kumala Sari, S.Pd.</strong> Seluruh identitas disamarkan demi menjaga kepatuhan mutlak pada <strong>Asas Kerahasiaan ABKIN</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#2D4A3E] bg-[#EBF2EC] hover:bg-[#DDE8DE] border border-[#CFDED1] rounded-xl transition-all duration-150 shadow-2xs hover:shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#2D4A3E]" />
              <span>Tulis Pesan Kesan Anonim</span>
            </button>
            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-xl transition-colors shadow-2xs cursor-pointer"
              >
                <span>Jadwalkan Konselingmu</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills / Tabs */}
        <div className="flex items-center justify-between gap-4 border-b border-[#E5ECE6] pb-4 mb-8 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {[
              { id: 'all', label: 'Semua Bidang' },
              { id: 'karir' as GuidanceArea, label: 'Bimbingan Karir & SNBP' },
              { id: 'pribadi' as GuidanceArea, label: 'Kesehatan Mental & Pribadi' },
              { id: 'belajar' as GuidanceArea, label: 'Strategi Belajar (VAK)' },
              { id: 'sosial' as GuidanceArea, label: 'Harmoni Hubungan Sebaya' },
            ].map((f) => {
              const isActive = selectedFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => handleFilterClick(f.id as any)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#2D4A3E] text-white shadow-2xs font-semibold'
                      : 'text-[#4F5E56] hover:text-[#163328] hover:bg-white/80'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Slider Prev / Next Controls */}
          {filteredTestimonials.length > 1 && (
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <button
                onClick={handlePrev}
                aria-label="Testimoni sebelumnya"
                className="w-8 h-8 rounded-lg bg-white border border-[#D6E0D8] text-[#163328] hover:bg-[#FAF9F5] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-[#727974] px-1">
                {currentIndex + 1} / {filteredTestimonials.length}
              </span>
              <button
                onClick={handleNext}
                aria-label="Testimoni berikutnya"
                className="w-8 h-8 rounded-lg bg-white border border-[#D6E0D8] text-[#163328] hover:bg-[#FAF9F5] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Featured Interactive Hero Testimonial Showcase */}
        {currentItem && (
          <div className="bg-white rounded-2xl border border-[#E5ECE6] shadow-sm p-6 sm:p-10 mb-8 relative transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Quote & Narrative Content */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  {/* Category, Rating, & Confidentiality Tag */}
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
                    <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wide text-[#6E5517] bg-[#FCF9EE] border border-[#C29B38]/40 px-2.5 py-0.5 rounded-md">
                      <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
                      <span>{currentItem.serviceType}</span>
                    </span>

                    <div className="flex items-center gap-0.5 text-[#C29B38]" title="Penilaian Layanan BK">
                      {[...Array(currentItem.helpfulnessRating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <span className="text-[#727974]">·</span>
                    <span className="text-[#608066] font-medium">{currentItem.datePeriod}</span>
                  </div>

                  {/* Main Quote */}
                  <div className="relative pl-6 sm:pl-8 border-l-2 border-[#C29B38]">
                    <Quote className="w-8 h-8 text-[#C29B38]/30 absolute -top-2 left-1 -z-0" />
                    <p className="text-base sm:text-lg lg:text-xl font-normal text-[#1A2821] leading-relaxed italic relative z-10">
                      "{currentItem.quote}"
                    </p>
                  </div>

                  {/* Key Takeaway / Outcome Highlight */}
                  <div className="mt-5 p-3.5 bg-[#FAF9F5] border border-[#E5ECE6] rounded-xl flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-[#EBF2EC] text-[#2D4A3E] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2D4A3E]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#163328] block">Hasil Pembimbingan:</span>
                      <span className="text-xs text-[#4F5E56]">{currentItem.outcomeHighlight}</span>
                    </div>
                  </div>
                </div>

                {/* Author Metadata with Strict Confidentiality Safeguard */}
                <div className="mt-6 pt-5 border-t border-[#E5ECE6] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EBF2EC] text-[#2D4A3E] flex items-center justify-center font-bold text-sm border border-[#CFDED1]">
                      {currentItem.gradeGroup}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#163328] flex items-center gap-1.5">
                        <span>{currentItem.anonymousLabel}</span>
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#608066] font-medium">
                        <Lock className="w-3 h-3 text-[#608066]" />
                        <span>{currentItem.confidentialityNote}</span>
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs text-[#727974] bg-[#FAF9F5] px-3 py-1 rounded-lg border border-[#E5ECE6]">
                    <Shield className="w-3.5 h-3.5 text-[#2D4A3E]" />
                    <span>Kode Etik ABKIN & Permendikbud 111/2014</span>
                  </div>
                </div>
              </div>

              {/* Right Mini Card Preview / Focus Summary */}
              <div className="lg:col-span-4 bg-gradient-to-br from-[#FAF8F2] to-[#F3EFE6] rounded-xl border border-[#E5ECE6] p-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6E5517]">
                    {currentItem.guidanceArea === 'karir' ? (
                      <Compass className="w-4 h-4 text-[#C29B38]" />
                    ) : currentItem.guidanceArea === 'belajar' ? (
                      <GraduationCap className="w-4 h-4 text-[#C29B38]" />
                    ) : currentItem.guidanceArea === 'sosial' ? (
                      <Users className="w-4 h-4 text-[#C29B38]" />
                    ) : (
                      <User className="w-4 h-4 text-[#C29B38]" />
                    )}
                    <span className="capitalize">Fokus {currentItem.guidanceArea}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#163328] leading-snug">
                    Pendampingan Ramah & Solutif Bersama Guru BK
                  </h3>

                  <p className="text-xs text-[#4F5E56] leading-relaxed">
                    Ruang BK SMA Muhammadiyah 1 Palangkaraya berorientasi pada pemberdayaan potensi siswa, mendengarkan aktif tanpa stigma, dan menumbuhkan kemandirian keputusan.
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E5ECE6]/80 flex items-center justify-between text-xs text-[#727974]">
                  <span>Puas dengan Konseling?</span>
                  <a
                    href="#jadwal"
                    className="font-semibold text-[#2D4A3E] hover:text-[#163328] underline underline-offset-2"
                  >
                    Konsultasi Sekarang &rarr;
                  </a>
                </div>
              </div>

            </div>

            {/* Slider Dots Indicator */}
            {filteredTestimonials.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-[#E5ECE6]">
                {filteredTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(idx);
                    }}
                    aria-label={`Lihat testimoni ke-${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                      currentIndex === idx
                        ? 'w-6 bg-[#2D4A3E]'
                        : 'w-2 bg-[#D6E0D8] hover:bg-[#A4B7A9]'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3-Column Responsive Secondary Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTestimonials.slice(0, 3).map((item, idx) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl border border-[#E5ECE6] p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between ${
                currentIndex === idx ? 'ring-2 ring-[#2D4A3E]/30 bg-[#FAF9F5]/40' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-semibold text-[#6E5517] bg-[#FCF9EE] px-2 py-0.5 rounded text-[11px] border border-[#C29B38]/30">
                    {item.serviceType}
                  </span>
                  <div className="flex items-center text-[#C29B38]">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[11px] font-mono font-bold ml-1 text-[#163328]">5.0</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#334139] italic leading-relaxed line-clamp-4">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5ECE6] flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-[#163328] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#608066]" />
                  <span>{item.anonymousLabel}</span>
                </div>
                <span className="text-[#727974]">{item.datePeriod}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal: Tulis Pesan Kesan Anonim */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F362D]/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E5ECE6] my-8 animate-fadeIn relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#727974] hover:text-[#163328] hover:bg-[#FAF9F5] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#EBF2EC] text-[#2D4A3E] flex items-center justify-center mx-auto border border-[#CFDED1]">
                  <CheckCircle2 className="w-8 h-8 text-[#2D4A3E]" />
                </div>
                <h3 className="text-lg font-bold text-[#163328]">
                  Pesan Kesan Berhasil Disampaikan!
                </h3>
                <p className="text-xs sm:text-sm text-[#4F5E56] max-w-sm mx-auto">
                  Terima kasih atas apresiasi dan suaramu. Masukan ini sangat berharga untuk terus memajukan kualitas pelayanan BK SMA Muhammadiyah 1 Palangkaraya.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#608066] uppercase mb-1">
                    <Lock className="w-3 h-3 text-[#2D4A3E]" />
                    <span>100% Anonim & Rahasia</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#163328]">
                    Tulis Pesan Kesan & Refleksi Layanan BK
                  </h3>
                  <p className="text-xs text-[#727974] mt-0.5">
                    Nama aslimu tidak diminta dan tidak akan pernah dipublikasikan demi menjaga kepatuhan Kode Etik ABKIN.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#1A2821] block mb-1">
                      Pilihan Kelas
                    </label>
                    <select
                      value={newFeedback.gradeGroup}
                      onChange={(e) => setNewFeedback({ ...newFeedback, gradeGroup: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D6E0D8] rounded-lg text-[#1A2821] focus:outline-none focus:border-[#2D4A3E]"
                    >
                      {SCHOOL_CLASSES.map((cls) => (
                        <option key={cls} value={cls}>
                          Kelas {cls}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1A2821] block mb-1">
                      Bidang Layanan
                    </label>
                    <select
                      value={newFeedback.guidanceArea}
                      onChange={(e) => setNewFeedback({ ...newFeedback, guidanceArea: e.target.value as GuidanceArea })}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D6E0D8] rounded-lg text-[#1A2821] focus:outline-none focus:border-[#2D4A3E]"
                    >
                      <option value="karir">Bimbingan Karir & SNBP</option>
                      <option value="pribadi">Kesehatan Mental & Pribadi</option>
                      <option value="belajar">Bimbingan Belajar (VAK)</option>
                      <option value="sosial">Bimbingan Sosial & Sebaya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1A2821] block mb-1">
                    Jenis Sesi / Layanan yang Diikuti
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Konseling Karir Mandiri, Tes Gaya Belajar, Bimbingan Klasikal"
                    value={newFeedback.serviceType}
                    onChange={(e) => setNewFeedback({ ...newFeedback, serviceType: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D6E0D8] rounded-lg text-[#1A2821] focus:outline-none focus:border-[#2D4A3E]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1A2821] block mb-1">
                    Hasil Positif / Solusi yang Kamu Dapatkan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Lebih percaya diri memilih prodi, tahu cara mengatasi stres belajar"
                    value={newFeedback.outcomeHighlight}
                    onChange={(e) => setNewFeedback({ ...newFeedback, outcomeHighlight: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D6E0D8] rounded-lg text-[#1A2821] focus:outline-none focus:border-[#2D4A3E]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1A2821] block mb-1">
                    Pesan Kesan & Pengalamanmu (Jujur & Tulus)
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ceritakan bagaimana sesi bimbingan bersama Ibu Dewi Kumala Sari membantu kesulitan atau pertanyaan yang kamu hadapi..."
                    value={newFeedback.quote}
                    onChange={(e) => setNewFeedback({ ...newFeedback, quote: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D6E0D8] rounded-lg text-[#1A2821] focus:outline-none focus:border-[#2D4A3E]"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E5ECE6]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#4F5E56] hover:text-[#163328] cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors cursor-pointer"
                  >
                    Kirim Secara Anonim
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
