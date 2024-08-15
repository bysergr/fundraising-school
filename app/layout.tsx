import { GoogleAnalytics } from '@next/third-parties/google';

import '@/styles/style.css';
import { dm_sans, josefin_sans } from '@/app/fonts';
import { UserStoreProvider } from '@/providers/user-store-provider';
import { AppStoreProvider } from '@/providers/app-store-providers';
import { ToastProvider } from '@/providers/toast-provider';
import clsx from 'clsx';

export const metadata = {
  title: 'Colombia Tech Week | Dashboard',
  description:
    "Exclusive events connecting global venture leaders, attracting foreign investment, and celebrating the region's entrepreneurial spirit.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx(dm_sans.variable, josefin_sans.variable)}>
      <body className="bg-white font-sans tracking-tight text-gray-900 antialiased">
        <ToastProvider>
          <UserStoreProvider>
            <AppStoreProvider>{children}</AppStoreProvider>
          </UserStoreProvider>
        </ToastProvider>
      </body>
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID as string} />
    </html>
  );
}
