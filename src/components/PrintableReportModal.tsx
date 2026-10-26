import React from 'react';
import { X, Printer, Award } from 'lucide-react';
import { COUNSELOR_INFO, RPL_ITEMS } from '../data/bkData';

interface PrintableReportModalProps {
  onClose: () => void;
}

export const PrintableReportModal: React.FC<PrintableReportModalProps> = ({ onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#1F362D]/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-10 shadow-2xl my-6 border border-[#E5ECE6] max-h-[92vh] overflow-y-auto">
        
        {/* Top bar with actions (hidden on print) */}
        <div className="no-print flex items-center justify-between pb-4 mb-6 border-b border-[#E5ECE6]">
          <div className="flex items-center gap-2 text-xs text-[#608066]">
            <Award className="w-4 h-4 text-[#C29B38]" />
            <span className="font-semibold text-[#163328]">
              Pratinjau Dokumen Cetak Resmi Pelayanan BK Kurikulum Merdeka
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#727974] hover:text-[#163328] hover:bg-[#FAF9F5] rounded-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Paper Canvas */}
        <div className="print-content bg-white text-[#1A2821] font-sans">
          
          {/* Formal School Letterhead (KOP SURAT) */}
          <div className="border-b-2 border-black pb-4 mb-6 relative">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 shrink-0 flex items-center justify-center">
                <img
                  src={COUNSELOR_INFO.schoolLogoUrl}
                  alt="Logo SMA Muhammadiyah 1 Palangkaraya"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="flex-1 text-center">
                <div className="text-[12px] uppercase font-bold tracking-wider text-black">
                  Pimpinan Daerah Muhammadiyah Kota Palangka Raya
                </div>
                <div className="text-[12px] uppercase font-bold tracking-wider text-black">
                  Majelis Pendidikan Dasar Menengah dan Pendidikan Nonformal
                </div>
                <div className="text-xl sm:text-2xl uppercase font-extrabold tracking-wide text-black mt-0.5">
                  SMA Muhammadiyah 1 Palangkaraya
                </div>
                <div className="text-[10px] font-bold text-gray-800">
                  STATUS: TERAKREDITASI "A" (UNGGUL BAN-PDM) · NPSN: 30203492
                </div>
                <div className="text-[10px] text-gray-700 mt-0.5">
                  Alamat: Jl. R.T.A. Milono Km. 1,5 No. 04, Menteng, Kec. Jekan Raya, Kota Palangka Raya, Kalimantan Tengah 73111
                </div>
                <div className="text-[10px] text-gray-700">
                  Telepon: (0536) 3221982 | Hotline BK: {COUNSELOR_INFO.phoneHotline} | Pos-el: {COUNSELOR_INFO.contactEmail}
                </div>
              </div>
            </div>
            <div className="h-0.5 bg-black mt-3" />
            <div className="h-0.2 bg-black mt-0.5" />
          </div>

          {/* Document Title */}
          <div className="text-center mb-6">
            <h2 className="text-sm sm:text-base font-bold uppercase underline tracking-wide">
              Laporan Ketercapaian Pelayanan Bimbingan dan Konseling (BK)
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">
              Semester Ganjil & Genap Tahun Ajaran 2026/2027 · Berdasarkan Rencana Operasional Kurikulum Merdeka
            </p>
          </div>

          {/* Counselor & School Metadata Table */}
          <div className="grid grid-cols-2 gap-4 text-xs mb-6 p-3 bg-gray-50 border border-gray-300 rounded">
            <div>
              <p><strong>Satuan Pendidikan:</strong> SMA Muhammadiyah 1 Palangkaraya</p>
              <p><strong>Kepala Sekolah:</strong> {COUNSELOR_INFO.principal.name}</p>
              <p><strong>NIP Kepala Sekolah:</strong> {COUNSELOR_INFO.principal.nip}</p>
              <p><strong>Status Akreditasi:</strong> Terakreditasi A (Unggul BAN-PDM)</p>
            </div>
            <div>
              <p><strong>Guru BK / Konselor:</strong> {COUNSELOR_INFO.name}</p>
              <p><strong>NIP Guru BK:</strong> {COUNSELOR_INFO.nip}</p>
              <p><strong>Organisasi Profesi:</strong> {COUNSELOR_INFO.organization}</p>
              <p><strong>Pendidikan Terakhir:</strong> {COUNSELOR_INFO.education}</p>
              <p><strong>Fase Pembelajaran:</strong> Fase E (Kelas X) & Fase F (Kelas XI, XII)</p>
            </div>
          </div>

          {/* Executive Quantitative Metrics Summary including Assessments */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2">
              I. Ringkasan Ketercapaian Layanan & Asesmen BK (Aplikasi AkuPintar)
            </h4>
            <table className="w-full text-xs border border-gray-300">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="p-2 border-r border-gray-300 text-left">Komponen Asesmen & Layanan BK</th>
                  <th className="p-2 border-r border-gray-300 text-center">Target Satuan Pendidikan</th>
                  <th className="p-2 border-r border-gray-300 text-center">Realisasi Lapangan</th>
                  <th className="p-2 text-center">Keterangan Capaian</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border-r border-gray-300">AKPD (Angket Kebutuhan Peserta Didik)</td>
                  <td className="p-2 border-r border-gray-300 text-center">100% Peserta Didik</td>
                  <td className="p-2 border-r border-gray-300 text-center">452 Siswa Terpetakan</td>
                  <td className="p-2 text-center font-bold text-green-800">Tuntas 100%</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border-r border-gray-300">Tes Minat & Bakat (Aplikasi AkuPintar)</td>
                  <td className="p-2 border-r border-gray-300 text-center">Seluruh Kelas X & XI</td>
                  <td className="p-2 border-r border-gray-300 text-center">310 Siswa Terfasilitasi</td>
                  <td className="p-2 text-center font-bold text-green-800">Tercapai 100%</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border-r border-gray-300">Tes Gaya Belajar VAK (AkuPintar)</td>
                  <td className="p-2 border-r border-gray-300 text-center">Kelas X Fase E</td>
                  <td className="p-2 border-r border-gray-300 text-center">158 Siswa (100% Rombel)</td>
                  <td className="p-2 text-center font-bold text-green-800">Tuntas</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border-r border-gray-300">Sosiometri Iklim Hubungan Teman Sebaya</td>
                  <td className="p-2 border-r border-gray-300 text-center">Seluruh Rombel</td>
                  <td className="p-2 border-r border-gray-300 text-center">9 Rombongan Belajar (X-1 s.d. XII-3)</td>
                  <td className="p-2 text-center font-bold text-green-800">Optimal (Zero Bullying)</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border-r border-gray-300">Konseling Individual & Kelompok</td>
                  <td className="p-2 border-r border-gray-300 text-center">Sesuai Kebutuhan</td>
                  <td className="p-2 border-r border-gray-300 text-center">142 Sesi Konseling</td>
                  <td className="p-2 text-center font-bold text-green-800">Terlaksana Efektif</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border-r border-gray-300">Home Visit (Kunjungan Rumah)</td>
                  <td className="p-2 border-r border-gray-300 text-center">Kasus Presensi & Karir</td>
                  <td className="p-2 border-r border-gray-300 text-center">18 Kunjungan Silaturahmi</td>
                  <td className="p-2 text-center font-bold text-green-800">Sinergi Harmonis</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-gray-300">Pendampingan SNBP & SNBT Masuk PTN</td>
                  <td className="p-2 border-r border-gray-300 text-center">100% Siswa Eligible</td>
                  <td className="p-2 border-r border-gray-300 text-center">36 Siswa Terfasilitasi</td>
                  <td className="p-2 text-center font-bold text-green-800">Tuntas</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Ledger of RPL modules */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2">
              II. Matriks Rencana Pelaksanaan Layanan (RPL BK) & Home Visit
            </h4>
            <table className="w-full text-xs border border-gray-300">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="p-2 border-r border-gray-300 text-left">No & Kode</th>
                  <th className="p-2 border-r border-gray-300 text-left">Materi / Topik Layanan</th>
                  <th className="p-2 border-r border-gray-300 text-left">Format</th>
                  <th className="p-2 border-r border-gray-300 text-left">Bidang</th>
                  <th className="p-2 border-r border-gray-300 text-left">Profil Pelajar Pancasila</th>
                  <th className="p-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {RPL_ITEMS.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="p-2 border-r border-gray-300 font-mono text-[11px] whitespace-nowrap">
                      {idx + 1}. {item.code}
                    </td>
                    <td className="p-2 border-r border-gray-300 font-medium">
                      {item.topic}
                    </td>
                    <td className="p-2 border-r border-gray-300 font-bold">
                      {item.serviceType}
                    </td>
                    <td className="p-2 border-r border-gray-300 capitalize">
                      {item.guidanceArea}
                    </td>
                    <td className="p-2 border-r border-gray-300 text-[11px]">
                      {item.pancasilaProfile}
                    </td>
                    <td className="p-2 text-center text-[11px]">
                      <span className="font-semibold">{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ethics endorsement */}
          <div className="p-3 bg-gray-50 border border-gray-300 rounded text-xs mb-8">
            <p className="italic text-gray-700">
              "Seluruh proses pendampingan konseling dilakukan dengan mematuhi Kode Etik Bimbingan dan Konseling Indonesia (ABKIN), Asas Kerahasiaan, dan nilai-nilai Al-Islam Kemuhammadiyahan."
            </p>
          </div>

          {/* Formal Signatures Section */}
          <div className="grid grid-cols-2 gap-8 text-xs pt-4">
            <div className="text-center">
              <p>Mengetahui,</p>
              <p className="font-bold">Kepala SMA Muhammadiyah 1 Palangkaraya</p>
              <div className="h-20 flex items-center justify-center">
                <span className="text-gray-400 italic text-[11px]">[Tanda Tangan & Cap Lembaga]</span>
              </div>
              <p className="font-bold underline text-black">{COUNSELOR_INFO.principal.name}</p>
              <p className="text-gray-700">NIP. {COUNSELOR_INFO.principal.nip}</p>
            </div>

            <div className="text-center">
              <p>Palangka Raya, 26 Oktober 2026</p>
              <p className="font-bold">Guru Bimbingan dan Konseling,</p>
              <div className="h-20 flex items-center justify-center">
                <span className="text-gray-400 italic text-[11px]">[Tanda Tangan Digital Tersertifikasi]</span>
              </div>
              <p className="font-bold underline text-black">{COUNSELOR_INFO.name}</p>
              <p className="text-gray-700">NIP. {COUNSELOR_INFO.nip}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
