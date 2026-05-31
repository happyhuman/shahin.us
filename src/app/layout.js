import { Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Shahin | Personal Website",
  description: "Explore my interactive projects, applications, mathematical visualizations, and personal portfolio.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable}`}
      data-palette="aurora"
      data-background="mesh"
    >
      <body>
        {/* Decorative dynamic background mesh/grid wrapper */}
        <div className="app-bg-wrapper"></div>

        <header className="header">
          <div className="container nav-container">
            <Link href="/" className="logo">
              shahin.us<span className="logo-dot"></span>
            </Link>
            <nav>
              <ul className="nav-links">
                <li>
                  <Link href="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="nav-link">
                    Projects
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <div className="container">{children}</div>
        </main>
      </body>
    </html>
  );
}
