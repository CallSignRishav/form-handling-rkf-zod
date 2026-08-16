# AGENTS.md

## Stack

Next.js 16 demo app for form handling with React Hook Form + Zod + shadcn/ui (base style) + Tailwind v4. Single page, no backend, no tests.

## Commands

- Package manager is **bun** (bun.lock). Use `bun install`, `bun run <script>`, `bunx <tool>`.
- `bun run dev` / `bun run build` / `bun run start`
- Lint: `bun run lint` (`eslint`, flat config in `eslint.config.mjs`)
- Typecheck: `bunx tsc --noEmit` (no script exists)
- Format: `bunx prettier --write .` (`.prettierrc` adds `prettier-plugin-tailwindcss`, which sorts utility classes)
- shadcn: `bunx shadcn@latest add <component>` (config in `components.json`)
- shadcn components use the `base-nova` style, which is **Base UI** based (`@base-ui/react` is a dependency), not the default Radix-based registry. Keep adding components with the same style; do not hand-mix Radix components in.

## Gotchas

- **App Router**: code lives in `src/app/` (`layout.tsx`, `page.tsx`). There is no `src/pages/`.
- Path alias `@/*` maps to `src/*` (tsconfig `paths`). shadcn components live in `src/components/ui/`.
- Dark mode is forced globally via `className="dark"` on `<html>` in `src/app/layout.tsx`; shadcn's `.dark` CSS variables in `src/styles/globals.css` drive the theme.
- Tailwind v4 is CSS-first: no `tailwind.config.ts`. `postcss.config.mjs` uses `@tailwindcss/postcss`; `globals.css` imports `tailwindcss`, `tw-animate-css`, and `shadcn/tailwind.css`.
- Form pattern: Zod schema + inferred type live in `src/utils/types.ts`; `RegisterForm.tsx` (a client component) wires it with `zodResolver` from `@hookform/resolvers/zod`, `mode: "all"`, `noValidate` on the `<form>`, and RHF `<Controller>` + shadcn `Field`/`FieldLabel`/`FieldError`/`FieldGroup`. Fields: `fullname`, `password` (min 8 + complexity regex), `email`, `mobile` (10-digit regex), `confirm` (boolean checkbox with `.refine(v => v === true)`). The checkbox uses `Field orientation="horizontal"` with the error rendered below in a wrapping `div`; the password input has a show/hide toggle (local `useState` + lucide `Eye`/`EyeOff`). Submit and Clear buttons sit in a flex row; Clear calls `form.reset()`.
- No CI, no test suite, no env vars. `.next/` and `next-env.d.ts` are gitignored.
- Default branch is `main`; active work happens on `development`.
