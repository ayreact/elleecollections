import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Ellee Collections',
  description: 'Get in touch with Ellee Collections for inquiries, support, or collaborations. We are here to help.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
