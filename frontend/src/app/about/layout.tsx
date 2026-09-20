import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Ellee Collections',
  description: 'Learn about Ellee Collections, our brand ethos, and our dedication to providing luxury gift boxes, pearl earrings, and silk scarves.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
