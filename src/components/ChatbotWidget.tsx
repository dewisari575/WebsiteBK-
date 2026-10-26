import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, User, Minimize2, Phone, CalendarCheck, ShieldCheck } from 'lucide-react';
import { COUNSELOR_INFO } from '../data/bkData';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

interface ChatbotWidgetProps {
  onOpenBooking: () => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'bot',
      text: 'Assalamu’alaikum! Halo, saya Asisten Virtual BK SMA Muhammadiyah 1 Palangkaraya. Ada yang bisa saya bantu seputar konsultasi bersama Bu Dewi Kumala Sari, S.Pd., asesmen AkuPintar, atau informasi lainnya?',
      timestamp: 'Sekarang',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    '📅 Bagaimana cara menjadwalkan konseling?',
    '🔒 Apakah curhat di BK dijamin rahasia?',
    '🧭 Apa saja asesmen AkuPintar di BK?',
    '⏰ Kapan jam buka dan lokasi ruang BK?',
    '📱 Berapa nomor WA / Hotline BK?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
      });

      if (!response.ok) {
        throw new Error('Gagal memuat respon dari server');
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'Terima kasih atas pertanyaannya. Untuk respon langsung dari Bu Dewi, kamu bisa menghubungi WA 0895-704732342.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn('Fallback response triggered:', err);
      // Local graceful fallback
      let fallbackText = 'Terima kasih atas pertanyaannya. Layanan BK SMA Muhammadiyah 1 Palangkaraya diampu oleh Ibu Dewi Kumala Sari, S.Pd. dengan jaminan 100% Asas Kerahasiaan ABKIN. Silakan hubungi WA 0895-704732342 atau jadwalkan sesi tatap muka di Ruang BK Gedung Utama Lt. 1.';
      
      const lower = text.toLowerCase();
      if (lower.includes('jadwal') || lower.includes('konseling') || lower.includes('daftar')) {
        fallbackText = 'Kamu bisa langsung menjadwalkan konseling melalui form "Jadwal Konseling" di website ini. Pilihlah bidang bimbingan dan waktu istirahat atau sepulang sekolah yang paling nyaman bagimu.';
      } else if (lower.includes('rahasia') || lower.includes('aman') || lower.includes('privasi')) {
        fallbackText = 'Sangat aman! Seluruh sesi konseling dilindungi Asas Kerahasiaan berstandar Kode Etik ABKIN dan Permendikbud No. 111/2014. Ruang BK adalah tempat yang aman untuk didengar tanpa dihakimi.';
      } else if (lower.includes('asesmen') || lower.includes('akupintar') || lower.includes('minat') || lower.includes('bakat')) {
        fallbackText = 'BK kami menyediakan 4 asesmen terpadu: AKPD (kebutuhan siswa), Tes Minat Bakat (Aplikasi AkuPintar), Sosiometri (hubungan sebaya), dan Gaya Belajar VAK. Kamu bisa mencoba kuis interaktifnya di bagian "Asesmen AkuPintar" pada menu atas!';
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button (when closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#2D4A3E] hover:bg-[#1F362D] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-[#c5e9ca]/30"
          aria-label="Buka Chatbot AI BK"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/40 shrink-0 bg-[#EBF2EC]">
              <img
                src={COUNSELOR_INFO.photoUrl}
                alt="Bu Dewi Kumala Sari"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#C29B38] ring-2 ring-[#2D4A3E]" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-bold block leading-tight">Tanya AI BK</span>
            <span className="text-[10px] text-[#c9ead9] leading-tight block">Respon Cepat 24/7</span>
          </div>
        </button>
      )}

      {/* Expanded Chat Box Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] max-h-[85vh] bg-[#fbf9f3] rounded-2xl shadow-2xl border border-[#E5ECE6] flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="bg-[#2D4A3E] text-white p-3.5 px-4 flex items-center justify-between border-b border-[#1F362D]">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/60 shrink-0 bg-[#EBF2EC]">
                <img
                  src={COUNSELOR_INFO.photoUrl}
                  alt="Ibu Dewi Kumala Sari, S.Pd."
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-xs font-bold leading-tight flex items-center gap-1.5">
                  <span>Tanya AI BK</span>
                  <span className="text-[10px] bg-[#C29B38] text-white px-1.5 py-0.2 rounded font-mono">
                    AI
                  </span>
                </h3>
                <span className="text-[11px] text-[#c9ead9] block leading-tight">
                  Unit BK SMA Muhammadiyah 1
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
                title="Tutup Obrolan"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Info & Ethics Reminder */}
          <div className="bg-[#FAF9F5] px-3.5 py-2 border-b border-[#E5ECE6] flex items-center justify-between text-[11px] text-[#4F5E56]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2D4A3E]" />
              Kerahasiaan ABKIN Terjamin
            </span>
            <a
              href={COUNSELOR_INFO.waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2D4A3E] font-semibold hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#25D366]" />
              <span>WA: 0895-704732342</span>
            </a>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#2D4A3E] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    BK
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#2D4A3E] text-white rounded-br-xs'
                      : 'bg-white text-[#1A2821] border border-[#E5ECE6] rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-[#727974]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#727974] py-1">
                <div className="w-6 h-6 rounded-full bg-[#EBF2EC] text-[#2D4A3E] flex items-center justify-center shrink-0 text-[10px]">
                  <Bot className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div className="bg-white border border-[#E5ECE6] p-2.5 px-3 rounded-2xl shadow-2xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#608066] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#608066] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#608066] rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-[#727974] ml-1">Mengetik jawaban...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Preset FAQ Pills */}
          <div className="px-3 py-2 bg-[#FAF9F5] border-t border-[#E5ECE6] overflow-x-auto">
            <span className="text-[10px] font-bold text-[#727974] uppercase tracking-wider block mb-1">
              Pertanyaan Cepat:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(q.replace(/^[^\s]+ /, ''))}
                  className="text-[11px] px-2.5 py-1 bg-white hover:bg-[#EBF2EC] border border-[#D6E0D8] rounded-full text-[#2D4A3E] whitespace-nowrap cursor-pointer transition-colors shadow-2xs"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-[#E5ECE6] flex items-center gap-2">
            <input
              type="text"
              placeholder="Ketik pertanyaan seputar BK..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 px-3 py-2 text-xs bg-[#fbf9f3] border border-[#D6E0D8] rounded-xl text-[#1A2821] placeholder-[#7D8D83] focus:outline-none focus:border-[#2D4A3E] focus:ring-1 focus:ring-[#608066]"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputText.trim()}
              className="p-2 bg-[#2D4A3E] hover:bg-[#1F362D] disabled:opacity-50 text-white rounded-xl transition-colors cursor-pointer shrink-0"
              title="Kirim Pesan"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
