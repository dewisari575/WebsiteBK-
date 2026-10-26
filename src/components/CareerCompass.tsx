import React, { useState } from 'react';
import { CAREER_QUESTIONS, CAREER_PROFILES } from '../data/bkData';
import { Compass, CheckCircle2, RotateCcw, ArrowRight, BookOpen, Sparkles, GraduationCap } from 'lucide-react';

interface CareerCompassProps {
  onScheduleCareerConsult: () => void;
}

export const CareerCompass: React.FC<CareerCompassProps> = ({ onScheduleCareerConsult }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'R' | 'I' | 'A' | 'S' | 'E' | 'C'>>({});
  const [resultProfileCode, setResultProfileCode] = useState<'R' | 'I' | 'A' | 'S' | 'E' | 'C' | null>(null);

  const currentQ = CAREER_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C') => {
    const updated = { ...selectedAnswers, [currentQ.id]: category };
    setSelectedAnswers(updated);

    if (currentQuestionIndex < CAREER_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate dominant category
      const counts: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
      Object.values(updated).forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });

      let highestCode: 'R' | 'I' | 'A' | 'S' | 'E' | 'C' = 'S';
      let maxCount = -1;
      Object.entries(counts).forEach(([code, count]) => {
        if (count > maxCount) {
          maxCount = count;
          highestCode = code as 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
        }
      });
      setResultProfileCode(highestCode);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setResultProfileCode(null);
  };

  const activeResult = resultProfileCode ? CAREER_PROFILES[resultProfileCode] : null;

  return (
    <section id="karir" className="py-12 md:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#608066] uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4 text-[#2D4A3E]" />
            <span>Penelusuran Minat & Bakat Siswa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#163328]">
            Kompas Karir & Penjurusan Kurikulum Merdeka
          </h2>
          <p className="text-sm sm:text-base text-[#4F5E56] mt-2 font-normal">
            Bantu dirimu mengenali kecenderungan minat, rumpun mata pelajaran pilihan fase F, serta rekomendasi program studi perguruan tinggi (PTN/PTS) masa depan.
          </p>
        </div>

        {/* Interactive Container */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#E5ECE6] p-6 sm:p-9 shadow-xs">
          
          {!activeResult ? (
            <div className="space-y-6">
              {/* Question Progress Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5ECE6]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#608066] uppercase tracking-wider">
                    Pertanyaan {currentQuestionIndex + 1} dari {CAREER_QUESTIONS.length}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#727974] tabular-nums">
                  {Math.round(((currentQuestionIndex + 1) / CAREER_QUESTIONS.length) * 100)}% Selesai
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#f0eee8] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#2D4A3E] h-full transition-all duration-300 rounded-full"
                  style={{
                    width: `${((currentQuestionIndex + 1) / CAREER_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Prompt */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#163328] leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(opt.category)}
                      className="w-full p-4 rounded-xl border border-[#E5ECE6] hover:border-[#2D4A3E] hover:bg-[#EBF2EC]/40 text-left transition-all duration-150 flex items-start justify-between gap-3 group cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-md bg-[#FAF9F5] group-hover:bg-[#2D4A3E] group-hover:text-white text-[#727974] text-xs font-bold flex items-center justify-center shrink-0 border border-[#E5ECE6] transition-colors">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-[#1A2821] group-hover:text-[#163328]">
                            {opt.label}
                          </p>
                          <span className="text-[11px] text-[#727974] mt-0.5 block">
                            Karakteristik: {opt.scoreText}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#727974] group-hover:text-[#2D4A3E] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                    </button>
                  );
                })}
              </div>

              {currentQuestionIndex > 0 && (
                <div className="pt-2 flex justify-start">
                  <button
                    type="button"
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    className="text-xs text-[#727974] hover:text-[#163328] hover:underline"
                  >
                    ← Kembali ke pertanyaan sebelumnya
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Result Screen */
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5ECE6]">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6E5517] bg-[#FCF9EE] border border-[#C29B38]/40 px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
                  <span>Profil Minat Teridentifikasi</span>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs text-[#727974] hover:text-[#163328] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Ulangi Kuis</span>
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#163328] mb-2">
                  {activeResult.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4F5E56] leading-relaxed">
                  {activeResult.desc}
                </p>
              </div>

              {/* Recommendation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#E5ECE6]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#163328] uppercase tracking-wider mb-2">
                    <BookOpen className="w-4 h-4 text-[#608066]" />
                    <span>Mata Pelajaran Pilihan (Fase F)</span>
                  </div>
                  <p className="text-xs text-[#1A2821] font-medium leading-relaxed">
                    {activeResult.mapelRekomendasi}
                  </p>
                </div>

                <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#E5ECE6]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#163328] uppercase tracking-wider mb-2">
                    <GraduationCap className="w-4 h-4 text-[#C29B38]" />
                    <span>Rekomendasi Rumpun Prodi Kuliah</span>
                  </div>
                  <ul className="space-y-1">
                    {activeResult.prodiRekomendasi.map((p, i) => (
                      <li key={i} className="text-xs text-[#1A2821] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#608066] shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-[#EBF2EC] rounded-xl border border-[#CFDED1]">
                <h4 className="text-xs font-bold text-[#163328] uppercase tracking-wider mb-1">
                  Prospek Karir Masa Depan:
                </h4>
                <p className="text-xs text-[#2D4A3E] font-medium">
                  {activeResult.karirMasaDepan}
                </p>
              </div>

              {/* Consultation call to action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#727974] text-center sm:text-left">
                  Ingin menganalisis nilai rapor dan peluang tembus prodi ini bersama Bu Dewi?
                </p>
                <button
                  type="button"
                  onClick={onScheduleCareerConsult}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Compass className="w-4 h-4" />
                  <span>Jadwalkan Konsultasi Karir</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
