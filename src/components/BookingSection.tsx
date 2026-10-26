import React, { useState } from 'react';
import { GuidanceArea, BookingFormState, ScheduledSession } from '../types';
import { SCHOOL_CLASSES } from '../data/bkData';
import {
  Calendar,
  Clock,
  User,
  Users,
  GraduationCap,
  Compass,
  Check,
  Shield,
  AlertCircle,
  FileText,
  MapPin,
  Laptop,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';

interface BookingSectionProps {
  scheduledSessions?: ScheduledSession[];
  onAddSession?: (session: ScheduledSession) => void;
  preselectedArea?: GuidanceArea;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  onAddSession,
  preselectedArea,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedSession, setSubmittedSession] = useState<ScheduledSession | null>(null);

  const [formData, setFormData] = useState<BookingFormState>({
    fullName: '',
    grade: 'Kelas X',
    classGroup: 'X-1',
    contactNumber: '',
    counselingArea: preselectedArea || 'karir',
    mode: 'tatap-muka',
    date: '2026-10-29',
    timeSlot: '09.30 - 10.15 WIB (Istirahat 1)',
    confidentialNotes: '',
    urgentFlag: false,
  });

  const availableTimeSlots = [
    '07.30 - 08.15 WIB (Sesi Pagi Sebelum KBM)',
    '09.30 - 10.15 WIB (Istirahat 1)',
    '11.45 - 12.30 WIB (Istirahat Shalat Dzuhur)',
    '13.45 - 14.30 WIB (Sesi Pulang Sekolah)',
    '15.30 - 16.15 WIB (Daring Khusus Sore)',
  ];

  const handleAreaChange = (area: GuidanceArea) => {
    setFormData({ ...formData, counselingArea: area });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    const refCode = `BK-M1-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSession: ScheduledSession = {
      id: `sess-${Date.now()}`,
      studentName: formData.fullName,
      grade: `Kelas ${formData.classGroup}`,
      area: formData.counselingArea,
      mode: formData.mode,
      date: formData.date,
      timeSlot: formData.timeSlot,
      status: 'Menunggu',
      notes: formData.confidentialNotes,
      referenceCode: refCode,
    };

    onAddSession?.(newSession);
    setSubmittedSession(newSession);
    setCurrentStep(4);
  };

  const resetForm = () => {
    setSubmittedSession(null);
    setCurrentStep(1);
    setFormData({
      fullName: '',
      grade: 'Kelas XII',
      classGroup: 'XII IPA 1',
      contactNumber: '',
      counselingArea: 'karir',
      mode: 'tatap-muka',
      date: '2026-10-29',
      timeSlot: '09.30 - 10.15 WIB (Istirahat 1)',
      confidentialNotes: '',
      urgentFlag: false,
    });
  };

  return (
    <section id="jadwal" className="py-12 md:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#608066] uppercase tracking-wider mb-2">
            <CalendarCheck className="w-4 h-4 text-[#2D4A3E]" />
            <span>Reservasi Mandiri Siswa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#163328]">
            Jadwalkan Konseling & Konsultasi BK
          </h2>
          <p className="text-sm sm:text-base text-[#4F5E56] mt-2 font-normal">
            Pilihlah waktu yang nyaman bagi jadwal belajarmu. Ibu Dewi Kumala Sari, S.Pd. akan menyambutmu di Ruang BK atau via ruang temu daring.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-[#E5ECE6] -z-0" />
            
            {[
              { step: 1, title: 'Bidang' },
              { step: 2, title: 'Format & Waktu' },
              { step: 3, title: 'Data & Catatan' },
              { step: 4, title: 'Konfirmasi' },
            ].map((s) => {
              const isPassed = currentStep > s.step;
              const isCurrent = currentStep === s.step;

              return (
                <div key={s.step} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                      isPassed
                        ? 'bg-[#608066] text-white'
                        : isCurrent
                        ? 'bg-[#2D4A3E] text-white ring-4 ring-[#c5e9ca]/60'
                        : 'bg-[#f0eee8] text-[#727974] border border-[#E5ECE6]'
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4" /> : s.step}
                  </div>
                  <span
                    className={`text-[11px] font-semibold mt-1.5 ${
                      isCurrent ? 'text-[#163328]' : 'text-[#727974]'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Card Form Container */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#E5ECE6] shadow-xs p-6 sm:p-10">
          
          {/* Step 1: Bidang Bimbingan */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-bold text-[#163328] mb-1">
                  Langkah 1: Pilih Kategori Bimbingan
                </h3>
                <p className="text-xs sm:text-sm text-[#4F5E56]">
                  Topik apa yang paling ingin kamu diskusikan bersama Guru BK?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: 'pribadi' as GuidanceArea,
                    icon: User,
                    title: 'Bimbingan Pribadi',
                    desc: 'Kesehatan mental, kecemasan, motivasi hidup, regulasi emosi.',
                  },
                  {
                    id: 'sosial' as GuidanceArea,
                    icon: Users,
                    title: 'Bimbingan Sosial',
                    desc: 'Relasi pertemanan, adaptasi sekolah, anti-perundungan, komunikasi.',
                  },
                  {
                    id: 'belajar' as GuidanceArea,
                    icon: GraduationCap,
                    title: 'Bimbingan Belajar',
                    desc: 'Metode belajar efektif, kesulitan konsentrasi, tugas proyek P5.',
                  },
                  {
                    id: 'karir' as GuidanceArea,
                    icon: Compass,
                    title: 'Bimbingan Karir',
                    desc: 'Pilihan jurusan PTN/PTS, jalur SNBP, UTBK-SNBT, sekolah kedinasan.',
                  },
                ].map((item) => {
                  const isSelected = formData.counselingArea === item.id;
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleAreaChange(item.id)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? 'border-[#2D4A3E] bg-[#EBF2EC]/50 shadow-2xs'
                          : 'border-[#E5ECE6] hover:border-[#608066]/50 bg-white'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-[#2D4A3E] text-white'
                            : 'bg-[#fbf9f3] text-[#2D4A3E] border border-[#E5ECE6]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#163328]">{item.title}</h4>
                        <p className="text-xs text-[#4F5E56] mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4 border-t border-[#E5ECE6]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors cursor-pointer"
                >
                  Lanjut ke Format & Waktu
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Format & Waktu */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-bold text-[#163328] mb-1">
                  Langkah 2: Tentukan Format Pertemuan & Waktu
                </h3>
                <p className="text-xs sm:text-sm text-[#4F5E56]">
                  Pilih medium konsultasi yang membuatmu merasa paling nyaman dan tenang.
                </p>
              </div>

              {/* Mode Selection */}
              <div>
                <label className="block text-xs font-bold text-[#163328] uppercase tracking-wider mb-2">
                  Format Konseling:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'tatap-muka' as const,
                      icon: MapPin,
                      label: 'Tatap Muka Langsung',
                      sub: 'Di Ruang BK Lt. 1',
                    },
                    {
                      id: 'online' as const,
                      icon: Laptop,
                      label: 'Daring (Google Meet)',
                      sub: 'Tautan dikirim via WA',
                    },
                    {
                      id: 'tertulis' as const,
                      icon: FileText,
                      label: 'Konsultasi Tertulis',
                      sub: 'Umpan balik via catatan',
                    },
                  ].map((m) => {
                    const isSelected = formData.mode === m.id;
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, mode: m.id })}
                        className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#2D4A3E] bg-[#EBF2EC] text-[#163328]'
                            : 'border-[#D6E0D8] bg-white text-[#4F5E56] hover:border-[#608066]'
                        }`}
                      >
                        <Icon className="w-5 h-5 mb-2 text-[#2D4A3E]" />
                        <span className="text-xs font-bold block">{m.label}</span>
                        <span className="text-[11px] text-[#727974]">{m.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date & Slot selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#163328] uppercase tracking-wider mb-1.5">
                    Tanggal Pertemuan:
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min="2026-10-26"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6E0D8] rounded-lg text-[#1A2821] focus:outline-none focus:border-[#2D4A3E] focus:ring-2 focus:ring-[#608066]/20"
                    />
                    <Calendar className="w-4 h-4 text-[#727974] absolute right-3 top-3 pointer-events-none" />
                  </div>
                  <span className="text-[11px] text-[#727974] mt-1 block">
                    Pelayanan aktif: Hari Senin s.d. Jumat
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#163328] uppercase tracking-wider mb-1.5">
                    Pilihan Jam Layanan:
                  </label>
                  <div className="relative">
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D6E0D8] rounded-lg text-[#1A2821] focus:outline-none focus:border-[#2D4A3E] focus:ring-2 focus:ring-[#608066]/20"
                    >
                      {availableTimeSlots.map((slot, idx) => (
                        <option key={idx} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    <Clock className="w-4 h-4 text-[#727974] absolute right-3 top-3 pointer-events-none" />
                  </div>
                  <span className="text-[11px] text-[#727974] mt-1 block">
                    Durasi efektif: 45 menit per pertemuan
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E5ECE6]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-[#4F5E56] hover:text-[#163328] cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors cursor-pointer"
                >
                  Lanjut ke Data Diri
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Data Siswa & Catatan Rahasia */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn">
              <div>
                <h3 className="text-lg font-bold text-[#163328] mb-1">
                  Langkah 3: Identitas Siswa & Catatan Awal
                </h3>
                <p className="text-xs sm:text-sm text-[#4F5E56]">
                  Informasi ini hanya dapat diakses oleh Ibu Dewi Kumala Sari, S.Pd. selaku Guru BK.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#163328] uppercase tracking-wider mb-1.5">
                    Nama Siswa / Inisial:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Raihan atau R.N."
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6E0D8] rounded-lg text-[#1A2821] placeholder-[#7D8D83] focus:outline-none focus:border-[#2D4A3E] focus:ring-2 focus:ring-[#608066]/20"
                  />
                  <span className="text-[11px] text-[#727974] mt-1 block">
                    *Boleh menggunakan inisial jika merasa lebih nyaman
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#163328] uppercase tracking-wider mb-1.5">
                    Pilihan Rombel / Kelas:
                  </label>
                  <select
                    value={formData.classGroup}
                    onChange={(e) => {
                      const val = e.target.value;
                      const gradeName = val.startsWith('X-') ? 'Kelas X' : val.startsWith('XI-') ? 'Kelas XI' : 'Kelas XII';
                      setFormData({ ...formData, classGroup: val, grade: gradeName });
                    }}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D6E0D8] rounded-lg text-[#1A2821] focus:outline-none focus:border-[#2D4A3E] focus:ring-2 focus:ring-[#608066]/20 font-medium"
                  >
                    <optgroup label="Fase E (Kelas X)">
                      <option value="X-1">Kelas X-1</option>
                      <option value="X-2">Kelas X-2</option>
                      <option value="X-3">Kelas X-3</option>
                    </optgroup>
                    <optgroup label="Fase F (Kelas XI)">
                      <option value="XI-1">Kelas XI-1</option>
                      <option value="XI-2">Kelas XI-2</option>
                      <option value="XI-3">Kelas XI-3</option>
                    </optgroup>
                    <optgroup label="Fase F Tingkat Akhir (Kelas XII)">
                      <option value="XII-1">Kelas XII-1</option>
                      <option value="XII-2">Kelas XII-2</option>
                      <option value="XII-3">Kelas XII-3</option>
                    </optgroup>
                  </select>
                  <span className="text-[11px] text-[#727974] mt-1 block">
                    Pilih rombel resmi SMA Muhammadiyah 1 Palangkaraya
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#163328] uppercase tracking-wider mb-1.5">
                  Nomor Kontak / WhatsApp Aktif:
                </label>
                <input
                  type="tel"
                  placeholder="0812-xxxx-xxxx (Untuk konfirmasi jadwal atau link daring)"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6E0D8] rounded-lg text-[#1A2821] placeholder-[#7D8D83] focus:outline-none focus:border-[#2D4A3E] focus:ring-2 focus:ring-[#608066]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#163328] uppercase tracking-wider mb-1.5">
                  Hal yang Ingin Dikonsultasikan:
                </label>
                <textarea
                  rows={3}
                  placeholder="Ceritakan sedikit tentang apa yang kamu rasakan atau pertanyaan yang ingin dibahas. Bebas dan tanpa tekanan..."
                  value={formData.confidentialNotes}
                  onChange={(e) => setFormData({ ...formData, confidentialNotes: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6E0D8] rounded-lg text-[#1A2821] placeholder-[#7D8D83] focus:outline-none focus:border-[#2D4A3E] focus:ring-2 focus:ring-[#608066]/20"
                />
                <span className="text-[11px] text-[#608066] mt-1 flex items-center gap-1 font-medium">
                  <Shield className="w-3 h-3 text-[#2D4A3E]" />
                  Informasi ini terlindungi kerahasiaan BK sepenuhnya.
                </span>
              </div>

              <div className="p-3 bg-[#FAF9F5] border border-[#E5ECE6] rounded-lg flex items-center gap-2">
                <input
                  type="checkbox"
                  id="urgentFlag"
                  checked={formData.urgentFlag}
                  onChange={(e) => setFormData({ ...formData, urgentFlag: e.target.checked })}
                  className="w-4 h-4 text-[#2D4A3E] rounded border-[#A4B7A9] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="urgentFlag" className="text-xs text-[#1A2821] cursor-pointer">
                  <strong>Sifat Mendesak / Butuh Respon Hari Ini:</strong> Tandai jika kamu membutuhkan penanganan segera terkait kondisi darurat atau stres berat.
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E5ECE6]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-[#4F5E56] hover:text-[#163328] cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Kirim Jadwal Konseling</span>
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Confirmation Receipt */}
          {currentStep === 4 && submittedSession && (
            <div className="text-center py-4 space-y-6 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-[#EBF2EC] text-[#2D4A3E] flex items-center justify-center mx-auto border border-[#CFDED1]">
                <CheckCircle2 className="w-8 h-8 text-[#2D4A3E]" />
              </div>

              <div>
                <span className="inline-block text-xs font-bold text-[#6E5517] bg-[#FCF9EE] border border-[#C29B38]/40 px-3 py-1 rounded-full mb-2">
                  Permohonan Terdaftar
                </span>
                <h3 className="text-xl font-bold text-[#163328]">
                  Sesi Konseling Berhasil Didaftarkan!
                </h3>
                <p className="text-xs sm:text-sm text-[#4F5E56] max-w-md mx-auto mt-1">
                  Ibu Dewi Kumala Sari telah menerima jadwalmu. Tetap tenang, ruang bimbingan kami selalu terbuka dengan hangat.
                </p>
              </div>

              {/* Booking Dossier Receipt */}
              <div className="bg-[#FAF9F5] border border-[#E5ECE6] rounded-xl p-5 text-left max-w-md mx-auto space-y-2.5 text-xs text-[#4F5E56]">
                <div className="flex justify-between pb-2 border-b border-[#E5ECE6]">
                  <span className="text-[#727974]">Kode Tiket BK:</span>
                  <span className="font-mono font-bold text-[#2D4A3E]">{submittedSession.referenceCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#727974]">Nama Siswa:</span>
                  <span className="font-semibold text-[#1A2821]">{submittedSession.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#727974]">Kelas:</span>
                  <span className="font-semibold text-[#1A2821]">{submittedSession.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#727974]">Bidang Layanan:</span>
                  <span className="font-semibold text-[#1A2821] uppercase">{submittedSession.area}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#727974]">Tanggal & Jam:</span>
                  <span className="font-semibold text-[#1A2821]">{submittedSession.date} · {submittedSession.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#727974]">Format Pertemuan:</span>
                  <span className="font-semibold text-[#1A2821]">
                    {submittedSession.mode === 'tatap-muka'
                      ? 'Tatap Muka di Ruang BK'
                      : submittedSession.mode === 'online'
                      ? 'Daring Google Meet'
                      : 'Tertulis'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 text-xs font-semibold text-[#2D4A3E] bg-[#EBF2EC] hover:bg-[#DDE8DE] rounded-lg transition-colors cursor-pointer"
                >
                  Buat Pengajuan Baru
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
