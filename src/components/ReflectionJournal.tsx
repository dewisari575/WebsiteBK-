import React, { useState } from 'react';
import { INITIAL_JOURNAL_PROMPTS } from '../data/bkData';
import { JournalEntry } from '../types';
import { BookOpen, Send, Lock, Sparkles, Smile, Meh, Frown, Coffee, Flame, Check } from 'lucide-react';

export const ReflectionJournal: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(INITIAL_JOURNAL_PROMPTS[0]);
  const [mood, setMood] = useState<'Senang' | 'Tenang' | 'Cemas' | 'Lelah' | 'Semangat'>('Tenang');
  const [content, setContent] = useState('');
  const [shareWithCounselor, setShareWithCounselor] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [savedEntries, setSavedEntries] = useState<JournalEntry[]>([
    {
      id: 'entry-1',
      date: '24 Oktober 2026',
      mood: 'Tenang',
      promptTitle: 'Keberhasilan Kecil Minggu Ini',
      content: 'Hari ini berhasil menyelesaikan tugas proyek kolaborasi P5 tanpa merasa tergesa-gesa. Sudah mulai bisa mengatur waktu tidur lebih teratur dan meluangkan 15 menit untuk shalat Dhuha dengan khusyuk.',
      shareWithCounselor: true,
    },
    {
      id: 'entry-2',
      date: '21 Oktober 2026',
      mood: 'Cemas',
      promptTitle: 'Pelepas Beban Pikiran',
      content: 'Sempat khawatir dengan nilai simulasi try out UTBK pertama kemarin, tapi setelah membaca catatan BK dari Bu Dewi tentang growth mindset, saya ingat bahwa proses belajar ini adalah maraton, bukan lari cepat 100 meter.',
      shareWithCounselor: false,
    },
  ]);

  const moodOptions: {
    label: 'Senang' | 'Tenang' | 'Cemas' | 'Lelah' | 'Semangat';
    icon: typeof Smile;
    color: string;
  }[] = [
    { label: 'Senang', icon: Smile, color: 'text-amber-600 bg-amber-50' },
    { label: 'Tenang', icon: Sparkles, color: 'text-emerald-700 bg-emerald-50' },
    { label: 'Semangat', icon: Flame, color: 'text-orange-600 bg-orange-50' },
    { label: 'Cemas', icon: Frown, color: 'text-blue-600 bg-blue-50' },
    { label: 'Lelah', icon: Coffee, color: 'text-stone-600 bg-stone-100' },
  ];

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newEntry: JournalEntry = {
      id: `entry-${Date.now()}`,
      date: '26 Oktober 2026',
      mood,
      promptTitle: selectedPrompt.title,
      content,
      shareWithCounselor,
    };

    setSavedEntries([newEntry, ...savedEntries]);
    setContent('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <section id="jurnal" className="py-12 md:py-16 bg-[#FAF9F5] border-t border-[#E5ECE6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#608066] uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4 text-[#2D4A3E]" />
            <span>Ruang Refleksi Diri Siswa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#163328]">
            Jurnal Refleksi & Ruang Curhat Tenang
          </h2>
          <p className="text-sm sm:text-base text-[#4F5E56] mt-2 font-normal">
            Menulis adalah cara lembut mendengarkan diri sendiri. Luapkan apa yang terasa di hati, evaluasi langkahmu, dan rawat kesehatan mentalmu setiap hari.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Ruled-Paper Journal */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#D6E0D8] p-6 sm:p-8 shadow-xs relative overflow-hidden">
            
            {/* Top decorative binder bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5ECE6]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#adcebe]" />
                <span className="w-3 h-3 rounded-full bg-[#c8ebcc]" />
                <span className="w-3 h-3 rounded-full bg-[#ecc15a]" />
                <span className="text-xs font-bold text-[#163328] ml-2">
                  Lembar Refleksi Siswa
                </span>
              </div>
              <span className="text-xs font-mono text-[#727974]">
                26 Oktober 2026
              </span>
            </div>

            {/* Prompt Selector Pills */}
            <div className="mb-5">
              <span className="text-[11px] font-bold text-[#727974] uppercase tracking-wider block mb-2">
                Pilih Pemantik Refleksi:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {INITIAL_JOURNAL_PROMPTS.map((p) => {
                  const isSelected = selectedPrompt.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPrompt(p)}
                      className={`p-2.5 rounded-lg text-left text-xs transition-colors cursor-pointer border ${
                        isSelected
                          ? 'bg-[#EBF2EC] border-[#2D4A3E] text-[#163328] font-bold shadow-2xs'
                          : 'bg-white border-[#E5ECE6] text-[#4F5E56] hover:bg-[#FAF9F5]'
                      }`}
                    >
                      {p.title}
                    </button>
                  );
                })}
              </div>

              {/* Active Prompt Question */}
              <div className="mt-3 p-3 bg-[#FAF9F5] border border-[#E5ECE6] rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-[#163328] italic">
                  "{selectedPrompt.prompt}"
                </p>
              </div>
            </div>

            {/* Mood selector */}
            <div className="mb-5">
              <span className="text-[11px] font-bold text-[#727974] uppercase tracking-wider block mb-2">
                Bagaimana keadaan hatimu hari ini?
              </span>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map((m) => {
                  const isSelected = mood === m.label;
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => setMood(m.label)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#2D4A3E] bg-[#2D4A3E] text-white'
                          : `${m.color} border-transparent hover:border-[#D6E0D8]`
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ruled Paper Textarea */}
            <form onSubmit={handleSaveEntry}>
              <div className="relative mb-4">
                <textarea
                  rows={6}
                  required
                  placeholder="Tuliskan catatan refleksimu di sini..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{
                    lineHeight: '28px',
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #E5ECE6 28px)',
                    backgroundAttachment: 'local',
                  }}
                  className="w-full p-4 text-sm bg-white border border-[#D6E0D8] rounded-xl text-[#1A2821] placeholder-[#7D8D83] focus:outline-none focus:border-[#2D4A3E] focus:ring-2 focus:ring-[#608066]/20 font-sans"
                />
              </div>

              {/* Privacy option */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs text-[#4F5E56] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shareWithCounselor}
                    onChange={(e) => setShareWithCounselor(e.target.checked)}
                    className="w-4 h-4 text-[#2D4A3E] rounded border-[#A4B7A9] cursor-pointer"
                  />
                  <span>Bagikan dengan Bu Dewi untuk topik bahasan konseling berikutnya</span>
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Simpan Catatan</span>
                </button>
              </div>

              {saveSuccess && (
                <div className="mt-3 p-2.5 bg-[#c5e9ca]/40 border border-[#adcebe] rounded-lg text-xs text-[#163328] flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-[#2D4A3E]" />
                  <span>Refleksi berhasil disimpan ke lembar jurnal pribadimu.</span>
                </div>
              )}
            </form>

            <div className="mt-4 pt-3 border-t border-[#E5ECE6] flex items-center justify-between text-[11px] text-[#727974]">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#608066]" />
                Enkripsi lokal privat
              </span>
              <span>Hanya kamu & konselor yang dapat membaca jika dibagikan</span>
            </div>
          </div>

          {/* Right Column: Previous Reflection Log & Still life materials photo */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual still-life card */}
            <div className="rounded-2xl border border-[#E5ECE6] overflow-hidden bg-white shadow-xs">
              <div className="h-44 relative bg-[#EBF2EC] overflow-hidden">
                <img
                  src="/src/assets/images/career_guidance_materials_1793004694425.jpg"
                  alt="Buku jurnal refleksi dan panduan karir siswa"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 bg-white">
                <h4 className="text-sm font-bold text-[#163328]">
                  Kekuatan Menulis & Mengenali Diri
                </h4>
                <p className="text-xs text-[#4F5E56] mt-1 leading-relaxed">
                  "Menulis jurnal bukan tentang menyusun kata-kata sempurna, melainkan memberi ruang jujur bagi jiwa untuk bernapas dan bertumbuh."
                </p>
              </div>
            </div>

            {/* Saved Entries List */}
            <div className="bg-white rounded-2xl border border-[#E5ECE6] p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E5ECE6]">
                <h4 className="text-xs font-bold text-[#163328] uppercase tracking-wider">
                  Riwayat Refleksi Tersimpan ({savedEntries.length})
                </h4>
                <span className="text-[11px] text-[#727974]">Tersimpan di peramban</span>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {savedEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-3 bg-[#FAF9F5] border border-[#E5ECE6] rounded-xl text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px] text-[#727974]">
                      <span>{entry.date}</span>
                      <span className="font-semibold px-2 py-0.5 rounded-full bg-white border border-[#E5ECE6] text-[#2D4A3E]">
                        Mood: {entry.mood}
                      </span>
                    </div>
                    <p className="font-bold text-[#163328]">
                      {entry.promptTitle}
                    </p>
                    <p className="text-[#4F5E56] leading-relaxed line-clamp-3">
                      {entry.content}
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[10px] text-[#727974]">
                      <span>
                        {entry.shareWithCounselor
                          ? '✓ Dibagikan ke Guru BK'
                          : '🔒 Bersifat Privat'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
