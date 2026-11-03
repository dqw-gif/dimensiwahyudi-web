'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  AlertCircle,
  Phone,
  Mail,
  Lock,
  RotateCcw,
} from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from './LanguageProvider';
import { ChatMarkdown } from '@/lib/ai/chat-markdown';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isCommercial?: boolean;
}

export default function B2BChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [isBubbleDismissed, setIsBubbleDismissed] = useState(false);
  const { lang } = useLanguage();
  const isId = lang === 'id';

  // Constants
  const WHATSAPP_NUMBER = '6281119168752';

  // Chat Session States
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [remainingChats, setRemainingChats] = useState(5);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStartingSession, setIsStartingSession] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // Form States (Pre-Chat Lead Gate)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [inputText, setInputText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load existing session from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSessionId = sessionStorage.getItem('dqw_chat_session_id');
      const savedName = sessionStorage.getItem('dqw_chat_name');
      const savedCompany = sessionStorage.getItem('dqw_chat_company');
      const savedRemaining = sessionStorage.getItem('dqw_chat_remaining');
      const savedMessages = sessionStorage.getItem('dqw_chat_messages');

      if (savedSessionId) {
        setSessionId(savedSessionId);
        if (savedName) setClientName(savedName);
        if (savedCompany) setClientCompany(savedCompany);
        if (savedRemaining) setRemainingChats(Number(savedRemaining));
        if (savedMessages) {
          try {
            setMessages(JSON.parse(savedMessages));
          } catch {
            // ignore JSON parse error
          }
        }
      }
    }
  }, []);

  // Save session state to sessionStorage
  const saveToSessionStorage = (
    id: string,
    name: string,
    company: string,
    rem: number,
    msgs: ChatMessage[]
  ) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('dqw_chat_session_id', id);
      sessionStorage.setItem('dqw_chat_name', name);
      sessionStorage.setItem('dqw_chat_company', company);
      sessionStorage.setItem('dqw_chat_remaining', rem.toString());
      sessionStorage.setItem('dqw_chat_messages', JSON.stringify(msgs));
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen && sessionId) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, sessionId, isSendingMessage]);

  const toggleChat = () => {
    const nextOpen = !isOpen;
    if (nextOpen && !hasOpened) {
      setHasOpened(true);
    }
    setIsOpen(nextOpen);
  };

  const handleResetSession = () => {
    if (confirm(isId ? 'Mulai sesi konsultasi baru dengan data berbeda?' : 'Start a new consultation session?')) {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('dqw_chat_session_id');
        sessionStorage.removeItem('dqw_chat_name');
        sessionStorage.removeItem('dqw_chat_company');
        sessionStorage.removeItem('dqw_chat_remaining');
        sessionStorage.removeItem('dqw_chat_messages');
      }
      setSessionId(null);
      setClientName('');
      setClientCompany('');
      setRemainingChats(5);
      setMessages([]);
      setFormData({ name: '', company: '', phone: '', email: '' });
      setFormErrors({});
    }
  };

  // Handle Submit Pre-Chat Gate Form
  const handleStartSession = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = isId ? 'Nama lengkap wajib diisi' : 'Name is required';
    }
    if (!formData.company.trim() || formData.company.trim().length < 2) {
      errors.company = isId ? 'Nama perusahaan / PT wajib diisi' : 'Company name is required';
    }
    if (!formData.phone.trim() || formData.phone.trim().replace(/\D/g, '').length < 8) {
      errors.phone = isId ? 'Nomor WhatsApp / telepon minimal 8 digit' : 'Valid phone number is required';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = isId ? 'Format email tidak valid' : 'Valid email is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsStartingSession(true);

    try {
      const res = await fetch('/api/chatbot/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success && data.sessionId) {
        setSessionId(data.sessionId);
        setClientName(data.clientName || formData.name);
        setClientCompany(data.companyName || formData.company);
        setRemainingChats(data.remainingChats ?? 5);

        const initialMsg: ChatMessage = {
          id: `msg-welcome-${Date.now()}`,
          sender: 'assistant',
          text:
            data.initialMessage?.text ||
            `Halo Pak/Bu **${formData.name}** dari **${formData.company}**! Selamat datang di PT Dimensi Quantum Wahyudi.\n\nSaya adalah Technical Consultant yang siap membantu Anda menganalisis kebutuhan sistem pengangkatan ergonomis (Schmalz & Binar Handling) serta standar K3 di pabrik Anda.\n\nAda beban atau proses handling apa yang ingin dioptimasi hari ini? *(Sisa Kuota: 5 Pertanyaan)*`,
          timestamp: new Date().toISOString(),
        };

        const updatedMsgs = [initialMsg];
        setMessages(updatedMsgs);
        saveToSessionStorage(
          data.sessionId,
          data.clientName || formData.name,
          data.companyName || formData.company,
          data.remainingChats ?? 5,
          updatedMsgs
        );
      } else {
        alert(data.error || 'Gagal memulai sesi. Silakan coba lagi.');
      }
    } catch {
      alert('Kendala koneksi ke server. Silakan periksa koneksi internet Anda.');
    } finally {
      setIsStartingSession(false);
    }
  };

  // Handle Send Chat Message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || !sessionId || isSendingMessage || remainingChats <= 0) return;

    setInputText('');
    const nowIso = new Date().toISOString();

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: nowIso,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsSendingMessage(true);

    try {
      const res = await fetch('/api/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: text,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const assistantMsg: ChatMessage = {
          id: `msg-asst-${Date.now()}`,
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toISOString(),
          isCommercial: Boolean(data.isCommercial),
        };

        const finalMsgs = [...newMessages, assistantMsg];
        setMessages(finalMsgs);
        setRemainingChats(data.remainingChats ?? Math.max(0, remainingChats - 1));
        saveToSessionStorage(
          sessionId,
          clientName,
          clientCompany,
          data.remainingChats ?? Math.max(0, remainingChats - 1),
          finalMsgs
        );
      } else if (data.quotaExceeded) {
        setRemainingChats(0);
        const quotaMsg: ChatMessage = {
          id: `msg-asst-${Date.now()}`,
          sender: 'assistant',
          text: data.reply || 'Kuota 5 pertanyaan interaktif telah selesai. Silakan hubungi tim kami untuk konsultasi lanjutan.',
          timestamp: new Date().toISOString(),
          isCommercial: true,
        };
        const finalMsgs = [...newMessages, quotaMsg];
        setMessages(finalMsgs);
        saveToSessionStorage(sessionId, clientName, clientCompany, 0, finalMsgs);
      } else {
        const errMsg: ChatMessage = {
          id: `msg-err-${Date.now()}`,
          sender: 'assistant',
          text: `Mohon maaf, sistem AI mengalami kendala teknis konfigurasi (${data.error || 'API Key not ready'}). Silakan hubungi tim kami via WhatsApp untuk respon langsung.`,
          timestamp: new Date().toISOString(),
          isCommercial: true,
        };
        setMessages([...newMessages, errMsg]);
      }
    } catch {
      const netErrMsg: ChatMessage = {
        id: `msg-net-err-${Date.now()}`,
        sender: 'assistant',
        text: 'Kendala koneksi jaringan saat menghubungi server. Silakan hubungi tim kami via WhatsApp atau coba beberapa saat lagi.',
        timestamp: new Date().toISOString(),
        isCommercial: true,
      };
      setMessages([...newMessages, netErrMsg]);
    } finally {
      setIsSendingMessage(false);
    }
  };

  // Helper to render markdown (bold, italic, links, lists) cleanly
  const renderMessageContent = (content: string) => {
    return <ChatMarkdown content={content} />;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-20 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-24 sm:w-[380px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-110px)] z-50 bg-white rounded-3xl shadow-[0_16px_50px_-10px_rgba(0,0,0,0.3)] border border-slate-200 overflow-hidden flex flex-col"
          >
            {/* 1. Header */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-[#005596] px-5 py-3.5 flex items-center justify-between shrink-0 shadow-xs">
              <div className="flex items-center gap-3 relative">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 relative shrink-0">
                  <Bot size={20} className="text-sky-300" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 outline outline-2 outline-slate-900 bg-emerald-400 rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide">
                    Virtual Engineer DQW
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    {sessionId ? (
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          remainingChats > 2
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : remainingChats > 0
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40'
                        }`}
                      >
                        Sisa Kuota: {remainingChats}/5 Tanya
                      </span>
                    ) : (
                      <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                        Schmalz & Binar Consultant
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {sessionId && (
                  <button
                    type="button"
                    onClick={handleResetSession}
                    title="Mulai Sesi Baru"
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <RotateCcw size={13} />
                  </button>
                )}
                <button
                  onClick={toggleChat}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
                  aria-label="Tutup jendela chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* 2. Body: Gate Form vs Active Chat */}
            {!sessionId ? (
              // ==========================================
              // PRE-CHAT LEAD GATE FORM
              // ==========================================
              <div className="flex-1 overflow-y-auto p-5 bg-gradient-to-b from-slate-50 via-white to-slate-50 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-start gap-3">
                    <Bot size={18} className="text-[#005596] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Konsultasi Teknis & Ergonomi Pabrik</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                        Isi form ringkas di bawah untuk terhubung langsung dengan AI Technical Application Engineer PT Dimensi Quantum Wahyudi.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleStartSession} className="space-y-3" noValidate>
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-tight block">
                        Nama Lengkap (PIC) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/10 transition-all font-medium"
                      />
                      {formErrors.name && (
                        <p className="text-[10px] text-red-600 flex items-center gap-1 font-medium">
                          <AlertCircle size={10} /> {formErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Company */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-tight block">
                        Nama Perusahaan / PT <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Contoh: PT Manufaktur Nusantara"
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/10 transition-all font-medium"
                      />
                      {formErrors.company && (
                        <p className="text-[10px] text-red-600 flex items-center gap-1 font-medium">
                          <AlertCircle size={10} /> {formErrors.company}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-tight block">
                        Nomor WhatsApp / Telepon <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Contoh: 081234567890"
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/10 transition-all font-medium"
                      />
                      {formErrors.phone && (
                        <p className="text-[10px] text-red-600 flex items-center gap-1 font-medium">
                          <AlertCircle size={10} /> {formErrors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-tight block">
                        Email Perusahaan <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@nama-perusahaan.com"
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/10 transition-all font-medium"
                      />
                      {formErrors.email && (
                        <p className="text-[10px] text-red-600 flex items-center gap-1 font-medium">
                          <AlertCircle size={10} /> {formErrors.email}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isStartingSession}
                      className="w-full mt-3 bg-[#005596] hover:bg-[#004276] text-white font-bold py-2.5 rounded-full text-xs shadow-md shadow-[#005596]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isStartingSession ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Mempersiapkan AI Engineer...</span>
                        </>
                      ) : (
                        <>
                          <span>Mulai Konsultasi Teknis</span>
                          <Send size={12} />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <p className="text-center text-[10px] text-slate-400 font-medium pt-3">
                  Data Anda dijaga kerahasiaannya khusus untuk konsultasi resmi DQW.
                </p>
              </div>
            ) : (
              // ==========================================
              // ACTIVE CHAT ROOM
              // ==========================================
              <div className="flex-1 flex flex-col justify-between overflow-hidden bg-slate-50">
                {/* Messages Scroll Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm shadow-xs ${
                          msg.sender === 'user'
                            ? 'bg-[#005596] text-white rounded-br-xs'
                            : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                        }`}
                      >
                        {msg.sender === 'assistant' ? (
                          <div className="space-y-2">
                            {renderMessageContent(msg.text)}

                            {/* Commercial Action Card (When price/stock/PO triggered) */}
                            {msg.isCommercial && (
                              <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                                  Layanan Resmi Penawaran & Survei:
                                </span>
                                <div className="flex flex-col gap-1.5">
                                  <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Halo%20DQW,%20saya%20${encodeURIComponent(
                                      clientName
                                    )}%20dari%20${encodeURIComponent(
                                      clientCompany
                                    )},%20ingin%20konsultasi%20penawaran%20harga%20dan%20survei%20sistem%20handling.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                                  >
                                    <Phone size={12} />
                                    <span>Chat WhatsApp Sales DQW</span>
                                  </a>

                                  <a
                                    href={`mailto:sales@dimensiwahyudi.com?subject=Permintaan%20Penawaran%20Resmi%20-${encodeURIComponent(
                                      clientCompany
                                    )}`}
                                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                                  >
                                    <Mail size={12} />
                                    <span>Kirim Permintaan Email (RFQ)</span>
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <ChatMarkdown content={msg.text} isUserMessage={true} />
                        )}
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono mt-1 px-1">
                        {new Date(msg.timestamp).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isSendingMessage && (
                    <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-xs w-fit shadow-xs">
                      <div className="w-1.5 h-1.5 bg-[#005596] rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 bg-[#005596] rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1.5 h-1.5 bg-[#005596] rounded-full animate-bounce" />
                      <span className="text-[11px] text-slate-500 font-medium pl-1">
                        AI Engineer sedang menganalisis...
                      </span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Bottom Bar: Input vs Quota Exceeded Card */}
                <div className="p-3 bg-white border-t border-slate-200 shrink-0">
                  {remainingChats > 0 ? (
                    <div className="space-y-2">
                      {/* Suggestion Chips on initial chat */}
                      {messages.length <= 1 && (
                        <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px]">
                          <button
                            type="button"
                            onClick={() => handleSendMessage('Solusi angkat sak semen 50 kg agar tidak koyak')}
                            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-[#005596] text-slate-600 whitespace-nowrap transition-colors border border-slate-200 cursor-pointer"
                          >
                            💡 Angkat sak 50 kg
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSendMessage('Batas beban angkat Permenaker No 5 Tahun 2018')}
                            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-[#005596] text-slate-600 whitespace-nowrap transition-colors border border-slate-200 cursor-pointer"
                          >
                            ⚖️ Standar Permenaker 5/2018
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSendMessage('Apa bedanya Schmalz JumboFlex dan JumboErgo?')}
                            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-[#005596] text-slate-600 whitespace-nowrap transition-colors border border-slate-200 cursor-pointer"
                          >
                            🔍 JumboFlex vs JumboErgo
                          </button>
                        </div>
                      )}

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSendMessage();
                        }}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          disabled={isSendingMessage}
                          placeholder={
                            isSendingMessage
                              ? 'Menunggu jawaban...'
                              : `Tulis pertanyaan teknis... (${remainingChats} tersisa)`
                          }
                          className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/15 transition-all"
                        />
                        <button
                          type="submit"
                          disabled={isSendingMessage || !inputText.trim()}
                          className="w-8 h-8 rounded-full bg-[#005596] hover:bg-[#004276] text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer shrink-0 shadow-xs"
                          aria-label="Kirim pesan"
                        >
                          <Send size={13} className="-ml-0.5" />
                        </button>
                      </form>
                    </div>
                  ) : (
                    // QUOTA EXCEEDED (5 CHATS REACHED)
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 space-y-2.5">
                      <div className="flex items-start gap-2">
                        <Lock size={15} className="text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-xs font-bold text-amber-950">
                            Kuota Diskusi Interaktif Telah Selesai (5/5)
                          </h5>
                          <p className="text-[11px] text-amber-800 leading-snug mt-0.5">
                            Untuk survei pabrik, penawaran harga resmi, atau perhitungan teknis lengkap, silakan hubungi tim kami:
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Halo%20DQW,%20saya%20${encodeURIComponent(
                            clientName
                          )}%20dari%20${encodeURIComponent(
                            clientCompany
                          )},%20telah%20selesai%20berdiskusi%20dengan%20AI%20Virtual%20Engineer%20dan%20ingin%20konsultasi%20langsung.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs text-center"
                        >
                          <Phone size={12} />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={`mailto:sales@dimensiwahyudi.com?subject=Konsultasi%20Lanjutan%20-%20${encodeURIComponent(
                            clientCompany
                          )}`}
                          className="px-3 py-2 rounded-xl bg-[#005596] hover:bg-[#004276] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs text-center"
                        >
                          <Mail size={12} />
                          <span>Email Sales</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Teaser speech bubble next to the chat button (Hidden on Mobile, Visible on Desktop) */}
      {!isOpen && !hasOpened && !isBubbleDismissed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.4, type: 'spring', stiffness: 100 }}
          className="hidden md:flex fixed bottom-[96px] right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs font-medium pl-4 pr-2.5 py-3 rounded-2xl rounded-br-none shadow-xl border border-slate-700/80 transition-all select-none max-w-[270px] items-center justify-between gap-2.5 group"
        >
          <div onClick={toggleChat} className="flex items-center gap-2.5 cursor-pointer flex-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
            <span className="text-slate-200 leading-snug font-sans group-hover:text-white transition-colors">
              {isId
                ? 'Konsultasi teknis vacuum lifter & ergonomi pabrik?'
                : 'Need technical guidance on industrial vacuum handling?'}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsBubbleDismissed(true);
            }}
            className="w-5 h-5 rounded-full hover:bg-white/20 text-slate-400 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            aria-label="Tutup pesan"
          >
            <X size={12} />
          </button>
        </motion.div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-13 h-13 sm:w-16 sm:h-16 bg-gradient-to-br from-[#005596] to-slate-950 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-[3px] sm:border-4 border-white/20 cursor-pointer ${
          isOpen ? 'rotate-90 bg-slate-900' : 'hover:shadow-[#005596]/50'
        }`}
        aria-label="Toggle Virtual Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5 sm:w-7 sm:h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="w-5 h-5 sm:w-6.5 sm:h-6.5 fill-current -mt-0.5 ml-0.5" />
              {/* Notification Dot */}
              {!hasOpened && (
                <span className="absolute -top-0.5 -right-0.5 sm:top-0 sm:right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-red-500 border-2 border-slate-900 rounded-full animate-pulse z-10"></span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}
