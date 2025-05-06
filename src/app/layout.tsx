import type {Metadata} from 'next';
import { Roboto } from 'next/font/google'; // Changed from Source_Sans_Pro to Roboto
import './globals.css';
import Link from 'next/link';
import { Toaster } from "@/components/ui/toaster"; 

const roboto = Roboto({ // Changed from sourceSansPro
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic']
});

export const metadata: Metadata = {
  title: 'EbaAaZ', 
  description: 'Coordination and Integration Hub powered by SeCuReDmE',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} text-center`}> {/* Applied roboto.className */}
        <header className="header sticky top-0 z-50 w-full border-b backdrop-blur">
          <div className="container flex h-14 items-center header-menu">
             <Link href="/" className="mr-6 flex items-center space-x-2" style={{ margin: '0 10px' }}>
                <span className="font-bold">EbaAaZ</span>
            </Link>
             <nav className="flex items-center space-x-4 text-sm font-medium">
                <Link href="/" style={{ margin: '0 10px' }}>Human Hub</Link>
                <Link href="/github-mcp-server" style={{ margin: '0 10px' }}>MCP Server</Link>
                <Link href="/resources-hub" style={{ margin: '0 10px' }}>Resources Hub</Link>
             </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main> 
         <Toaster /> 
        <footer className="footer py-6 md:px-8 md:py-0 border-t">
           <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
             <p className="text-center text-sm leading-loose text-muted-foreground md:text-center">
                &copy; {new Date().getFullYear()} EbaAaZ - SeCuReDmE Initiative.
             </p>           </div>
        </footer>
      </body>
    </html>
  );
}
