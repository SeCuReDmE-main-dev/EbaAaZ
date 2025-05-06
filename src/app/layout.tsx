
import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EbaAaZ Hub', // Updated Title
  description: 'Coordination and Integration Hub powered by SeCuReDmE',

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="header sticky top-0 z-50 w-full border-b backdrop-blur">
          <div className="container flex h-14 items-center header-menu">
             <Link href="/" className="mr-6 flex items-center space-x-2" style={{ margin: '0 10px' }}>
                {/* Optional: Add Logo SVG here */}
                <span className="font-bold">EbaAaZ Hub</span>
            </Link>
             <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link href="/" style={{ margin: '0 10px' }}>Human hub</Link>
                <Link href="/github-mcp-server" style={{ margin: '0 10px' }}>MCP Server</Link>
                 {/* Add other primary navigation links here */}
             </nav>
          </div>
        </header>
        <main className="flex-1 page-fade-in">{children}</main> {/* Ensure main content area is flexible */}
         <Toaster /> {/* Add Toaster component here */}
        <footer className="footer py-6 md:px-8 md:py-0 border-t">
           <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
             <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                &copy; {new Date().getFullYear()} EbaAaZ - SeCuReDmE Initiative.
             </p>
             {/* Optional: Add footer links */}
           </div>
        </footer>
      </body>
    </html>
  );
}

