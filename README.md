# Form Handling with React Hook Form and Zod

A production-style demo of form handling in **Next.js 16** using **React Hook Form** for state and submission, **Zod** for schema validation, and **shadcn/ui** (Base UI style) for accessible, themeable UI components.

The app ships three fully working forms: **Register**, **Login**, and **Contact**, each with its own Zod schema, inline validation errors, loading states, and success toasts. It is a frontend-only demo: submitting a form logs the payload to the console and resets the form. There is no backend.

Use it as a reference, fork it, or copy the pattern into your own project.

---

## Features

- **Three tabbed forms** (Register, Login, Contact) with a shared tab shell
- **Zod schemas** with typed inference (`z.infer`) shared between schema and form
- **React Hook Form** with `zodResolver` and `mode: "onSubmit"` (validate on submit, not on every keystroke)
- **Inline field errors** rendered via accessible `FieldError` components (`role="alert"`)
- **Password show/hide toggle** with lucide `Eye` / `EyeOff` icons
- **Confirmation checkbox** with a custom `.refine()` rule
- **Loading spinner** on the submit button while the fake async submit runs
- **Success toasts** after submission
- **Clear button** that resets the form via `form.reset()`
- **Dark / light theme toggle** (`next-themes`, system-aware)
- **Accessible fields**: `aria-invalid`, `htmlFor` labels, `noValidate` on the form
- **Tailwind CSS v4** (CSS-first config) with shadcn/ui `base-nova` style (Base UI based)

---

## Tech Stack & Dependencies

### Runtime dependencies

| Package                    | Version | Purpose                                                  |
| -------------------------- | ------- | -------------------------------------------------------- |
| `next`                     | 16.3.0  | React framework (App Router)                             |
| `react` / `react-dom`      | 19.2.8  | UI library                                               |
| `react-hook-form`          | 7.52.1  | Form state, validation wiring, submission                |
| `zod`                      | 3.23.8  | Schema definition and validation                         |
| `@hookform/resolvers`      | 3.9.0   | Bridges Zod schemas into React Hook Form (`zodResolver`) |
| `shadcn`                   | 4.17.0  | shadcn/ui CLI and registry                               |
| `@base-ui/react`           | 1.7.0   | Base UI primitives used by the `base-nova` shadcn style  |
| `class-variance-authority` | 0.7.1   | Variant styling for UI components                        |
| `clsx`                     | 2.1.1   | Conditional class composition                            |
| `tailwind-merge`           | 3.6.0   | Merges conflicting Tailwind classes                      |
| `tailwindcss`              | 4.3.3   | Utility-first CSS framework (v4, CSS-first)              |
| `tw-animate-css`           | 1.4.0   | Animation utilities for shadcn components                |
| `lucide-react`             | 0.414.0 | Icons (eye, tabs, logo, etc.)                            |
| `next-themes`              | 0.4.6   | Dark / light theme switching                             |

### Dev dependencies

| Package                                           | Version       | Purpose                                |
| ------------------------------------------------- | ------------- | -------------------------------------- |
| `typescript`                                      | 5.x           | Static typing                          |
| `eslint` + `eslint-config-next`                   | 9.x / 16.3.0  | Linting (flat config)                  |
| `prettier` + `prettier-plugin-tailwindcss`        | 3.3.3 / 0.8.1 | Formatting with Tailwind class sorting |
| `@tailwindcss/postcss`                            | 4.3.3         | Tailwind v4 PostCSS plugin             |
| `postcss`                                         | 8.x           | CSS processing                         |
| `@types/node`, `@types/react`, `@types/react-dom` | —             | TypeScript type definitions            |

> **Package manager:** this project uses **bun** (`bun.lock`). You can use `npm` or `pnpm` instead, but the lockfile and commands below assume bun.

---

## Getting Started

### Prerequisites

- **Node.js 20+**
- **bun** (recommended) — install from [bun.sh](https://bun.sh)

### 1. Get the code

Fork the repo on GitHub, then clone your fork (or clone/download the repo directly):

```bash
git clone https://github.com/CallSignRishav/form-handling-rkf-zod.git
cd form-handling-rkf-zod
```

### 2. Install dependencies

```bash
bun install
```

### 3. Run the dev server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see the three forms behind the Register / Login / Contact tabs.

### 4. Production build

```bash
bun run build   # type-check + build
bun run start   # serve the production build
```

---

## Project Structure

```
form-handling-rkf-zod/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: theme provider, header, toaster
│   │   └── page.tsx            # Home page: renders <FormsTabs />
│   ├── components/
│   │   ├── Header.tsx          # Sticky header with logo + theme toggle
│   │   ├── FormsTabs.tsx       # Tab shell switching between the three forms
│   │   ├── RegisterForm.tsx    # Register form (client component)
│   │   ├── LoginForm.tsx       # Login form (client component)
│   │   ├── ContactForm.tsx     # Contact form (client component)
│   │   ├── FormPlaceholder.tsx # Reusable "coming soon" placeholder
│   │   ├── mode-toggle.tsx     # Dark/light theme toggle
│   │   ├── theme-provider.tsx  # next-themes provider wrapper
│   │   └── ui/                 # shadcn/ui components (button, field, input, ...)
│   ├── lib/
│   │   └── utils.ts            # cn() helper (clsx + tailwind-merge)
│   ├── styles/
│   │   └── globals.css         # Tailwind v4 + shadcn theme variables
│   └── utils/
│       └── types.ts            # All Zod schemas + inferred types
├── components.json             # shadcn/ui config (style: base-nova)
├── next.config.mjs             # typedRoutes: true
├── postcss.config.mjs          # @tailwindcss/postcss
├── eslint.config.mjs           # ESLint flat config
├── tsconfig.json               # Path alias @/* -> src/*
└── package.json
```

---

## How the Forms Work

Every form follows the same pattern:

1. **Define a Zod schema** in `src/utils/types.ts` and derive its type with `z.infer`.
2. **Wire the schema into React Hook Form** with `zodResolver` and `mode: "onSubmit"`.
3. **Render fields** with RHF `Controller` + shadcn `Field` / `FieldLabel` / `FieldError` / `FieldGroup`.
4. **Disable native browser validation** with `noValidate` on the `<form>` so Zod owns the errors.
5. **Submit** via `form.handleSubmit()`, then reset and show a toast.

### Schemas (`src/utils/types.ts`)

```ts
export const formSchemaType = z.object({
  fullname: z
    .string()
    .min(3, { message: "Min 3 required" })
    .max(25, { message: "Max 25" }),
  password: z
    .string()
    .min(8, { message: "Min 8 required" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, {
      message: "Must include uppercase, lowercase, number, and special char",
    }),
  email: z.string().email({ message: "Valid email required" }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Must be 10 digits" }),
  confirm: z.boolean().refine((v) => v === true, {
    message: "You must confirm the details are correct",
  }),
});

export type FormType = z.infer<typeof formSchemaType>;
```

### Validation rules

| Form     | Field      | Rules                                                              |
| -------- | ---------- | ------------------------------------------------------------------ |
| Register | `fullname` | min 3, max 25                                                      |
| Register | `password` | min 8, must contain uppercase, lowercase, number, and special char |
| Register | `email`    | valid email                                                        |
| Register | `mobile`   | exactly 10 digits                                                  |
| Register | `confirm`  | must be checked (`true`)                                           |
| Login    | `email`    | valid email                                                        |
| Login    | `password` | min 8, must contain uppercase, lowercase, number, and special char |
| Contact  | `name`     | min 3, max 50                                                      |
| Contact  | `email`    | valid email                                                        |
| Contact  | `phone`    | exactly 10 digits                                                  |
| Contact  | `subject`  | min 3                                                              |
| Contact  | `message`  | min 10                                                             |

### Form component skeleton

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginType } from "@/utils/types";

const LoginForm = () => {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const submitFormFn = async (fData: LoginType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API call
    console.log(fData); // replace with your API call
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(submitFormFn)} noValidate>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Sign In
        </Button>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
```

---

## Using This in Your Own Project

You can use this repo two ways: run it as a standalone demo, or copy the pattern into an existing Next.js app.

### Option A: Run as-is

Follow [Getting Started](#getting-started). The app is self-contained: no env vars, no backend, no API keys.

### Option B: Copy the pattern into an existing Next.js app

1. **Install the form dependencies:**

   ```bash
   bun add react-hook-form zod @hookform/resolvers
   ```

2. **Add the shadcn/ui components** you need (this repo uses the `base-nova` style, which is Base UI based):

   ```bash
   bunx shadcn@latest add button field input textarea checkbox tabs toast
   ```

   > Keep the same style for all components. This repo uses `base-nova`; do not hand-mix Radix-based components in.

3. **Create your schema** in `src/utils/types.ts` (or your own file) and derive the type:

   ```ts
   import { z } from "zod";

   export const loginSchema = z.object({
     email: z.string().email({ message: "Valid email required" }),
     password: z.string().min(8, { message: "Min 8 required" }),
   });

   export type LoginType = z.infer<typeof loginSchema>;
   ```

4. **Build the form component** as a client component (`"use client"`) using the skeleton above. Wire it with `zodResolver`, `mode: "onSubmit"`, `noValidate`, and RHF `Controller` + shadcn `Field` components.

5. **Render it** in a page:

   ```tsx
   import LoginForm from "@/components/LoginForm";

   export default function Home() {
     return <LoginForm />;
   }
   ```

6. **Connect a real backend** by replacing the body of `submitFormFn` with your API call (e.g. `fetch` to your endpoint). The current demo only `console.log`s the payload.

---

## Scripts

| Command                   | Description                               |
| ------------------------- | ----------------------------------------- |
| `bun run dev`             | Start the dev server                      |
| `bun run build`           | Create a production build                 |
| `bun run start`           | Serve the production build                |
| `bun run lint`            | Run ESLint (flat config)                  |
| `bunx tsc --noEmit`       | Type-check without emitting               |
| `bunx prettier --write .` | Format all files (sorts Tailwind classes) |

---

## Contributing

Contributions are welcome. Fork the repo, make your changes on a branch, and open a pull request. Please run `bun run lint` and `bunx tsc --noEmit` before submitting.

---

## License

[MIT](./LICENSE)
