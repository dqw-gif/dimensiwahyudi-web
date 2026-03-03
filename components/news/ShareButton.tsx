"use client";

import { Share2, Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
    title: string;
    slug: string;
}

export default function ShareButton({ title, slug }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = `${window.location.origin}/news/${slug}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: `Check out this article: ${title}`,
                    url: url,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback to copy link
            try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-slate-50 hover:bg-blue-600 text-slate-600 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-blue-500/30 group relative"
            aria-label="Share Article"
        >
            {copied ? <Check size={18} /> : <Share2 size={18} />}

            {/* Tooltip for Copy Feedback */}
            {copied && (
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-forwards">
                    Copied!
                </span>
            )}
        </button>
    );
}
