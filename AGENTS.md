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
- Theme: `next-themes` `ThemeProvider` in `src/app/layout.tsx` (`defaultTheme="system"`, `enableSystem`); `ModeToggle` in `src/components/Header.tsx`. shadcn's `.dark` CSS variables in `src/styles/globals.css` drive the dark theme.
- Tailwind v4 is CSS-first: no `tailwind.config.ts`. `postcss.config.mjs` uses `@tailwindcss/postcss`; `globals.css` imports `tailwindcss`, `tw-animate-css`, and `shadcn/tailwind.css`.
- Form pattern: Zod schemas + inferred types live in `src/utils/types.ts` (`formSchemaType`/`FormType` for register, `loginSchema`/`LoginType` for login, `contactSchema`/`ContactType` for contact). Forms are client components (`"use client"`) wired with `zodResolver` from `@hookform/resolvers/zod`, `mode: "onSubmit"`, `noValidate` on the `<form>`, and RHF `<Controller>` + shadcn `Field`/`FieldLabel`/`FieldError`/`FieldGroup`. Register fields: `fullname`, `password` (min 8 + complexity regex), `email`, `mobile` (10-digit regex), `confirm` (boolean checkbox with `.refine(v => v === true)`). Login fields: `email`, `password`. Contact fields: `name`, `email`, `phone` (10-digit regex), `subject`, `message` (uses `<Textarea>` from `src/components/ui/textarea.tsx`). The checkbox uses `Field orientation="horizontal"` with the error rendered below in a wrapping `div`; password inputs have a show/hide toggle (local `useState` + lucide `Eye`/`EyeOff`). Submit and Clear buttons sit in a flex row; Clear calls `form.reset()`. Submit fakes a 1s delay, `console.log`s the payload, resets, and shows a success toast via `toast.add({ title, description, type })` from `@/components/ui/toast` (Base UI toast manager; `<Toaster />` is mounted in `layout.tsx`). Submit buttons render `<Spinner />` while `form.formState.isSubmitting`.
- `next.config.mjs` enables `typedRoutes: true` (typed `Link` hrefs).
- `src/components/FormPlaceholder.tsx` is currently unused (dead code); only the three form components are rendered.
- No CI, no test suite, no env vars. `.next/` and `next-env.d.ts` are gitignored.
- Default branch is `main`; active work happens on `development`.
