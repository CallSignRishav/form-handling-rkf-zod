import Link from "next/link";
import { ClipboardList } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="focus-visible:ring-ring flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2"
        >
          <span className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-lg border">
            <ClipboardList className="size-4.5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Form<span className="text-primary">Forge</span>
          </span>
        </Link>

        <ModeToggle />
      </div>
    </header>
  );
}
