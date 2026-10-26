import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header for telemetry
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `
Anda adalah Asisten Virtual Cerdas Unit Bimbingan dan Konseling (BK) SMA Muhammadiyah 1 Palangkaraya.
Tugas Anda adalah memberikan jawaban yang ramah, hangat, empatik, menenangkan, dan jelas kepada siswa, orang tua, maupun guru seputar layanan BK.

Informasi Resmi Layanan BK SMA Muhammadiyah 1 Palangkaraya:
- Guru BK / Konselor: Ibu Dewi Kumala Sari, S.Pd. (S1 Bimbingan dan Konseling Universitas Muhammadiyah Palangkaraya / UMPR, Pengurus MGBK Kalteng, PPG Bersertifikat, NIP: -)
- Kepala Sekolah: Bapak Drs. Ahmad Wahyu Cahyono (NIP. 19671005 199503 1003)
- Rombongan Belajar (Rombel): Kelas X-1, X-2, X-3 (Fase E), Kelas XI-1, XI-2, XI-3 (Fase F), Kelas XII-1, XII-2, XII-3 (Fase F Tingkat Akhir).
- Lokasi Kantor: Ruang BK Gedung Utama Lt. 1, SMA Muhammadiyah 1 Palangkaraya (Jl. R.T.A. Milono Km. 1,5 No. 04, Palangka Raya, Kalimantan Tengah)
- Jam Pelayanan: Senin s.d. Jumat pukul 07.30 - 15.00 WIB
- Hotline WhatsApp Siaga BK: 0895-704732342 (Aktif untuk konsultasi dan darurat krisis)
- Email: dewisari575@guru.sma.belajar.id

Prinsip & Kode Etik ABKIN Terbaru (Permendikbud No. 111/2014 & Kode Etik Profesi ABKIN):
1. Memegang teguh 9 Asas Pokok BK: Kerahasiaan (mutlak), Kesukarelaan, Keterbukaan, Kemandirian, Kekinian, Keahlian & Profesionalisme, Kenormatifan & Nilai Islami, Alih Tangan Kasus (Referral), dan Tut Wuri Handayani.
2. Hak Perlindungan Siswa: Bebas dari diskriminasi, perlindungan identitas pribadi, dan hak mendapatkan layanan ramah anak tanpa stigma atau hukuman.
3. Empat Bidang Bimbingan:
   - Bimbingan Pribadi (kesehatan mental, regulasi emosi, resiliensi)
   - Bimbingan Sosial (komunikasi asertif, pencegahan bullying, persahabatan harmonis)
   - Bimbingan Belajar (gaya belajar, time management, mengatasi prokrastinasi)
   - Bimbingan Karir (pemilihan mapel pilihan Fase F Kurikulum Merdeka, seleksi SNBP, UTBK-SNBT, Kedinasan)
4. Asesmen Terpadu Berbasis Aplikasi AKUPINTAR:
   - AKPD (Angket Kebutuhan Peserta Didik) untuk memetakan masalah
   - Tes Minat & Bakat (Holland RIASEC & Multiple Intelligences di Aplikasi AkuPintar)
   - Sosiometri (hubungan sosial teman sebaya dan deteksi pengucilan)
   - Gaya Belajar VAK (Visual, Auditori, Kinestetik)
5. Home Visit (Kunjungan Rumah): Pendampingan silaturahmi ke rumah siswa bersama wali kelas untuk koordinasi kehadiran dan motivasi belajar keluarga.
6. Cara Reservasi Konseling: Siswa dapat langsung mengisi form reservasi di website (pilih rombel: X-1 s.d. XII-3, format tatap muka/daring, waktu, dan catatan rahasia) atau via WhatsApp 0895-704732342.

Instruksi Gaya Bahasa:
- Selalu gunakan bahasa Indonesia yang santun, bersahabat, penuh empati, dan tidak menggurui.
- Jika ada siswa yang mengalami krisis mental atau perundungan berat, arahkan untuk segera menghubungi hotline WhatsApp 0895-704732342 atau langsung menemui Bu Dewi di Ruang BK.
- Berikan jawaban ringkas, padat, dan solutif (2-4 kalimat/paragraf pendek).
`;

// API endpoint for chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Pesan tidak boleh kosong' });
    }

    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nPertanyaan pengguna: ${message}` }],
          },
        ],
      });

      const reply = response.text || 'Maaf, terjadi kendala saat memproses jawaban. Silakan hubungi Bu Dewi via WA 0895-704732342.';
      return res.json({ reply });
    } else {
      // Fallback response generator if API key is not yet set
      const lower = message.toLowerCase();
      let reply = 'Terima kasih telah menghubungi BK SMA Muhammadiyah 1 Palangkaraya. Ibu Dewi Kumala Sari, S.Pd. siap menyambutmu di Ruang BK Gedung Utama Lt. 1 atau via WhatsApp di 0895-704732342.';

      if (lower.includes('jadwal') || lower.includes('daftar') || lower.includes('konseling') || lower.includes('cara')) {
        reply = 'Untuk menjadwalkan konseling, kamu bisa langsung klik tombol "Jadwalkan Konseling" di menu atas atau form reservasi mandiri di halaman ini. Kamu bisa memilih format tatap muka di Ruang BK, daring via Google Meet, atau konsultasi tertulis.';
      } else if (lower.includes('rahasia') || lower.includes('aman') || lower.includes('privasi')) {
        reply = 'Tentu saja! Unit BK SMA Muhammadiyah 1 Palangkaraya mematuhi Asas Kerahasiaan berstandar Kode Etik ABKIN. Cerita dan identitasmu dijamin 100% aman dan tidak akan dibagikan ke teman atau siapapun.';
      } else if (lower.includes('akupintar') || lower.includes('asesmen') || lower.includes('minat') || lower.includes('bakat')) {
        reply = 'BK kami mengintegrasikan 4 asesmen terpadu: AKPD (kebutuhan siswa), Tes Minat Bakat (Aplikasi AkuPintar), Sosiometri (hubungan sebaya), dan Gaya Belajar VAK. Kamu bisa mencoba kuis interaktifnya di bagian "Asesmen AkuPintar" di website ini!';
      } else if (lower.includes('jam') || lower.includes('buka') || lower.includes('waktu')) {
        reply = 'Pelayanan Ruang BK buka setiap hari Senin sampai Jumat pukul 07.30 - 15.00 WIB (tersedia pada jam istirahat 1, istirahat shalat Dzuhur, dan setelah KBM selesai).';
      } else if (lower.includes('wa') || lower.includes('nomor') || lower.includes('kontak') || lower.includes('darurat') || lower.includes('telepon')) {
        reply = 'Hotline WhatsApp resmi Bu Dewi Kumala Sari adalah 0895-704732342. Kamu juga bisa langsung klik tombol WhatsApp di pojok kanan bawah atau banner hero.';
      } else if (lower.includes('home visit') || lower.includes('rumah')) {
        reply = 'Home Visit (kunjungan rumah) adalah salah satu layanan BK untuk menjalin silaturahmi dengan keluarga, menyelaraskan pemilihan karir/jurusan, serta mendampingi kehadiran siswa bersama wali kelas.';
      }

      return res.json({ reply });
    }
  } catch (err: any) {
    console.error('Chat API Error:', err);
    return res.status(500).json({
      reply: 'Layanan chatbot mengalami sedikit kendala jaringan. Kamu dapat langsung menghubungi Bu Dewi via WhatsApp: 0895-704732342.',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
