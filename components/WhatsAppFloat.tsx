'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFloat() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const pathname = usePathname();

    // Don't show on contact page
    const isContactPage = pathname === '/contact';

    useEffect(() => {
        if (isContactPage) return;
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isContactPage]);

    if (isContactPage || dismissed) return null;

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        >
            {/* Tooltip bubble */}
            <div className="bg-white rounded-2xl shadow-2xl shadow-green-500/10 border border-slate-200 px-4 py-3 max-w-[200px] text-sm relative">
                <button
                    onClick={() => setDismissed(true)}
                    className="absolute -top-2 -right-2 bg-slate-200 hover:bg-slate-300 rounded-full p-0.5 transition-colors"
                    aria-label="Close"
                >
                    <X size={12} className="text-slate-600" />
                </button>
                <p className="text-slate-700 font-semibold leading-snug">Need technical support?</p>
                <p className="text-slate-500 text-xs mt-0.5">Chat with our engineers now.</p>
            </div>

            {/* Main button */}
            <a
                href="https://wa.me/6281119168752?text=Hello%20PT%20Dimensi%20Quantum%20Wahyudi%2C%20I%20would%20like%20a%20consultation%20about%20lifting%20solutions%20for%20our%20facility."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'whatsapp_click', { event_category: 'CTA', value: 1 });
                    }
                }}
                aria-label="Chat WhatsApp PT Dimensi Quantum Wahyudi"
                className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-400 text-white rounded-full shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 transition-all duration-300 hover:scale-110 active:scale-95"
            >
                <MessageCircle size={26} fill="white" strokeWidth={0} />
            </a>
        </div>
    );
}
