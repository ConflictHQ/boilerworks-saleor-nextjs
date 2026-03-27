import Link from "next/link";
import { StoreIcon } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <StoreIcon className="h-8 w-8" />
          Boilerworks Store
        </Link>
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
