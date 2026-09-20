'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Message } from '@/lib/types';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  isDashboard?: boolean;
}

export default function AdminHeader({ title, subtitle, showBack, isDashboard }: AdminHeaderProps) {
  const router = useRouter();
  const supabase = createClient();

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [unreadMessages, setUnreadMessages] = useState<Message[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSession();
    fetchUnreadMessages();

    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function fetchSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.email) {
      setUserEmail(session.user.email);
    }
  }

  async function fetchUnreadMessages() {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('is_read', false)
      .order('created_at', { ascending: false });
    if (data) {
      setUnreadMessages(data as Message[]);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin');
  }

  return (
    <header className="fixed top-0 w-full max-w-[440px] left-1/2 -translate-x-1/2 z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(30,27,25,0.03)]">
      <div className="h-16 px-gutter-mobile flex items-center justify-between">
        <div className="flex items-center gap-space-2xs">
          {showBack && (
            <button onClick={() => router.back()} className="w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-on-surface hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          )}

          <div className="flex flex-col ml-1">
            {isDashboard ? (
              <div className="flex items-center gap-space-2xs">
                <span className="font-headline-sm text-headline-sm text-primary tracking-tight">Ellee Admin</span>
              </div>
            ) : (
              <h1 className="font-title-lg text-title-lg text-on-surface leading-tight">{title}</h1>
            )}
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">{subtitle || 'Ellee Atelier Admin'}</span>
          </div>
        </div>

        <div className="flex items-center gap-space-xs relative">
          
          {/* Notifications */}
          <div ref={notifRef} className="relative flex items-center">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} 
              className="relative w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {unreadMessages.length > 0 && (
                <span className="absolute top-2 right-2.5 w-2.5 h-2.5 rounded-full bg-error border-2 border-surface"></span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute top-12 right-0 w-72 bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-surface-container overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-3 border-b border-surface-container flex items-center justify-between bg-surface-container-low">
                  <span className="font-title-sm text-title-sm text-on-surface">Notifications</span>
                  {unreadMessages.length > 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-error text-on-error px-2 py-0.5 rounded-full">{unreadMessages.length} New</span>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {unreadMessages.length === 0 ? (
                    <div className="p-6 text-center text-sm text-on-surface-variant flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-[32px] text-surface-container-highest">done_all</span>
                      You&apos;re all caught up!
                    </div>
                  ) : (
                    <div className="flex flex-col divide-y divide-surface-container">
                      {unreadMessages.map(msg => (
                        <Link href="/admin/messages" key={msg.id} onClick={() => setIsNotificationsOpen(false)} className="p-4 hover:bg-surface-container-low transition flex flex-col gap-1 group">
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">{msg.name}</span>
                            <span className="text-[10px] text-on-surface-variant">
                              {new Date(msg.created_at || '').toLocaleDateString()}
                            </span>
                          </div>
                          <span className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">{msg.message}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-surface-container bg-surface-container-lowest text-center">
                  <Link href="/admin/messages" onClick={() => setIsNotificationsOpen(false)} className="text-xs font-semibold text-primary hover:underline flex items-center justify-center gap-1">
                    Open Inbox <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative flex items-center">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)} 
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition-opacity focus:outline-none ring-2 ring-transparent focus:ring-primary-container"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </button>

            {isProfileOpen && (
              <div className="absolute top-12 right-0 w-64 bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-surface-container overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-4 border-b border-surface-container flex flex-col gap-1 bg-surface-container-low">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">Signed in as</span>
                  <span className="text-sm font-semibold text-on-surface truncate">{userEmail || 'Admin'}</span>
                </div>
                <div className="p-2">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-error hover:bg-error-container hover:text-on-error-container transition-colors text-sm font-medium"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
