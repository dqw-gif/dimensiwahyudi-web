# WordPress Reliability Checklist

Checklist ini untuk mencegah halaman artikel kosong saat WordPress/API gangguan.

## A. Immediate Incident Checklist
- [ ] Buka endpoint WordPress GraphQL dari server app (bukan browser lokal): pastikan status 200.
- [ ] Validasi query minimal: `query { posts(first:1){ nodes { slug title } } }`.
- [ ] Cek halaman `news`: tidak menampilkan empty state (`No Articles Yet`).
- [ ] Jika kosong, lakukan redeploy/restart app untuk reset circuit state dan refresh ISR cache.
- [ ] Verifikasi 3 URL artikel utama (homepage traffic): title, excerpt, dan content muncul.

## B. Environment and Config Checklist
- [ ] `WORDPRESS_API_URL` mengarah ke endpoint GraphQL yang stabil dan tidak diblok WAF.
- [ ] `UPSTASH_REDIS_REST_URL` terisi.
- [ ] `UPSTASH_REDIS_REST_TOKEN` terisi.
- [ ] `NEXT_PUBLIC_GA_ID` tetap valid (untuk monitoring traffic pasca incident).
- [ ] `MAINTENANCE_MODE` tetap `false` saat operasi normal.

## C. App-Side Resilience Checklist
- [ ] Timeout/retry/circuit breaker aktif di service WordPress.
- [ ] Fallback cache persistent (Upstash) aktif, bukan hanya in-memory.
- [ ] Health endpoint app bisa diakses dan mengembalikan JSON.
- [ ] Alert saat error rate/fallback rate tinggi sudah tercatat di log.
- [ ] Pastikan empty state di `news` tetap user-friendly (tidak blank page).

## D. WAF/CDN Rules Checklist (Cloudflare)
- [ ] Buat allow rule untuk `POST /graphql` dari origin server app.
- [ ] Jangan aktifkan challenge/bot fight ke endpoint GraphQL server-to-server.
- [ ] Jika pakai custom WAF expression, whitelist User-Agent backend app.
- [ ] Pastikan tidak ada rate-limit agresif untuk GraphQL read query.
- [ ] Cek firewall events saat incident untuk konfirmasi source block.

## E. Server Rules Checklist (Nginx/Apache/cPanel)
- [ ] Endpoint `/graphql` menerima method `POST`.
- [ ] Tidak ada deny rule yang memblok request tanpa browser cookies.
- [ ] Reverse proxy meneruskan header penting (`Host`, `X-Forwarded-For`, `Content-Type`).
- [ ] Timeout upstream cukup (hindari timeout terlalu pendek untuk query konten).
- [ ] SSL/TLS antara app dan WP endpoint valid (tidak ada handshake issue).

## F. Build/Release Checklist
- [ ] Jalankan `npm run build` dan pastikan sukses.
- [ ] Jalankan `npm run qa:route-health` pada environment deploy.
- [ ] Pantau 15 menit pertama pasca deploy: error log WP fetch.
- [ ] Cek halaman `news` dan 3 detail artikel random.
- [ ] Confirm sitemap route artikel return 200.

## G. Monitoring Checklist (Daily/Weekly)
- [ ] Daily: cek jumlah artikel tampil di `news` > 0.
- [ ] Daily: cek 1 artikel terbaru dan 1 artikel lama.
- [ ] Weekly: review log `WordPress fetch failed`.
- [ ] Weekly: review slow URL `/news/[slug]` dan P95.
- [ ] Weekly: validasi freshness content setelah editorial update.

## H. Recovery Playbook (Jika Artikel Kembali Kosong)
- [ ] Konfirmasi status WordPress dan `/graphql`.
- [ ] Konfirmasi WAF/firewall tidak block request backend.
- [ ] Jika endpoint pulih, restart/redeploy app untuk refresh state cache.
- [ ] Jalankan smoke check: `news`, 3 artikel detail, sitemap.
- [ ] Catat incident: waktu mulai, akar masalah, durasi, dan tindakan pencegahan.

## I. Ownership Checklist
- [ ] Tentukan owner WordPress uptime.
- [ ] Tentukan owner WAF/CDN rules.
- [ ] Tentukan owner Next.js production health.
- [ ] Tetapkan SLA pemulihan (contoh: <= 30 menit untuk restore feed artikel).
- [ ] Simpan kontak on-call internal untuk eskalasi cepat.
