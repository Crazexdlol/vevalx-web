import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <main className="mx-auto w-full max-w-[1400px] px-6 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
