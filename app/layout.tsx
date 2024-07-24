// import { GoogleAnalytics } from '@next/third-parties/google';

import '@/styles/style.css';
import { dm_sans, josefin_sans } from '@/app/fonts';
import { UserStoreProvider } from '@/providers/user-store-provider';
import { AppStoreProvider } from '@/providers/app-store-providers';
import clsx from 'clsx';

export const metadata = {
  title: 'Fundraising School - Be a great deal for investors and raise money like a pro',
  description:
    'Fuel your LATAM startup at Fundraising School. Master fundraising with expert-led courses on pitch decks and venture capital. Join to accelerate growth, achieve goals, and network with founders. Unleash fundraising expertise for success!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx(dm_sans.variable, josefin_sans.variable)}>
      <body className="bg-white font-sans tracking-tight text-gray-900 antialiased">
        <UserStoreProvider>
          <AppStoreProvider>{children}</AppStoreProvider>
        </UserStoreProvider>
      </body>
      {/* <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID as string} /> */}
    </html>
  );
}
