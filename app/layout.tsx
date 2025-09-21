// app/layout.tsx
import Providers from "./components/providers";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Fullstack App",
  description: "Next.js Fullstack Setup",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>  
      </body>
    </html>
  );
}
