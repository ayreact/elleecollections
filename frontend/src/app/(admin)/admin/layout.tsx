import { ReactNode } from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {user && (
        <form id="logout-form" action={async () => {
          'use server';
          const supabase = await createClient();
          await supabase.auth.signOut();
          redirect('/admin/login');
        }} className="hidden">
        </form>
      )}
      {children}
    </div>
  );
}
