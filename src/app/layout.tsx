import './globals.css';
import { Providers } from './providers';

export const metadata = { title: 'Skill Swap Tamil', description: 'பணமில்லா பரிமாற்றம்' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ta">
      <body className="bg-gradient-to-br from-blue-50 to-cyan-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}