# Portfolio Project

Personal portfolio site built with the Next.js App Router.

## Tech stack

- **Next.js** 16 (App Router)
- **React** 19
- **TypeScript** 5
- **Tailwind CSS** v4
- **Framer Motion / Motion One**
- **Zod** (client-side validation)

## Features

- **Sections**: Hero, Projects, Services, Tech Stack, Footer/Contact
- **Contact form**: minimal floating-label UI + client-side Zod validation + Web3Forms submission
- **Basic spam/rate limiting**: honeypot field and a small localStorage-based cooldown

## Getting started (Windows / PowerShell)

Install dependencies:

```powershell
npm install
```

Create `.env` in the project root:

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

Run the dev server:

```powershell
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```powershell
npm run dev
npm run build
npm run start
npm run lint
```

## Contact form notes

- The Web3Forms access key is **public by design** (similar to a form id), so it is exposed to the browser via `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.
- Validation is done with Zod in `components/sections/footer.tsx`.

## Images

This project allows Next Image qualities `75` and `85` in `next.config.ts` to match the `quality={85}` usage in project images.

## Deployment

Deploy to Vercel (recommended for Next.js) or any platform that supports Node.js.
