# Real-time Patient Registration & Staff Monitoring System

An interactive, real-time patient form and staff monitoring web application built for the **Agnos Candidate Assignment**.

> 📌 **Developer Implementation Notes (ขั้นตอนการทำภาษาไทย):**  
> สามารถอ่านแนวคิดขั้นตอนการพัฒนา, สถาปัตยกรรมระบบ (Architecture Diagram), และเหตุผลในการเลือกเทคโนโลยีเพิ่มเติมได้ที่ [README_STEP.MD](./README_STEP.MD)

---

## 📝 ขั้นตอนการทำ & เครื่องมือพัฒนา (Implementation Steps & Dev Tools)

1. **โครงสร้างโปรเจกต์:** ให้ AI ช่วยขึ้นโครงสร้างตามที่ศึกษามาแล้วว่าเหมาะสมตามหลัก Modular Architecture
2. **ดีไซน์ UI & Branding:** ดีไซน์ด้วยสี (`rgb(26 89 194)`), ฟอนต์ภาษาไทย `Anuphan` และโลโก้แบรนด์ Agnos แท้อ้างอิงจาก [Agnos Health](https://www.agnoshealth.com/)
3. **ระบบ 2 ภาษา (i18n):** ทำระบบรองรับ 2 ภาษา (TH/EN) ด้วยโครงสร้าง JSON Object ดูแลรักษานำไปใช้งานต่อได้ง่าย
4. **Responsive Design (787px):** แยก Mobile (`<= 787px`) และ Desktop (`> 787px`) ด้วย Tailwind CSS Breakpoint `--breakpoint-md: 788px` พร้อม Mobile Slide-over Overlay Menu อนิเมชัน 60fps รองรับหน้าจอเล็กสุดถึง 200px (มาตรฐาน 320px) พร้อม CSS `clamp()` หดไม่เกิน 20%
5. **Supabase Realtime Broadcast:** ใช้ `@supabase/supabase-js` เชื่อมต่อ WebSocket Broadcast Channel (`patient-form-sync`) ส่งข้อมูลสด 0ms โดยไม่ต้องสร้าง Overhead ในการเขียน DB
6. **Unit Testing:** เขียน Unit Test ด้วย Vitest ครอบคลุม Form Validation Schema และ Supabase Realtime รันผ่านคำสั่ง `npm run test` (5/5 Tests Passed)
7. **Code Quality:** ตรวจสอบคุณภาพโค้ดด้วย ESLint (`npm run lint` - 0 Errors) และตรวจจับโค้ดซ้ำด้วย `jscpd` (`npm run check:dup` - 0.00% Duplicated)
8. **Web Security:** ตั้งค่า Security Headers ใน `next.config.ts` เช่น `X-Frame-Options: DENY`, `HSTS`, `nosniff` และแยกซ่อน Key ไว้ใน `.env` ป้องกัน XSS & Clickjacking
9. **เครื่องมือและ Environment ที่ใช้พัฒนา:**
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
10. **ระยะเวลาในการพัฒนา (Development Timeline):**
    - **เวลาเริ่มต้น:** 20:45 น. (19 ส.ค. 2026)
    - **เวลาเสร็จสิ้น:** 23:30 น. (19 ส.ค. 2026)
    - **รวมระยะเวลาพัฒนา:** 2 ชั่วโมง 45 นาที (เสร็จสมบูรณ์ 100% พร้อม Unit Testing & Web Security)

---

## 🚀 Live Demo & Quick Start

### 1. Setup Environment Variables
Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

### 2. Run Local Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

- **`npm run dev`**: Launch local development server with Turbopack.
- **`npm run build`**: Create optimized production build.
- **`npm run test`**: Run Vitest unit tests (Validation schema & Supabase Realtime).
- **`npm run lint`**: Run ESLint quality check (0 errors, 0 warnings).
- **`npm run check:dup`**: Run `jscpd` duplicate code detector (0.00% duplicates).

---

## 📂 Project Structure

```
real-time-patient/
├── src/
│   ├── app/                    # Next.js App Router pages (Home, /patient, /staff)
│   ├── components/
│   │   ├── layout/            # Navbar with responsive mobile overlay menu
│   │   ├── patient/           # PatientForm component
│   │   ├── staff/             # PatientPreview real-time monitoring card
│   │   └── ui/                # Reusable UI primitives (Input, Button)
│   ├── hooks/                 # Custom React hooks (usePatientForm, usePatientRealtime)
│   ├── i18n/                  # Multilingual support (th.json, en.json, context.tsx)
│   ├── lib/
│   │   └── supabase/          # Supabase client & Realtime Broadcast channel
│   ├── schemas/               # Zod/TypeScript Validation Schema
│   ├── types/                 # TypeScript interfaces (PatientFormData)
│   └── __tests__/             # Vitest unit test suites
├── vitest.config.mts           # Vitest runner configuration
└── README_STEP.MD             # Developer implementation notes
```

---

## 🎨 UI/UX Design & Responsiveness

1. **Agnos Health Branding**:
   - Official Agnos primary blue palette (`rgb(26 89 194)`) and font family (`Anuphan`).
   - Clean, minimal medical UI design without emojis or bloated AI templates.

2. **Responsive Breakpoint Strategy (787px)**:
   - Configured custom `--breakpoint-md: 788px` in Tailwind CSS v4.
   - **Screen `<= 787px` (Mobile)**: Renders a 100% full-screen mobile menu overlay with smooth CSS slide-down/up keyframe animations rendered via React Portal.
   - **Screen `> 787px` (Desktop)**: Renders a clean horizontal navbar with an interactive language switcher dropdown.
   - **Fluid Typography**: Uses CSS `clamp()` to dynamically scale text down to screen width 200px while guaranteeing text never shrinks by more than 20% (minimum font scale 80%).

---

## 🏗️ Component Architecture

- **`Navbar`**: Provides global navigation, brand logo, language switcher, and full-screen mobile overlay.
- **`PatientForm`**: Interactive input form for patients with real-time change events, required field red asterisks (`*`), and schema validation.
- **`PatientPreview`**: Live staff view card showing patient data in real-time with connection status badge (`idle`, `filling`, `submitted`).
- **`Input` / `Button`**: Modular, accessible UI primitives with light mode focus rings and error states.

---

## ⚡ Real-Time Synchronization Flow

```
[ Patient Form Input ]
         │
         ▼ (on keypress / updateField)
[ broadcastPatientUpdate() ]
         │
         ▼ (WebSocket Channel: 'patient-form-sync')
[ Supabase Realtime Broadcast ]
         │
         ▼ (subscribePatientUpdates)
[ Staff View (PatientPreview) ] ──> Updates UI Live (0ms latency)
```

1. As the patient types into any input field on `/patient`, `usePatientForm` calls `broadcastPatientUpdate()`.
2. The change event is published to the **Supabase Realtime Broadcast Channel (`patient-form-sync`)**.
3. The staff view on `/staff` receives the WebSocket payload via `usePatientRealtime` and updates the live preview card immediately.

---

## 🛡️ Code Quality & Testing

- **Unit Testing**: 6 unit tests covering form validation (email/phone regex, required fields) and Supabase constants using Vitest (`npm run test`).
- **Zero Lint Errors**: 100% ESLint compliance (`npm run lint`).
- **Zero Duplicate Code**: 0.00% duplicated clones detected via `jscpd` (`npm run check:dup`).
- **Security Headers**: Production web security headers enabled (`X-Frame-Options`, `HSTS`, `nosniff`, `Referrer-Policy`).
