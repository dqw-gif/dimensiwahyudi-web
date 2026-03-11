import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
        service: 'Outlook365',
        auth: {
            user: process.env.OUTLOOK_USER,
            pass: process.env.OUTLOOK_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.OUTLOOK_USER,
            to: process.env.OUTLOOK_USER,
            subject: `Contact Form dari ${name}`,
            text: `Nama: ${name}\nEmail: ${email}\nPesan: ${message}`,
            html: `<b>Nama:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Pesan:</b><br/>${message}`,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: err }, { status: 500 });
    }
}
