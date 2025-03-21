# EduTouch
EDUtouch: Empowering students with a communicative teaching approach, supported by expert tutors and competitive exam coaches to foster wisdom and success.




## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


# EduTouch

> A full-stack learning and exam-readiness platform that blends a high-converting marketing site with a secure admin console, automated content publishing, and download-ready learning assets.

## Table of Contents
1. [Overview](#overview)
2. [Experience Layers](#experience-layers)
3. [Architecture & Tech Stack](#architecture--tech-stack)
4. [API Surface](#api-surface)
5. [Data Models](#data-models)
6. [Integrations & Utilities](#integrations--utilities)
7. [Environment Variables](#environment-variables)
8. [Local Development](#local-development)
9. [Project Structure Snapshot](#project-structure-snapshot)
10. [Operational Notes](#operational-notes)

## Overview
- Built with the Next.js 15 App Router, EduTouch delivers a performant SPA-like experience while running server-side API routes under `src/app/api`.
- MongoDB + Mongoose persist every piece of structured content (courses, exams, teachers, testimonials, notices, videos, hero banners, GK/CA decks, etc.).
- Cloudinary manages media uploads and lifecycle operations; PDFs that must be downloaded directly are served via custom `/api/*/download` handlers.
- Contact, registration, and admin-auth flows operate entirely from the same codebase, simplifying deployment and maintenance.

## Experience Layers
- **Global shell** – [src/components/ClientLayout/index.tsx](src/components/ClientLayout/index.tsx) wires in the site-wide [Navbar](src/components/Navbar) and [Footer](src/components/Footer), injects the WhatsApp CTA, and omits chrome whenever visitors enter protected admin paths.
- **Home funnel** – [src/app/page.tsx](src/app/page.tsx) stitches together the hero carousel, downloads CTA, notice wall, stats, services grid, key offerings, success stories, student feedback, video lessons, and enrollment CTAs. Most sections take their copy and imagery from `src/utility/*` to keep marketing edits code-free.
- **Standalone routes** – The `(routes)` segment in `src/app` exposes dedicated pages for About, Courses, Exams, GK/CA, Contact, Admin login, Admin dashboard, etc., enabling SEO-friendly URLs and lighter bundles per view.
- **Communications hub** – [src/components/ContactInfo/index.tsx](src/components/ContactInfo/index.tsx) embeds office details plus an interactive Google Maps iframe, while [src/components/RegistrationForm/index.tsx](src/components/RegistrationForm/index.tsx) and [src/components/ContactForm/index.tsx](src/components/ContactForm/index.tsx) send inquiries through EmailJS with toast-based feedback loops.
- **Content widgets** – Hooks such as [src/hooks/DisplayAllNotices.tsx](src/hooks/DisplayAllNotices.tsx) and [src/hooks/DisplayAllCourses.tsx](src/hooks/DisplayAllCourses.tsx) hydrate UI components with live data, add optimistic loading states, and expose utility actions like client-side PDF downloads.
- **Micro-interactions** – Motion-heavy sections rely on Framer Motion wrappers (e.g., [src/components/DownloadSec/index.tsx](src/components/DownloadSec/index.tsx)) and sliders (react-slick) to keep the landing experience lively without sacrificing accessibility.

## Architecture & Tech Stack
- **Framework** – Next.js 15 (App Router) with React 18.3, TypeScript, Tailwind CSS, PostCSS, and ESLint.
- **State & UX** – Framer Motion, React Slick, React Toastify, React Intersection Observer, custom hooks in `src/hooks`.
- **Media & Storage** – Cloudinary for images, hero posters, gallery assets, key offering icons, PDFs that need CDN delivery; MongoDB Buffer fields for legal notice/course/exam downloads.
- **Authentication** – JSON Web Tokens minted and verified through [src/lib/jwt.ts](src/lib/jwt.ts), enforced by [src/middleware.ts](src/middleware.ts) for `/admin-dashboard` and `/admin-login` routes.
- **Database** – Centralized connection logic lives in [src/lib/database.ts](src/lib/database.ts) and targets the `EduTouchDB` database using the `MONGODB_URI` secret.
- **Styling & Fonts** – Custom Geist variable fonts declared in [src/app/layout.tsx](src/app/layout.tsx) plus Tailwind utility classes.

## API Surface
| Domain | Route folders | Description |
| --- | --- | --- |
| Auth & Admin Accounts | `/api/auth/admin-create`, `/api/auth/admin-delete`, `/api/auth/admin-display`, `/api/auth/admin-edit`, `/api/auth/login` | Manage credential owners and issue dashboard tokens via Email+Password login. |
| Courses | `/api/course/course-create`, `-delete`, `-display`, `-download`, `-edit` | CRUD + PDF downloads for long-form course brochures with hero images. |
| Exams | `/api/exam/exam-create`, `-delete`, `-display`, `-download`, `-edit` | Administer exam metadata, application timelines, Cloudinary-hosted banners, and downloadable prospectuses. |
| GK & Current Affairs | `/api/gkca/gkca-create`, `-delete`, `-display`, `-edit` | Publish paired GK/CA cards (image, title, link) that surface on the GK routes. |
| Testimonials | `/api/testimonial/testimonial-create`, `-delete`, `-display`, `-edit` | Curate learner stories containing images, exam names, and testimonial copy. |
| Teachers | `/api/teacher/teacher-create`, `-delete`, `-display`, `-edit` | Maintain faculty bios (name, subject, portrait). |
| Gallery | `/api/gallery/gallery-create`, `-delete`, `-display`, `-edit` | Photo wall CRUD for events, awards, and campus life. |
| Hero Poster | `/api/heroPoster/heroPoster-create`, `-delete`, `-display`, `-edit` | Control the carousel imagery rendered by the homepage slider. |
| Key Offerings | `/api/keyoffer/keyoffer-create`, `-delete`, `-display`, `-edit` | Update the icon cards shown inside [src/components/KeyOfferingsSec](src/components/KeyOfferingsSec). |
| Notices | `/api/notice/notice-create`, `-delete`, `-display`, `-download`, `-edit` | Publish PDF bulletins surfaced by [src/components/DisplayAllNotice/index.tsx](src/components/DisplayAllNotice/index.tsx) with `View More` pagination. |
| Feedback | `/api/feedback/feedback-create`, `-delete`, `-display`, `-edit` | Store alumni feedback snapshots (name, batch, avatar). |
| YouTube Videos | `/api/youtube-video/youtube-vid-create`, `-delete`, `-display`, `-edit` | Maintain the list of embedded lessons or announcements. |

> Every handler connects to MongoDB via `connectToDB`, validates multipart FormData, streams binary uploads to Cloudinary when appropriate, and responds with JSON for easy consumption by the dashboard or site widgets.

## Data Models
- [src/models/courseModel.ts](src/models/courseModel.ts) – Course name, highlights, syllabus, description, duration, hero image URL, PDF Buffer.
- [src/models/examModel.ts](src/models/examModel.ts) – Exam name, official site link, banner image, qualification text, selection process, form-fill window, PDF Buffer.
- [src/models/feedbackModel.ts](src/models/feedbackModel.ts) – `name`, `batch`, `imageNew` for spotlight testimonials.
- [src/models/galleryModel.ts](src/models/galleryModel.ts) – `title`, `imageNew` powering the gallery grid.
- [src/models/gkCurrAffModel.ts](src/models/gkCurrAffModel.ts) – Dual image/title/link pairs for GK and Current Affairs drops plus a parent `title`.
- [src/models/heroPosterModel.ts](src/models/heroPosterModel.ts) – Title + hero image URL for slider cards.
- [src/models/keyOfferingsModel.ts](src/models/keyOfferingsModel.ts) – Feature title + icon image.
- [src/models/noticeModel.ts](src/models/noticeModel.ts) – Notice title and downloadable PDF Buffer.
- [src/models/teacherModel.ts](src/models/teacherModel.ts) – Faculty name, specialization, portrait.
- [src/models/testimonialModel.ts](src/models/testimonialModel.ts) – Student name, exam label, quote, profile image.
- [src/models/userModel.ts](src/models/userModel.ts) – Email, optional username, bcrypt-hashed password for dashboard access.
- [src/models/youtubeVideoModel.ts](src/models/youtubeVideoModel.ts) – Title + video link rendered inside the Video Lessons section.

## Integrations & Utilities
- **Cloudinary helpers** – [src/hooks/CloudinaryImageUpload.tsx](src/hooks/CloudinaryImageUpload.tsx) and [src/hooks/CloudinaryImageDelete.tsx](src/hooks/CloudinaryImageDelete.tsx) standardize media lifecycle management.
- **EmailJS** – Contact and registration forms rely on `NEXT_PUBLIC_EMAILJS_*` secrets to send leads straight to staff inboxes with instant toast feedback.
- **Content dictionaries** – `src/utility` centralizes hero copy, CTA text, stats, offerings, navbar/footer metadata, etc., so non-technical stakeholders can update JSON-like structures without touching JSX.
- **Client feedback loop** – Toast notifications (`react-toastify`) are wired into every form and data-fetching hook for transparent success/error messaging.
- **Messaging CTA** – [src/components/WhatsAppButton/index.tsx](src/components/WhatsAppButton/index.tsx) remains active on every customer-facing page, enabling instant enrolment queries.

## Environment Variables
Set these in `.env.local` (prefix with `NEXT_PUBLIC_` exactly as shown where required):
- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_SECOND_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## Local Development
- `npm install` – Install dependencies.
- `npm run dev` – Start Next.js in development mode on `http://localhost:3000`.
- `npm run build && npm run start` – Produce and serve the production bundle.
- `npm run lint` – Static analysis via ESLint + Next.js rules.

## Project Structure Snapshot
```
src/
├─ app/
│  ├─ (routes)/about | admin-dashboard | admin-login | contact | courses | exams | gk | ...
│  ├─ api/ (auth, course, exam, feedback, gallery, gkca, heroPoster, keyoffer, notice, teacher, testimonial, youtube-video)
│  ├─ globals.css | layout.tsx | page.tsx
├─ components/ (Hero carousel, stats, services, notices, forms, auth, footer, navbar, WhatsApp CTA, etc.)
├─ hooks/ (Cloudinary helpers, useFetch* hooks for each entity)
├─ lib/ (database.ts, jwt.ts)
├─ models/ (Mongoose schemas listed above)
├─ utility/ (copy decks, static content, CTA metadata)
├─ assets/ (images, gifs)
```

## Operational Notes
- **Admin workflow** – [src/components/EditOptionsComp/index.tsx](src/components/EditOptionsComp/index.tsx) surfaces every managed domain defined in [src/utility/AdminDashboard.ts](src/utility/AdminDashboard.ts). Each tile links to `/admin-dashboard/admin-routes/*`, where staff upload FormData, trigger Cloudinary operations, and publish updates in real time.
- **Security** – Middleware ensures only token holders reach the dashboard, while visits to `/admin-login` with valid cookies are auto-redirected back to `/admin-dashboard`.
- **Downloads** – Course, exam, and notice downloads stream from secure API routes, so PDFs stay behind authentication gates until intentionally requested.
- **Extensibility** – Adding a new managed domain typically involves: creating a model in `src/models`, scaffolding CRUD handlers under `src/app/api/<entity>`, building a React hook in `src/hooks`, and wiring a dashboard tile via `dashboardsFields`.