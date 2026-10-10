import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '링크나무',
  description: '내 모든 링크를 한 곳에서 관리하는 Link in Bio 페이지',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
