import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Left side */}
        <div className="flex items-center gap-8">
          <span className="text-xl font-semibold text-blue-700">
            VeValX
          </span>

          <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/">Dashboard</Link>
            <Link href="/">How It Works</Link>
            <Link href="/">FAQ</Link>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Demo Appraiser
          </span>

          <button className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-100">
            Logout
          </button>
        </div>

      </div>
    </header>
  );
}
