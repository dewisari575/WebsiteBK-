import React, { useState, useEffect } from 'react';
import { ASSESSMENT_TOOLS, INITIAL_ASSESSMENT_SHEET_RECORDS, SCHOOL_CLASSES } from '../data/bkData';
import { AssessmentTool, StudentAssessmentRecord } from '../types';
import {
  ClipboardCheck,
  Compass,
  Users,
  Brain,
  CheckCircle2,
  ExternalLink,
  Table,
  FileSpreadsheet,
  Download,
  Filter,
  Search,
  Check,
  RotateCcw,
  Sparkles,
  BarChart3,
  CalendarCheck,
  Trash2,
  UserX,
  Eye,
  AlertTriangle,
  QrCode,
  Printer,
  Smartphone
} from 'lucide-react';
import { QrCodeModal } from './QrCodeModal';
import { AllQrCodesModal } from './AllQrCodesModal';

interface AssessmentAkuPintarProps {
  onOpenBooking: () => void;
}

export const AssessmentAkuPintar: React.FC<AssessmentAkuPintarProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'akpd' | 'minat-bakat' | 'sosiometri' | 'gaya-belajar'>('akpd');
  const [viewMode, setViewMode] = useState<'test' | 'sheet'>('test');

  // QR Code Modals state
  const [selectedQrTool, setSelectedQrTool] = useState<AssessmentTool | null>(null);
  const [showAllQrModal, setShowAllQrModal] = useState(false);

  // Interactive AKPD state
  const [akpdChecks, setAkpdChecks] = useState<Record<string, boolean>>({});
  const [akpdResult, setAkpdResult] = useState<string | null>(null);

  // Interactive Gaya Belajar state
  const [vakAnswers, setVakAnswers] = useState<Record<number, 'V' | 'A' | 'K'>>({});
  const [vakResult, setVakResult] = useState<{ v: number; a: number; k: number; dominant: string } | null>(null);

  // Student Identity Input for live recording
  const [studentNameInput, setStudentNameInput] = useState('');
  const [studentClassInput, setStudentClassInput] = useState('Kelas X-1');
  
  // Initialize sheet records from localStorage or default empty array
  const [sheetRecords, setSheetRecords] = useState<StudentAssessmentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bk_sheet_records_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved sheet records:', e);
    }
    return INITIAL_ASSESSMENT_SHEET_RECORDS;
  });

  const [sheetSearch, setSheetSearch] = useState('');
  const [classFilter, setClassFilter] = useState('Semua Kelas');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [deleteNotice, setDeleteNotice] = useState<string | null>(null);

  // Save to localStorage whenever records change
  useEffect(() => {
    try {
      localStorage.setItem('bk_sheet_records_v2', JSON.stringify(sheetRecords));
    } catch (e) {
      console.warn('Failed to save sheet records:', e);
    }
  }, [sheetRecords]);

  // URLs state
  const [toolUrls] = useState<Record<string, { formUrl: string; sheetUrl: string }>>({
    akpd: {
      formUrl: ASSESSMENT_TOOLS[0].testFormUrl,
      sheetUrl: ASSESSMENT_TOOLS[0].googleSheetUrl,
    },
    'minat-bakat': {
      formUrl: ASSESSMENT_TOOLS[1].testFormUrl,
      sheetUrl: ASSESSMENT_TOOLS[1].googleSheetUrl,
    },
    sosiometri: {
      formUrl: ASSESSMENT_TOOLS[2].testFormUrl,
      sheetUrl: ASSESSMENT_TOOLS[2].googleSheetUrl,
    },
    'gaya-belajar': {
      formUrl: ASSESSMENT_TOOLS[3].testFormUrl,
      sheetUrl: ASSESSMENT_TOOLS[3].googleSheetUrl,
    },
  });

  // Sample AKPD items
  const akpdItems = [
    { id: 'p1', domain: 'Pribadi', text: 'Saya sering merasa cemas atau overthinking memikirkan masa depan.' },
    { id: 'p2', domain: 'Pribadi', text: 'Saya merasa kurang percaya diri saat harus berbicara di depan kelas.' },
    { id: 's1', domain: 'Sosial', text: 'Saya merasa sulit menolak ajakan teman sebaya meskipun itu merugikan saya.' },
    { id: 's2', domain: 'Sosial', text: 'Saya merasa ada perselisihan atau ketidakcocokan dalam kelompok pergaulan.' },
    { id: 'b1', domain: 'Belajar', text: 'Saya sering menunda-nunda pengerjaan tugas sekolah (prokrastinasi).' },
    { id: 'b2', domain: 'Belajar', text: 'Saya merasa kesulitan membagi waktu antara belajar, hobi, dan istirahat.' },
    { id: 'k1', domain: 'Karir', text: 'Saya masih bingung menentukan program studi kuliah yang sesuai bakat dan nilai rapor.' },
    { id: 'k2', domain: 'Karir', text: 'Saya membutuhkan informasi mendalam mengenai persyaratan beasiswa dan seleksi PTN/Kedinasan.' },
  ];

  const handleToggleAkpd = (id: string) => {
    setAkpdChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCalculateAkpd = () => {
    const counts: Record<string, number> = { Pribadi: 0, Sosial: 0, Belajar: 0, Karir: 0 };
    akpdItems.forEach((item) => {
      if (akpdChecks[item.id]) {
        counts[item.domain] = (counts[item.domain] || 0) + 1;
      }
    });

    let maxDomain = 'Karir';
    let maxVal = -1;
    Object.entries(counts).forEach(([dom, val]) => {
      if (val > maxVal) {
        maxVal = val;
        maxDomain = dom;
      }
    });

    const summaryText = maxVal === 0
      ? 'Seluruh aspek dalam keadaan prima'
      : `Prioritas: Bidang ${maxDomain} (${maxVal} indikator)`;

    setAkpdResult(summaryText);

    // If student entered name, append to live sheet!
    if (studentNameInput.trim()) {
      const now = new Date();
      const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const newRec: StudentAssessmentRecord = {
        id: `rec-${Date.now()}`,
        timestamp: dateStr,
        studentName: studentNameInput.trim(),
        gradeClass: studentClassInput,
        testType: 'akpd',
        resultSummary: summaryText,
        detailScore: `Pribadi: ${counts.Pribadi}, Sosial: ${counts.Sosial}, Belajar: ${counts.Belajar}, Karir: ${counts.Karir}`,
        followUp: `Konsultasi tindak lanjut bersama Bu Dewi untuk penguatan bidang ${maxDomain}`,
      };
      setSheetRecords([newRec, ...sheetRecords]);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    }
  };

  // VAK Questions
  const vakQuestions = [
    {
      id: 1,
      q: 'Ketika mempelajari materi baru di kelas, cara mana yang paling membantumu memahami?',
      options: [
        { label: 'Melihat diagram, bagan warna, peta konsep, atau video grafis', type: 'V' as const },
        { label: 'Mendengarkan penjelasan lisan guru, diskusi, atau rekaman audio', type: 'A' as const },
        { label: 'Praktik langsung, membuat model eksperimen, atau menulis catatan fisik', type: 'K' as const },
      ],
    },
    {
      id: 2,
      q: 'Ketika sedang santai atau beristirahat, kegiatan apa yang paling kamu sukai?',
      options: [
        { label: 'Membaca buku, komik, atau scrolling konten visual informatif', type: 'V' as const },
        { label: 'Mendengarkan musik, podcast edukatif, atau berbincang santai', type: 'A' as const },
        { label: 'Olahraga, merakit kerajinan tangan, atau berjalan-jalan aktif', type: 'K' as const },
      ],
    },
    {
      id: 3,
      q: 'Bagaimana caramu mengingat petunjuk jalan atau denah lokasi baru?',
      options: [
        { label: 'Membayangkan gambar peta atau patokan visual yang terlihat', type: 'V' as const },
        { label: 'Mengingat kata-kata arahan atau instruksi yang disebutkan seseorang', type: 'A' as const },
        { label: 'Berjalan langsung ke lokasinya sambil merasakan arah langkah', type: 'K' as const },
      ],
    },
  ];

  const handleSelectVak = (qId: number, type: 'V' | 'A' | 'K') => {
    const updated = { ...vakAnswers, [qId]: type };
    setVakAnswers(updated);

    if (Object.keys(updated).length === vakQuestions.length) {
      let vCount = 0;
      let aCount = 0;
      let kCount = 0;
      Object.values(updated).forEach((ans) => {
        if (ans === 'V') vCount++;
        if (ans === 'A') aCount++;
        if (ans === 'K') kCount++;
      });

      const total = vakQuestions.length;
      const vPct = Math.round((vCount / total) * 100);
      const aPct = Math.round((aCount / total) * 100);
      const kPct = Math.round((kCount / total) * 100);

      let dom = 'Visual';
      if (aCount > vCount && aCount >= kCount) dom = 'Auditori';
      if (kCount > vCount && kCount > aCount) dom = 'Kinestetik';

      setVakResult({ v: vPct, a: aPct, k: kPct, dominant: dom });

      // If student entered name, save to live sheet record
      if (studentNameInput.trim()) {
        const now = new Date();
        const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const newRec: StudentAssessmentRecord = {
          id: `rec-${Date.now()}`,
          timestamp: dateStr,
          studentName: studentNameInput.trim(),
          gradeClass: studentClassInput,
          testType: 'gaya-belajar',
          resultSummary: `Dominan ${dom} (V: ${vPct}%, A: ${aPct}%, K: ${kPct}%)`,
          detailScore: `Visual: ${vPct}% · Auditori: ${aPct}% · Kinestetik: ${kPct}%`,
          followUp: `Diferensiasi proses pembelajaran dengan modalitas ${dom}`,
        };
        setSheetRecords([newRec, ...sheetRecords]);
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 4000);
      }
    }
  };

  // Delete handlers requested by user
  const handleDeleteRow = (id: string, name: string) => {
    if (window.confirm(`Hapus data peserta ananda "${name}" dari Google Sheet ini?`)) {
      setSheetRecords((prev) => prev.filter((r) => r.id !== id));
      setDeleteNotice(`Data peserta "${name}" berhasil dihapus.`);
      setTimeout(() => setDeleteNotice(null), 3500);
    }
  };

  const handleClearCurrentSheet = () => {
    const currentToolName = activeToolData.shortTitle;
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus SELURUH peserta pada asesmen ${currentToolName}? Tindakan ini akan mengosongkan lembar respon.`
      )
    ) {
      setSheetRecords((prev) => prev.filter((r) => r.testType !== activeTab));
      setDeleteNotice(`Seluruh data peserta pada ${currentToolName} telah berhasil dikosongkan.`);
      setTimeout(() => setDeleteNotice(null), 3500);
    }
  };

  const handleClearAllAssessments = () => {
    if (
      window.confirm(
        'Apakah Anda yakin ingin menghapus seluruh peserta di SEMUA asesmen (AKPD, Sosiometri, Minat Bakat, dan Gaya Belajar)?'
      )
    ) {
      setSheetRecords([]);
      try {
        localStorage.removeItem('bk_sheet_records_v2');
      } catch (e) {
        console.warn(e);
      }
      setDeleteNotice('Seluruh data peserta dari semua asesmen telah berhasil dihapus secara bersih.');
      setTimeout(() => setDeleteNotice(null), 4000);
    }
  };

  const handleExportCsv = () => {
    const currentRecords = sheetRecords.filter((r) => r.testType === activeTab);
    const headers = ['No,Waktu,Nama Siswa,Kelas,Jenis Asesmen,Hasil Ringkas,Rincian Skor,Tindak Lanjut'];
    const rows = currentRecords.map((r, i) =>
      `"${i + 1}","${r.timestamp}","${r.studentName}","${r.gradeClass}","${r.testType.toUpperCase()}","${r.resultSummary}","${r.detailScore || '-'}","${r.followUp}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_GoogleSheet_${activeTab.toUpperCase()}_SMA_Muhammadiyah_1.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeToolData = ASSESSMENT_TOOLS.find((t) => t.id === activeTab) || ASSESSMENT_TOOLS[0];
  const currentUrls = toolUrls[activeTab];

  // Filtered records for the active tab's Google Sheet table
  const filteredSheetRecords = sheetRecords.filter((rec) => {
    const matchType = rec.testType === activeTab;
    const matchClass = classFilter === 'Semua Kelas' || rec.gradeClass.includes(classFilter);
    const matchSearch =
      sheetSearch === '' ||
      rec.studentName.toLowerCase().includes(sheetSearch.toLowerCase()) ||
      rec.gradeClass.toLowerCase().includes(sheetSearch.toLowerCase()) ||
      rec.resultSummary.toLowerCase().includes(sheetSearch.toLowerCase());
    return matchType && matchClass && matchSearch;
  });

  const totalRespondentsInCurrentTab = sheetRecords.filter((r) => r.testType === activeTab).length;

  return (
    <section id="asesmen" className="py-12 md:py-16 bg-[#fbf9f3]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#608066] uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-[#C29B38]" />
            <span>Integrasi Instrumen & Rekapitulasi Data Siswa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#163328]">
            Asesmen BK Terpadu & Google Sheet Hasil Siswa
          </h2>
          <p className="text-sm sm:text-base text-[#4F5E56] mt-2 font-normal">
            Alat tes asesmen tertaut langsung ke instrumen tes masing-masing dan rekapitulasi hasil asesmen peserta didik tertaut pada Google Sheet yang memuat identitas, nama, dan kelas.
          </p>
        </div>

        {/* Delete Feedback Toast */}
        {deleteNotice && (
          <div className="max-w-3xl mx-auto mb-6 p-3 bg-[#c5e9ca]/60 border border-[#adcebe] text-[#163328] rounded-xl text-xs font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2D4A3E]" />
              <span>{deleteNotice}</span>
            </div>
            <button
              onClick={() => setDeleteNotice(null)}
              className="text-xs text-[#2D4A3E] hover:underline"
            >
              Tutup
            </button>
          </div>
        )}

        {/* 4 Tool Selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { id: 'akpd' as const, title: '1. AKPD Kebutuhan', icon: ClipboardCheck, subtitle: 'Identifikasi 4 Bidang' },
            { id: 'minat-bakat' as const, title: '2. Tes Minat Bakat', icon: Compass, subtitle: 'AkuPintar Peta Karir' },
            { id: 'sosiometri' as const, title: '3. Sosiometri', icon: Users, subtitle: 'Dinamika Sebaya' },
            { id: 'gaya-belajar' as const, title: '4. Gaya Belajar', icon: Brain, subtitle: 'Modalitas VAK' },
          ].map((tab) => {
            const isCurrent = activeTab === tab.id;
            const Icon = tab.icon;
            const countInTab = sheetRecords.filter((r) => r.testType === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'border-[#2D4A3E] bg-[#EBF2EC] text-[#163328] shadow-xs'
                    : 'border-[#E5ECE6] bg-white text-[#4F5E56] hover:bg-[#FAF9F5]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold">{tab.title}</span>
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-[#2D4A3E]' : 'text-[#727974]'}`} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#727974]">
                  <span>{tab.subtitle}</span>
                  <span className="font-mono font-bold text-[#2D4A3E]">({countInTab})</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-2xl border border-[#E5ECE6] p-6 sm:p-8 shadow-xs">
          
          {/* Top Info Bar of Current Tool with Direct External Links */}
          <div className="pb-6 mb-6 border-b border-[#E5ECE6] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-[#6E5517] bg-[#FCF9EE] border border-[#C29B38]/40 px-2.5 py-0.5 rounded-full inline-block">
                  {activeToolData.appSource}
                </span>
                <span className="text-xs text-[#727974]">·</span>
                <span className="text-xs text-[#608066] font-medium">
                  Sheet: {activeToolData.sheetName}
                </span>
                <span className="text-xs text-[#727974]">·</span>
                <span className="text-xs font-bold text-[#2D4A3E]">
                  {totalRespondentsInCurrentTab} Peserta Terdata
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#163328]">
                {activeToolData.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4F5E56] mt-1 max-w-2xl">
                {activeToolData.desc}
              </p>
            </div>

            {/* Direct Links for Test Form, Google Sheet, and QR Code Generator */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {/* Button: Generate QR Code for Current Assessment */}
              <button
                type="button"
                onClick={() => setSelectedQrTool(activeToolData)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-[#163328] bg-[#FCF9EE] hover:bg-[#F5EED2] border border-[#C29B38]/50 rounded-lg transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                title="Tampilkan Kode QR untuk dipindai siswa lewat kamera HP"
              >
                <QrCode className="w-3.5 h-3.5 text-[#C29B38]" />
                <span>Kode QR HP</span>
              </button>

              {/* Button: Generate All 4 QR Codes Poster (Printable) */}
              <button
                type="button"
                onClick={() => setShowAllQrModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-[#2D4A3E] bg-[#EBF2EC] hover:bg-[#DDE8DE] border border-[#CFDED1] rounded-lg transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                title="Cetak lembar poster berisikan 4 QR Code untuk ditempel di mading kelas"
              >
                <Printer className="w-3.5 h-3.5 text-[#2D4A3E]" />
                <span className="hidden sm:inline">Cetak Poster 4 QR</span>
                <span className="sm:hidden">Poster 4 QR</span>
              </button>

              {/* Button 1: Tautan Alat Tes */}
              <a
                href={currentUrls.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors shadow-2xs whitespace-nowrap"
                title="Buka form instrumen alat tes di tab baru"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#c9ead9]" />
                <span>Buka Alat Tes</span>
              </a>

              {/* Button 2: Tautan Google Sheet Hasil Siswa */}
              <a
                href={currentUrls.sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-[#163328] bg-white hover:bg-[#FAF9F5] border border-[#CFDED1] rounded-lg transition-colors whitespace-nowrap"
                title="Buka Google Sheet rekapitulasi hasil siswa"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#107c41]" />
                <span>Google Sheet</span>
              </a>
            </div>
          </div>

          {/* Sub-navigation: Switch between Interactive Test & Google Sheet Live Table */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-2 bg-[#FAF9F5] border border-[#E5ECE6] rounded-xl">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewMode('test')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                  viewMode === 'test'
                    ? 'bg-[#2D4A3E] text-white shadow-2xs'
                    : 'text-[#4F5E56] hover:text-[#163328]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Lembar Tes Interaktif Siswa</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('sheet')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                  viewMode === 'sheet'
                    ? 'bg-[#2D4A3E] text-white shadow-2xs'
                    : 'text-[#4F5E56] hover:text-[#163328]'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Rekap Google Sheet Siswa ({totalRespondentsInCurrentTab} Peserta)</span>
              </button>
            </div>

            <span className="text-[11px] text-[#727974] px-2 hidden sm:block">
              {viewMode === 'test' ? 'Uji langsung & rekam nama/kelas' : 'Manajemen identitas & respon siswa'}
            </span>
          </div>

          {/* Student Identity Banner */}
          {viewMode === 'test' && (
            <div className="mb-6 p-4 bg-[#fbf9f3] border border-[#E5ECE6] rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#163328]">Identitas Peserta Didik Baru:</span>
                <span className="text-[11px] text-[#727974]">(Akan otomatis tersimpan di baris Google Sheet)</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="Ketik Nama Lengkap Siswa..."
                  value={studentNameInput}
                  onChange={(e) => setStudentNameInput(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-[#D6E0D8] rounded-lg text-[#1A2821] focus:outline-none focus:border-[#2D4A3E] min-w-[200px]"
                />
                <select
                  value={studentClassInput}
                  onChange={(e) => setStudentClassInput(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-white border border-[#D6E0D8] rounded-lg text-[#1A2821] focus:outline-none focus:border-[#2D4A3E]"
                >
                  {SCHOOL_CLASSES.map((cls) => (
                    <option key={cls} value={`Kelas ${cls}`}>
                      Kelas {cls}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setSelectedQrTool(activeToolData)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#163328] bg-white border border-[#C29B38]/60 hover:bg-[#FCF9EE] rounded-lg transition-colors cursor-pointer shadow-2xs"
                  title="Tampilkan QR code instrumen tes ini untuk dipindai via HP"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#2D4A3E]" />
                  <span>Scan QR di HP</span>
                </button>
              </div>
            </div>
          )}

          {/* VIEW MODE 1: INTERACTIVE TEST */}
          {viewMode === 'test' && (
            <div>
              {/* TAB 1: AKPD */}
              {activeTab === 'akpd' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#E5ECE6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-[#163328] uppercase tracking-wider mb-0.5">
                        Simulasi Instrumen AKPD (Angket Kebutuhan Peserta Didik)
                      </h4>
                      <p className="text-xs text-[#4F5E56]">
                        Centang indikator masalah yang kamu rasakan, lalu klik analisis untuk merekam ke Google Sheet:
                      </p>
                    </div>
                    <a
                      href={currentUrls.formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#2D4A3E] hover:underline flex items-center gap-1 shrink-0"
                    >
                      <span>Buka Versi Google Form Lengkap</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {akpdItems.map((item) => {
                      const isChecked = !!akpdChecks[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleToggleAkpd(item.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                            isChecked
                              ? 'border-[#2D4A3E] bg-[#EBF2EC]/60 shadow-2xs'
                              : 'border-[#E5ECE6] hover:border-[#608066]/50 bg-white'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                              isChecked
                                ? 'bg-[#2D4A3E] border-[#2D4A3E] text-white'
                                : 'border-[#A4B7A9] bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div className="flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#608066] block mb-0.5">
                              Bidang {item.domain}
                            </span>
                            <p className="text-xs text-[#1A2821] font-medium leading-relaxed">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-[#727974]">
                      {Object.values(akpdChecks).filter(Boolean).length} dari {akpdItems.length} indikator tercentang
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setAkpdChecks({});
                          setAkpdResult(null);
                        }}
                        className="px-3 py-2 text-xs text-[#727974] hover:text-[#163328] flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Pilihan</span>
                      </button>
                      <button
                        onClick={handleCalculateAkpd}
                        className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>Analisis & Simpan ke Google Sheet</span>
                      </button>
                    </div>
                  </div>

                  {submitSuccess && (
                    <div className="p-3 bg-[#c5e9ca]/40 border border-[#adcebe] rounded-lg text-xs text-[#163328] flex items-center gap-2 animate-fadeIn">
                      <Check className="w-4 h-4 text-[#2D4A3E]" />
                      <span>Data identitas ananda <strong>{studentNameInput} ({studentClassInput})</strong> berhasil terekam ke baris Google Sheet AKPD!</span>
                    </div>
                  )}

                  {akpdResult && (
                    <div className="p-4 bg-[#FAF4E6] border border-[#ffdf99] rounded-xl text-xs text-[#3c2c00] leading-relaxed animate-fadeIn">
                      <strong className="block text-sm font-bold text-[#7D5F18] mb-1">
                        Hasil Pemetaan AKPD:
                      </strong>
                      {akpdResult}. Silakan cek tab <strong>Rekap Google Sheet</strong> untuk melihat catatan ledger resmi.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Tes Minat Bakat (AkuPintar) */}
              {activeTab === 'minat-bakat' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    <div className="space-y-4 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#163328] mb-2">
                          Portal Penelusuran Minat & Bakat Resmi AkuPintar
                        </h4>
                        <p className="text-xs text-[#4F5E56] leading-relaxed mb-3">
                          Siswa SMA Muhammadiyah 1 Palangkaraya dapat mengerjakan asesmen psikometrik resmi langsung di portal <strong>AkuPintar</strong>. Hasil tes akan otomatis disinkronisasikan ke lembar rekapitulasi Google Sheet bimbingan karir Ibu Dewi.
                        </p>
                        <ul className="space-y-2 text-xs text-[#1A2821]">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#2D4A3E] shrink-0 mt-0.5" />
                            <span><strong>Tes Minat Pintar (Holland RIASEC):</strong> 6 tipe kepribadian karir.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#2D4A3E] shrink-0 mt-0.5" />
                            <span><strong>Tes Bakat Pintar:</strong> Penelusuran kecerdasan majemuk dan gaya pemecahan masalah.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#2D4A3E] shrink-0 mt-0.5" />
                            <span><strong>Simulasi Jurusan SNBP & UTBK:</strong> Rekomendasi prodi PTN/PTS dan tingkat ketetatan.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-2 flex flex-wrap gap-2">
                        <a
                          href={currentUrls.formUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors shadow-xs"
                        >
                          <span>Buka Tes di Aplikasi AkuPintar</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#c9ead9]" />
                        </a>
                        <button
                          type="button"
                          onClick={() => setViewMode('sheet')}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#2D4A3E] bg-[#EBF2EC] hover:bg-[#DDE8DE] rounded-lg border border-[#CFDED1]"
                        >
                          <FileSpreadsheet className="w-4 h-4 text-[#107c41]" />
                          <span>Lihat Rekap Hasil Siswa ({totalRespondentsInCurrentTab})</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#FAF9F5] p-5 rounded-xl border border-[#E5ECE6] flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#608066] uppercase tracking-wider block mb-2">
                          Integrasi Google Sheet BK SMA Muhammadiyah 1
                        </span>
                        <p className="text-xs text-[#4F5E56] leading-relaxed mb-3">
                          Seluruh skor tipe kepribadian RIASEC, rekomendasi program studi, dan pilihan mata pelajaran pilihan terangkum dalam Google Sheet <strong>{activeToolData.sheetName}</strong>.
                        </p>
                        <div className="p-3 bg-white rounded-lg border border-[#E5ECE6] text-xs space-y-1">
                          <div className="flex justify-between">
                            <span className="text-[#727974]">Responden Terdata:</span>
                            <span className="font-bold text-[#163328]">{totalRespondentsInCurrentTab} Siswa</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#727974]">Fase Pembelajaran:</span>
                            <span className="font-bold text-[#163328]">Kelas X, XI, & XII</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#727974]">Status Sinkronisasi:</span>
                            <span className="text-[#107c41] font-bold">Aktif & Siap Menerima Data</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#E5ECE6]">
                        <button
                          onClick={onOpenBooking}
                          className="w-full py-2.5 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          <CalendarCheck className="w-3.5 h-3.5" />
                          <span>Konsultasi Minat Bakat Bersama Bu Dewi</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Sosiometri */}
              {activeTab === 'sosiometri' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#E5ECE6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-[#163328] uppercase tracking-wider mb-0.5">
                        Instrumen Sosiometri Hubungan Teman Sebaya
                      </h4>
                      <p className="text-xs text-[#4F5E56]">
                        Digunakan untuk memetakan hubungan sosial, teman belajar kooperatif, dan deteksi siswa terisolasi:
                      </p>
                    </div>
                    <a
                      href={currentUrls.formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#2D4A3E] hover:underline flex items-center gap-1 shrink-0"
                    >
                      <span>Buka Google Form Sosiometri</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-white rounded-xl border border-[#E5ECE6]">
                      <strong className="text-sm font-bold text-[#163328] block mb-1">
                        Format Pengisian Sosiometri Siswa
                      </strong>
                      <p className="text-[#4F5E56] leading-relaxed mb-3">
                        Setiap siswa kelas X dan XI mengisi 2 pertanyaan rahasia melalui Google Form terenkripsi:
                      </p>
                      <ol className="list-decimal pl-4 space-y-1.5 text-[#1A2821]">
                        <li>"Sebutkan 3 teman di kelasmu yang paling kamu sukai untuk diajak bekerja sama dalam tugas kelompok belajar!"</li>
                        <li>"Sebutkan 2 teman di kelasmu yang paling membuatmu merasa nyaman untuk bercerita atau berbagi keluh kesah!"</li>
                      </ol>
                    </div>

                    <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#E5ECE6] flex flex-col justify-between">
                      <div>
                        <strong className="text-sm font-bold text-[#163328] block mb-1">
                          Output Sosiogram & Google Sheet
                        </strong>
                        <p className="text-[#4F5E56] leading-relaxed">
                          Jawaban langsung terakumulasi pada Google Sheet <strong>Rekap_Hasil_Sosiometri_Siswa</strong> untuk menghasilkan matriks sosiometri kelas otomatis.
                        </p>
                      </div>

                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={() => setViewMode('sheet')}
                          className="w-full py-2.5 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          <FileSpreadsheet className="w-4 h-4 text-[#c9ead9]" />
                          <span>Buka Data Rekap Sosiometri Siswa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Gaya Belajar VAK */}
              {activeTab === 'gaya-belajar' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#E5ECE6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-[#163328] uppercase tracking-wider mb-0.5">
                        Uji Singkat Modalitas Gaya Belajar (VAK)
                      </h4>
                      <p className="text-xs text-[#4F5E56]">
                        Jawab pertanyaan di bawah ini untuk melihat persentase gaya belajarmu dan otomatis merekam ke Google Sheet:
                      </p>
                    </div>
                    <a
                      href={currentUrls.formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#2D4A3E] hover:underline flex items-center gap-1 shrink-0"
                    >
                      <span>Buka Form Lengkap VAK</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="space-y-4">
                    {vakQuestions.map((q, idx) => (
                      <div key={q.id} className="p-4 bg-[#FAF9F5] rounded-xl border border-[#E5ECE6]">
                        <p className="text-xs font-bold text-[#163328] mb-2.5">
                          {idx + 1}. {q.q}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {q.options.map((opt, oIdx) => {
                            const isChosen = vakAnswers[q.id] === opt.type;
                            return (
                              <button
                                key={oIdx}
                                type="button"
                                onClick={() => handleSelectVak(q.id, opt.type)}
                                className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                                  isChosen
                                    ? 'bg-[#2D4A3E] text-white border-[#2D4A3E] font-medium shadow-2xs'
                                    : 'bg-white text-[#4F5E56] border-[#D6E0D8] hover:bg-[#FAF9F5]'
                                }`}
                              >
                                <span className="font-bold text-[11px] block opacity-80 mb-0.5">
                                  Pilihan {String.fromCharCode(65 + oIdx)}:
                                </span>
                                <span>{opt.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {vakResult && (
                    <div className="p-5 bg-[#EBF2EC] border border-[#CFDED1] rounded-xl animate-fadeIn space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-[#608066] uppercase tracking-wider block">
                            Hasil Analisis Modalitas:
                          </span>
                          <h4 className="text-base font-bold text-[#163328]">
                            Dominan Gaya Belajar: {vakResult.dominant}
                          </h4>
                        </div>
                        <div className="flex gap-2 text-xs font-mono font-bold">
                          <span className="px-2 py-1 bg-white rounded border border-[#CFDED1] text-[#2D4A3E]">
                            V: {vakResult.v}%
                          </span>
                          <span className="px-2 py-1 bg-white rounded border border-[#CFDED1] text-[#2D4A3E]">
                            A: {vakResult.a}%
                          </span>
                          <span className="px-2 py-1 bg-white rounded border border-[#CFDED1] text-[#2D4A3E]">
                            K: {vakResult.k}%
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#2D4A3E] leading-relaxed">
                        {vakResult.dominant === 'Visual' &&
                          'Kamu paling cepat memahami materi dengan membaca, melihat rangkuman diagram warna, peta pikiran (mind map), dan grafik.'}
                        {vakResult.dominant === 'Auditori' &&
                          'Kamu paling optimal saat mendengarkan penjelasan lisan, berdiskusi dua arah, dan mengulang kembali materi dengan bersuara perlahan.'}
                        {vakResult.dominant === 'Kinestetik' &&
                          'Kamu paling efektif saat belajar sambil bergerak, menulis rangkuman tangan, simulasi peran, atau melakukan praktikum eksperimen langsung.'}
                      </p>

                      <div className="pt-2 flex justify-between items-center text-xs text-[#727974] border-t border-[#CFDED1]">
                        <span>Terekam ke Google Sheet: <strong>{activeToolData.sheetName}</strong></span>
                        <button
                          type="button"
                          onClick={() => setViewMode('sheet')}
                          className="font-bold text-[#2D4A3E] hover:underline"
                        >
                          Buka Lembar Sheet Siswa →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* VIEW MODE 2: GOOGLE SHEET REKAPITULASI HASIL SISWA */}
          {viewMode === 'sheet' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Spreadsheet Header Bar */}
              <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#E5ECE6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#107c41] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <FileSpreadsheet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#163328]">
                        Google Sheets: {activeToolData.sheetName}
                      </h4>
                      <span className="text-[11px] font-mono text-[#107c41] bg-[#EBF2EC] px-2 py-0.5 rounded border border-[#CFDED1] font-bold">
                        {totalRespondentsInCurrentTab} Responden
                      </span>
                    </div>
                    <p className="text-xs text-[#727974]">
                      Rekapitulasi resmi data identitas siswa, nama, kelas, dan hasil asesmen {activeToolData.shortTitle}.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Delete / Clear Sheet Button requested by user */}
                  {totalRespondentsInCurrentTab > 0 && (
                    <button
                      onClick={handleClearCurrentSheet}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                      title="Hapus seluruh peserta pada asesmen ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Kosongkan Peserta Sheet Ini</span>
                    </button>
                  )}

                  {sheetRecords.length > 0 && (
                    <button
                      onClick={handleClearAllAssessments}
                      className="inline-flex items-center gap-1 px-2.5 py-2 text-[11px] font-medium text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors cursor-pointer"
                      title="Hapus seluruh data peserta di semua asesmen"
                    >
                      <UserX className="w-3.5 h-3.5" />
                      <span>Hapus Semua Asesmen</span>
                    </button>
                  )}

                  <button
                    onClick={handleExportCsv}
                    disabled={filteredSheetRecords.length === 0}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#163328] bg-white hover:bg-[#FAF9F5] border border-[#D6E0D8] rounded-lg transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
                    title="Unduh format spreadsheet CSV"
                  >
                    <Download className="w-3.5 h-3.5 text-[#2D4A3E]" />
                    <span>Unduh CSV</span>
                  </button>

                  <a
                    href={currentUrls.sheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#107c41] hover:bg-[#0c6334] rounded-lg transition-colors shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Buka di Google Drive</span>
                  </a>
                </div>
              </div>

              {/* Table Filter & Search Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[#727974]" />
                  <select
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-[#D6E0D8] rounded-lg text-[#1A2821] focus:outline-none focus:border-[#2D4A3E]"
                  >
                    <option value="Semua Kelas">Semua Kelas</option>
                    <optgroup label="Kelas X (Fase E)">
                      <option value="X-1">Kelas X-1</option>
                      <option value="X-2">Kelas X-2</option>
                      <option value="X-3">Kelas X-3</option>
                    </optgroup>
                    <optgroup label="Kelas XI (Fase F)">
                      <option value="XI-1">Kelas XI-1</option>
                      <option value="XI-2">Kelas XI-2</option>
                      <option value="XI-3">Kelas XI-3</option>
                    </optgroup>
                    <optgroup label="Kelas XII (Fase F)">
                      <option value="XII-1">Kelas XII-1</option>
                      <option value="XII-2">Kelas XII-2</option>
                      <option value="XII-3">Kelas XII-3</option>
                    </optgroup>
                  </select>
                </div>

                <div className="relative min-w-[220px]">
                  <input
                    type="text"
                    placeholder="Cari nama siswa / kelas..."
                    value={sheetSearch}
                    onChange={(e) => setSheetSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#D6E0D8] rounded-lg text-[#1A2821] focus:outline-none focus:border-[#2D4A3E]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#727974] absolute left-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Interactive Google Sheet Table */}
              <div className="bg-white rounded-xl border border-[#E5ECE6] overflow-hidden shadow-2xs">
                {filteredSheetRecords.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAF9F5] border-b border-[#E5ECE6] text-[#727974] uppercase tracking-wider font-semibold">
                        <tr>
                          <th className="py-2.5 px-3 text-center w-10">No</th>
                          <th className="py-2.5 px-3">Waktu</th>
                          <th className="py-2.5 px-3 font-bold text-[#163328]">Nama Siswa</th>
                          <th className="py-2.5 px-3 font-bold text-[#163328]">Tingkat & Kelas</th>
                          <th className="py-2.5 px-3">Hasil Asesmen</th>
                          <th className="py-2.5 px-3">Rincian Skor</th>
                          <th className="py-2.5 px-3">Tindak Lanjut BK</th>
                          <th className="py-2.5 px-3 text-center w-14">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5ECE6] text-[#1A2821]">
                        {filteredSheetRecords.map((row, idx) => (
                          <tr key={row.id} className="hover:bg-[#FAF9F5] transition-colors">
                            <td className="py-3 px-3 text-center font-mono text-[#727974] tabular-nums">
                              {idx + 1}
                            </td>
                            <td className="py-3 px-3 font-mono text-[11px] text-[#727974] whitespace-nowrap">
                              {row.timestamp}
                            </td>
                            <td className="py-3 px-3 font-bold text-[#163328] whitespace-nowrap">
                              {row.studentName}
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className="font-semibold px-2 py-0.5 rounded bg-[#f0eee8] text-[#2D4A3E] border border-[#E5ECE6]">
                                {row.gradeClass}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-medium text-[#163328]">
                              {row.resultSummary}
                            </td>
                            <td className="py-3 px-3 text-[11px] text-[#4F5E56] font-mono">
                              {row.detailScore || '-'}
                            </td>
                            <td className="py-3 px-3 text-xs text-[#608066] font-medium">
                              {row.followUp}
                            </td>
                            <td className="py-3 px-3 text-center whitespace-nowrap">
                              <button
                                onClick={() => handleDeleteRow(row.id, row.studentName)}
                                className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                                title={`Hapus peserta ${row.studentName}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-14 px-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#FAF9F5] border border-[#E5ECE6] text-[#727974] flex items-center justify-center mx-auto mb-3">
                      <UserX className="w-6 h-6 text-[#A4B7A9]" />
                    </div>
                    <h4 className="text-sm font-bold text-[#163328] mb-1">
                      Data Peserta Saat Ini Bersih (0 Responden)
                    </h4>
                    <p className="text-xs text-[#4F5E56] max-w-md mx-auto leading-relaxed mb-4">
                      Seluruh peserta lama telah berhasil dihapus. Lembar Google Sheet <strong>{activeToolData.sheetName}</strong> kini dalam kondisi bersih dan siap menerima data pengisian baru peserta didik SMA Muhammadiyah 1 Palangkaraya.
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setViewMode('test')}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#1F362D] rounded-lg transition-colors cursor-pointer"
                      >
                        Buka Lembar Pengisian Tes
                      </button>
                      <a
                        href={currentUrls.formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-xs font-semibold text-[#2D4A3E] bg-[#EBF2EC] hover:bg-[#DDE8DE] rounded-lg border border-[#CFDED1] transition-colors"
                      >
                        Buka Google Form Tes
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Sheet Footer Assurance */}
              <div className="p-3 bg-[#FAF9F5] border border-[#E5ECE6] rounded-xl flex items-center justify-between text-xs text-[#4F5E56]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#107c41]" />
                  <span>Data Google Sheet terlindungi enkripsi dan hanya dapat diakses oleh Guru BK <strong>Ibu Dewi Kumala Sari, S.Pd.</strong></span>
                </span>
                <span className="text-[11px] text-[#727974] hidden md:inline">
                  Standar MGBK Kalteng & Permendikbud No. 111/2014
                </span>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Single Assessment QR Code Modal */}
      {selectedQrTool && (
        <QrCodeModal
          tool={selectedQrTool}
          onClose={() => setSelectedQrTool(null)}
        />
      )}

      {/* 4-in-1 Printable Assessment QR Codes Poster */}
      {showAllQrModal && (
        <AllQrCodesModal
          onClose={() => setShowAllQrModal(false)}
        />
      )}
    </section>
  );
};
