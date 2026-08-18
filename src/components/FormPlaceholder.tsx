import type { LucideIcon } from "lucide-react";

interface FormPlaceholderProps {
  icon: LucideIcon;
  description: string;
}

const FormPlaceholder = ({ icon: Icon, description }: FormPlaceholderProps) => {
  return (
    <div className="border-input/60 bg-muted/30 flex flex-col items-center gap-4 rounded-xl border border-dashed px-6 py-12 text-center">
      <span className="flex size-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400">
        <Icon className="size-6" />
      </span>

      <p className="text-muted-foreground max-w-xs text-sm">{description}</p>

      <span className="border-input text-muted-foreground rounded-full border px-3 py-1 text-xs font-medium">
        Coming soon
      </span>
    </div>
  );
};

export default FormPlaceholder;
