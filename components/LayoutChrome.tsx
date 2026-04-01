'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import B2BChatbot from './B2BChatbot';
import ExitIntentPopup from './ExitIntentPopup';
import ConversionTracker from './ConversionTracker';

type LayoutChromeProps = {
  children: React.ReactNode;
};

export default function LayoutChrome({ children }: LayoutChromeProps) {
  const pathname = usePathname();
  const isInternal = pathname?.startsWith('/internal');

  if (isInternal) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <B2BChatbot />
      <ExitIntentPopup />
      <ConversionTracker />
    </>
  );
}
