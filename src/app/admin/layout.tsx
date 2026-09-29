import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Misty Heights Endawala",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
