ขั้นตอนการทำ (**ขั้นตอนในนี้ผมเขียนเองไม่ใช่ ai gen**)
1. ผมให้ AI ช่วยขึ้นโครงสร้างตามที่ศึกษามาแล้วว่าเหมาะสม
2. เพื่อให้สอดคล้องกับการออกแบบ UI ของ Agnos ผมออกแบบด้วย สี และ font logo ที่ agnos ใช้อ้างอิงจาก https://www.agnoshealth.com/
3. ผมทำให้รองรับ 2 ภาษาด้วย i18n โครงสร้าง json object ดูและรักษาและเพิ่มง่าย 
4. ผมทำ Responsive แยก Mobile (<= 787px) และ Desktop (> 787px) ด้วย Tailwind CSS Breakpoint `--breakpoint-md: 788px` พร้อมทำ Mobile Slide-over Overlay Menu ให้ใช้งานบนมือถือได้สะดวกยิ่งขึ้น
และการแสดงผลรองรับต่ำสุดอยู่ที่หน้าจอกว้าง 200px ซึ่ง  320 px เป็นค่าความกว้างที่นักพัฒนาเว็บส่วนใหญ่ใช้ตั้งค่า Breakpoint ต่ำสุด เพื่อให้หน้าเว็บแสดงผลได้โดยไม่ล้นจอ
5. ผมใช้ supabase โดย npm install @supabase/supabase-js ทำ websocket โดยเรียกใช้ง่ายๆแค่ supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY); key ทำเป็น env เดี๋ยวเอาขึ้น vercel ประหยัดเวลา มีมาตรฐาน เพียงพอสำหรับแบบทดสอบ (หากจะสเกลเพิ่มก็จะพิจารณารูปแบบจ่ายเงินหรือเขียนเอง)
6. ผมทำ Unit Test ด้วย Vitest เพื่อครอบคลุมการตรวจสอบความถูกต้องของแบบฟอร์ม (Validation Schema) และค่าตั้งต้นของ Supabase Realtime สามารถสั่งรันได้ง่ายๆ ผ่านคำสั่ง `npm run test`
7. ผมตั้งค่าและตรวจสอบคุณภาพโค้ดด้วย ESLint (`npm run lint`) ผ่าน 100% ไร้ข้อผิดพลาด และเพิ่มเครื่องมือ jscpd สำหรับตรวจหาโค้ดซ้ำซ้อน (`npm run check:dup`) สแกนพบ 0 Duplicate Clones (0.00%) เพื่อรักษามาตรฐานโค้ดให้สะอาดและตรงตามหลักการพัฒนาที่ดี
8. ผมตั้งค่าระบบรักษาความปลอดภัย (Web Security & Security Headers) ใน `next.config.ts` เช่น ป้องกัน Clickjacking (`X-Frame-Options: DENY`), บังคับใช้ HTTPS (`HSTS`), ป้องกัน MIME Snipping (`nosniff`) และแยกย่อย Key สำคัญไว้ใน `.env` พร้อมมีระบบ Sanitization ป้องกัน XSS ตามมาตรฐานสากลของ Next.js
9. เครื่องมือและ Environment ที่ใช้พัฒนา (Development Tools & Tech Stack Versions):
   - **AI Assistant & IDE:** Antigravity IDE (Google DeepMind Agentic Coding)
   - **AI LLM Model:** Gemini 3.5 Flash / Gemini 3.6
   - **Node.js Runtime:** v26.5.0
   - **Framework:** Next.js v16.3.1 (App Router + Turbopack)
   - **UI Engine:** React v19.2.8 / React DOM v19.2.8
   - **Real-Time Communication:** Supabase Realtime (`@supabase/supabase-js` v2.112.3)
   - **Styling:** Tailwind CSS v4 (`tailwindcss` v4 / `@tailwindcss/postcss` v4)
   - **Unit Testing Framework:** Vitest v4.1.11
   - **Code Quality & Dup Detector:** ESLint v9, jscpd v4
   - **i18n Multilingual:** `next-intl` v4.13.7
10. ระยะเวลาในการพัฒนา (Development Timeline):
    - **เวลาเริ่มต้น:** 20:45 น. (19 ส.ค. 2026)
    - **เวลาเสร็จสิ้น:** 23:30 น. (19 ส.ค. 2026)
    - **รวมระยะเวลาพัฒนา:** 2 ชั่วโมง 45 นาที (พัฒนาเสร็จสมบูรณ์ พร้อม Unit Testing & Security Headers)


# Architecture & Folder Structure (Agnos Assignment)

## Supabase Realtime
เร็ว, deploy ง่าย, Supabase Realtime Broadcast, ไม่ต้องดูแล WS server

---

## ทำไมโจทย์นี้เหมาะกับ Supabase มาก

โจทย์จริง ๆ มีแค่:

Patient
   │
   │ กรอก First Name
   │ กรอก Last Name
   │ กรอก Phone
   │ ...
   ▼
Realtime
   │
   ▼
Staff View

เช่น Patient กำลังพิมพ์:

First Name
┌──────────────────┐
│ John             │
└──────────────────┘

Staff เห็นทันที:

Patient Information

First Name: John
Last Name:  [typing...]
Phone:       -
Email:       -

นี่คือ **Broadcast use case** โดยตรง

Supabase ระบุว่า Broadcast เหมาะกับการส่ง low-latency messages ระหว่าง clients และรองรับการส่งจาก client, REST API หรือ database ได้ด้วย

โจทย์ไม่ได้ถามว่า:
> *"Staff ต้องเห็นข้อมูลที่ถูก save ลง database แบบ realtime หากระบบในอนาคตต้องรองรับ persistent patient records สามารถเพิ่ม database layer แยกจาก realtime transport ได้ โดยไม่กระทบ architecture ของ realtime communication"*

แต่ถามว่า:
> **patient กำลัง input/update → staff ต้องเห็นทันที**

ดังนั้น flow ที่เหมาะคือ:

Patient Browser
      │
      │ Broadcast
      ▼
Supabase Realtime
      │
      │ WebSocket
      ▼
Staff Browser

## Architecture สำหรับ Assignment นี้

```
                    ┌────────────────────┐
                    │      Vercel        │
                    │                    │
                    │      Next.js       │
                    │      App Router    │
                    └─────────┬──────────┘
                              │
                 ┌────────────┴────────────┐
                 │                         │
                 ▼                         ▼
        Patient Browser             Staff Browser
                 │                         │
                 │                         │
                 └──────────┬──────────────┘
                            │
                            │ WebSocket
                            ▼
                  ┌─────────────────────┐
                  │  Supabase Realtime  │
                  │                     │
                  │      Broadcast      │
                  └─────────────────────┘
```

**ไม่ต้องมี:**
- Node.js Dedicated WebSocket Server — ไม่จำเป็นสำหรับ scope ของ assignment นี้
- Redis *ไม่จำเป็นเสกลไม่ได้ใหญ่ขนาดนั้น
- Docker *ไม่จำเป็นต้องใช้
- Load Balancer *ไม่จำเป็นต้องใช้

สำหรับ assignment นี้

---

## Folder Structure

```
src/
├── app/
│   ├── patient/
│   │   └── page.tsx
│   │
│   ├── staff/
│   │   └── page.tsx
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   │   ├── Input.tsx
│   │   ├── Button.tsx
│   │   └── ...
│   │
│   ├── patient/
│   │   └── PatientForm.tsx
│   │
│   └── staff/
│       └── PatientPreview.tsx
│
├── hooks/
│   ├── usePatientForm.ts
│   └── usePatientRealtime.ts
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── realtime.ts
│   │
│   └── utils.ts
│
├── schemas/
│   └── patient.schema.ts
│
└── types/
    └── patient.ts
```

**ขอบคุณครับ**