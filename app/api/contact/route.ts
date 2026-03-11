import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    const { name, email, message } = await req.json();

    // Buat transporter SMTP Outlook
    const transporter = nodemailer.createTransport({
        service: 'Outlook365',
        auth: {
            user: process.env.OUTLOOK_USER, // email Outlook kamu
            pass: process.env.OUTLOOK_PASS, // password atau app password
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.OUTLOOK_USER,
            to: process.env.OUTLOOK_USER, // bisa diganti ke email lain
            subject: `Contact Form dari ${name}`,
            text: `Nama: ${name}\nEmail: ${email}\nPesan: ${message}`,
            html: `<b>Nama:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Pesan:</b><br/>${message}`,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: err }, { status: 500 });
    }
}
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, company, email, message, _hp, _t } = body;

        // ── Anti-bot: Honeypot field harus kosong ──────────────────────────────
        if (_hp) {
            // Silent success — jangan beri tahu bot bahwa mereka terdeteksi
            return NextResponse.json({ success: true });
        }

        // ── Anti-bot: Timing check — submit terlalu cepat = bot ───────────────
        if (typeof _t === 'number' && _t < 3000) {
            return NextResponse.json({ success: true }); // silent reject
        }

        // ── Validasi field wajib ───────────────────────────────────────────────
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Field nama, email, dan pesan wajib diisi.' },
                { status: 400 }
            );
        }

        // ── Validasi panjang input — cegah payload bomb ────────────────────────
        if (
            name.length > 100 ||
            (company && company.length > 150) ||
            email.length > 255 ||
            message.length > 5000
        ) {
            return NextResponse.json(
                { error: 'Input terlalu panjang.' },
                { status: 400 }
            );
        }

        // ── Validasi format email ──────────────────────────────────────────────
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Format email tidak valid.' },
                { status: 400 }
            );
        }

        // ── Format WA pre-filled link (selalu tersedia sebagai fallback) ───────
        const waMessage = encodeURIComponent(
            `*Permintaan Penawaran Baru*\n\n` +
            `Nama: ${name}\n` +
            `Perusahaan: ${company || '-'}\n` +
            `Email: ${email}\n\n` +
            `Detail:\n${message}`
        );
        const waLink = `https://wa.me/6281119168752?text=${waMessage}`;

        // ── Kirim via Formspree (jika FORMSPREE_ID dikonfigurasi) ─────────────
        const formspreeId = process.env.FORMSPREE_ID || 'xrearydw';
        if (formspreeId) {
            const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ name, company, email, message }),
            });

            if (res.ok) {
                return NextResponse.json({ success: true, waLink });
            }
        }

        // ── Fallback: kembalikan WA link ───────────────────────────────────────
        return NextResponse.json({ success: true, waLink });

    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('Contact form error:', error);
        }
        return NextResponse.json(
            { error: 'Terjadi kesalahan. Silakan coba lagi.' },
            { status: 500 }
        );
    }
}
