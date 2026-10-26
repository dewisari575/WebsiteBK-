import React, { useState } from 'react';
import { RPL_ITEMS, COUNSELOR_INFO } from '../data/bkData';
import { RplItem } from '../types';
import { Printer, CheckCircle, Clock, Award, Search, Home } from 'lucide-react';
import { PrintableReportModal } from './PrintableReportModal';

export const RplDocumentation: React.FC = () => {
  const [semesterFilter, setSemesterFilter] = useState<'All' | 'Ganjil' | 'Genap'>('All');
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [selectedRplDetail, setSelectedRplDetail] = useState<RplItem | null>(null);

  const filteredItems = RPL_ITEMS.filter((item) => {
    const matchSemester = semesterFilter === 'All' || item.semester === semesterFilter;
    const matchService = serviceTypeFilter === 'All' || item.serviceType === serviceTypeFilter;
    const matchSearch =
      searchTerm === '' ||
      item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pancasilaProfile.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSemester && matchService && matchSearch;
  });

  return (
    <section id="rpl" className="py-12 md:py-16 bg-[#FAF9F5] border-t border-[#E5ECE6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Print Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#608066] mb-2">
              <span>Akuntabilitas & Akreditasi Sekolah</span>
              <span aria-hidden="true">·</span>
              <span>Kurikulum Merdeka 2026/2027</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#163328]">
              Administrasi & Ledger RPL BK
            </h2>
            <p className="text-sm sm:text-base text-[#4F5E56] mt-1 max-w-2xl font-normal">
              Rencana Pelaksanaan Layanan Bimbingan dan Konseling (RPL BK) terstandar mencakup Klasikal, Kelompok, Individu, Kolaborasi, dan <strong>Home Visit (Kunjungan Rumah)</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowPrintModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Printer className="w-4 h-4 text-[#c9ead9]" />
              <span>Cetak / Unduh Laporan Resmi BK</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#E5ECE6] shadow-2xs mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Semester Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#f0eee8] rounded-lg">
            {(['All', 'Ganjil', 'Genap'] as const).map((sem) => (
              <button
                key={sem}
                onClick={() => setSemesterFilter(sem)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  semesterFilter === sem
                    ? 'bg-white text-[#163328] font-bold shadow-2xs'
                    : 'text-[#4F5E56] hover:text-[#163328]'
                }`}
              >
                {sem === 'All' ? 'Semua Semester' : `Semester ${sem}`}
              </button>
            ))}
          </div>

          {/* Service Type Tabs including Home Visit */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {['All', 'Klasikal', 'Kelompok', 'Individu', 'Kolaborasi', 'Home Visit'].map((type) => (
              <button
                key={type}
                onClick={() => setServiceTypeFilter(type)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                  serviceTypeFilter === type
                    ? 'bg-[#2D4A3E] text-white border-[#2D4A3E]'
                    : 'bg-white text-[#4F5E56] border-[#D6E0D8] hover:bg-[#FAF9F5]'
                }`}
              >
                {type === 'All' ? 'Semua Format' : type}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <input
              type="text"
              placeholder="Cari topik / kode RPL / asesmen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#fbf9f3] border border-[#D6E0D8] rounded-lg text-[#1A2821] placeholder-[#7D8D83] focus:outline-none focus:border-[#2D4A3E]"
            />
            <Search className="w-3.5 h-3.5 text-[#727974] absolute left-3 top-2.5 pointer-events-none" />
          </div>

        </div>

        {/* Ledger Table */}
        <div className="bg-white rounded-xl border border-[#E5ECE6] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F5] border-b border-[#E5ECE6] text-[#727974] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Kode RPL</th>
                  <th className="py-3 px-4">Topik & Bidang Layanan</th>
                  <th className="py-3 px-4">Tipe & Sasaran</th>
                  <th className="py-3 px-4">Profil Pancasila</th>
                  <th className="py-3 px-4">Durasi</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5ECE6] text-[#1A2821]">
                {filteredItems.map((rpl) => (
                  <tr key={rpl.id} className="hover:bg-[#FAF9F5] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#2D4A3E] whitespace-nowrap">
                      {rpl.code}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-bold text-[#163328] mb-0.5 line-clamp-2">
                        {rpl.topic}
                      </p>
                      <span className="text-[11px] text-[#608066] capitalize font-medium">
                        Bidang: {rpl.guidanceArea} · Sem. {rpl.semester}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {rpl.serviceType === 'Home Visit' && (
                          <Home className="w-3.5 h-3.5 text-[#C29B38]" />
                        )}
                        <span className={`font-medium ${rpl.serviceType === 'Home Visit' ? 'text-[#7D5F18] font-bold' : ''}`}>
                          {rpl.serviceType}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#727974]">{rpl.targetGrade}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] text-[#4F5E56] font-medium bg-[#f0eee8] px-2 py-0.5 rounded border border-[#E5ECE6]">
                        {rpl.pancasilaProfile}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-[#4F5E56] whitespace-nowrap">
                      {rpl.durationMinutes} Menit
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          rpl.status === 'Terlaksana'
                            ? 'bg-[#c5e9ca]/40 text-[#163328] border border-[#adcebe]'
                            : rpl.status === 'Terjadwal'
                            ? 'bg-[#ffdf99]/40 text-[#574100] border border-[#ecc15a]'
                            : 'bg-[#f0eee8] text-[#4F5E56] border border-[#dcdad4]'
                        }`}
                      >
                        {rpl.status === 'Terlaksana' ? (
                          <CheckCircle className="w-3 h-3 text-[#2D4A3E]" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>{rpl.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedRplDetail(rpl)}
                        className="text-xs font-semibold text-[#2D4A3E] hover:underline cursor-pointer"
                      >
                        Detail Evaluasi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-xs text-[#727974]">
              Tidak ada arsip RPL BK yang sesuai dengan kriteria filter.
            </div>
          )}
        </div>

        {/* Accreditation & Institutional Rigor Summary Box */}
        <div className="mt-8 bg-white p-6 rounded-xl border border-[#E5ECE6] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FCF9EE] border border-[#C29B38]/40 text-[#6E5517] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-[#C29B38]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#163328]">
                Kesesuaian Standar Akreditasi BAN-PDM & Kurikulum Merdeka
              </h4>
              <p className="text-xs text-[#4F5E56] mt-0.5 max-w-3xl leading-relaxed">
                Unit Bimbingan Konseling SMA Muhammadiyah 1 Palangkaraya secara periodik mengarsipkan RPL BK (Klasikal, Kelompok, Individu, Kolaborasi, dan Home Visit), instrumen asesmen AKPD, Tes Minat Bakat AkuPintar, Sosiometri, dan tes modalitas Gaya Belajar VAK.
              </p>
            </div>
          </div>
          <div className="text-xs text-[#727974] text-right shrink-0">
            <span className="block font-bold text-[#1A2821]">Guru BK: {COUNSELOR_INFO.name}</span>
            <span className="block">Kepala Sekolah: {COUNSELOR_INFO.principal.name}</span>
          </div>
        </div>

      </div>

      {/* Detail Modal */}
      {selectedRplDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F362D]/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E5ECE6] max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-start justify-between pb-3 border-b border-[#E5ECE6] mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#2D4A3E]">
                  {selectedRplDetail.code}
                </span>
                <h3 className="text-base font-bold text-[#163328] mt-0.5">
                  {selectedRplDetail.topic}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRplDetail(null)}
                className="text-xs text-[#727974] hover:text-[#163328] p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#4F5E56]">
              <div className="grid grid-cols-2 gap-2 bg-[#FAF9F5] p-3 rounded-lg border border-[#E5ECE6]">
                <div>
                  <span className="text-[#727974] block">Format:</span>
                  <span className="font-semibold text-[#1A2821]">{selectedRplDetail.serviceType}</span>
                </div>
                <div>
                  <span className="text-[#727974] block">Sasaran:</span>
                  <span className="font-semibold text-[#1A2821]">{selectedRplDetail.targetGrade}</span>
                </div>
                <div>
                  <span className="text-[#727974] block">Bidang BK:</span>
                  <span className="font-semibold text-[#1A2821] capitalize">{selectedRplDetail.guidanceArea}</span>
                </div>
                <div>
                  <span className="text-[#727974] block">Alokasi Waktu:</span>
                  <span className="font-semibold text-[#1A2821]">{selectedRplDetail.durationMinutes} Menit</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-[#163328] block mb-1">
                  Penguatan Profil Pelajar Pancasila:
                </span>
                <p className="bg-[#EBF2EC] p-2.5 rounded-md border border-[#CFDED1] text-[#2D4A3E] font-medium">
                  {selectedRplDetail.pancasilaProfile}
                </p>
              </div>

              <div>
                <span className="font-bold text-[#163328] block mb-1">
                  Catatan Evaluasi Proses & Hasil:
                </span>
                <p className="p-3 bg-[#FAF9F5] border border-[#E5ECE6] rounded-md leading-relaxed text-[#1A2821]">
                  {selectedRplDetail.evalSummary}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E5ECE6] flex justify-end">
              <button
                onClick={() => setSelectedRplDetail(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors cursor-pointer"
              >
                Tutup Rincian
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formal Printable Document Modal */}
      {showPrintModal && (
        <PrintableReportModal onClose={() => setShowPrintModal(false)} />
      )}

    </section>
  );
};
