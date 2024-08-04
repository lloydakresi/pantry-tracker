import "./globals.css";
import { inter, righteous,raleway } from './utils/fonts'
import Link from "next/link";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export const metadata = {
  title: "Pantrify",
  description: "A pantry management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter} ${righteous} ${raleway}`}>
        <AppRouterCacheProvider>
        <header className="flex flex-row justify-between items-center mx-5 my-5">
          <h1 className="font-righteous font-extrabold text-4xl">Pantrify</h1>
          <nav>
            <ul className=" font-medium text-xl flex flex-row justify-between gap-x-10">
              <Link href="#">ABOUT</Link>
              <Link href="#">CONTACT</Link>
            </ul>
          </nav>
        </header>
        {children}
        <footer className="text-white text-sm py-4 mt-4">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Pantrify. All rights reserved.</p>
          </div>
        </footer>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
