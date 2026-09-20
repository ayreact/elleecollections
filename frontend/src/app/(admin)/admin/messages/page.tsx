'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Message } from '@/lib/types';
import AdminHeader from '@/components/AdminHeader';

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (data) {
      setMessages(data as Message[]);
    }
    setIsLoading(false);
  }

  function showToast(text: string) {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 2000);
  }

  async function toggleRead(msg: Message) {
    const newVal = !msg.is_read;
    const { error } = await supabase.from('messages').update({ is_read: newVal }).eq('id', msg.id);
    if (!error) {
      setMessages(messages.map(m => m.id === msg.id ? { ...m, is_read: newVal } : m));
    }
  }

  async function togglePin(msg: Message) {
    const newVal = !msg.is_pinned;
    const { error } = await supabase.from('messages').update({ is_pinned: newVal }).eq('id', msg.id);
    if (!error) {
      const updated = messages.map(m => m.id === msg.id ? { ...m, is_pinned: newVal } : m);
      updated.sort((a, b) => {
        if (a.is_pinned === b.is_pinned) {
          return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
        }
        return a.is_pinned ? -1 : 1;
      });
      setMessages(updated);
      showToast(newVal ? 'Message pinned' : 'Message unpinned');
    }
  }

  async function deleteMessage(msg: Message) {
    if (!confirm('Are you sure you want to delete this message?')) return;
    const { error } = await supabase.from('messages').delete().eq('id', msg.id);
    if (!error) {
      setMessages(messages.filter(m => m.id !== msg.id));
      showToast('Message deleted');
    }
  }

  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <>
      <AdminHeader title="Inbox" showBack={true} />
      <main className="flex flex-col relative w-full bg-surface min-h-screen">
        <div className="flex flex-col w-full px-space-md space-y-space-md pb-space-lg relative mt-4">
          
          <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
            <span className="font-headline-sm text-headline-sm text-on-surface">Messages</span>
            <div className="text-sm font-medium text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full">
              {messages.filter(m => !m.is_read).length} Unread
            </div>
          </div>

          <div className="flex flex-col gap-space-xs">
            {isLoading ? (
              <div className="py-12 flex justify-center"><span className="material-symbols-outlined animate-spin text-primary">progress_activity</span></div>
            ) : messages.length === 0 ? (
              <div className="py-12 text-center text-on-surface-variant flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-[40px] text-surface-container-highest">inbox</span>
                <p>Your inbox is empty.</p>
              </div>
            ) : (
              messages.map(msg => {
                const isExpanded = expandedId === msg.id;
                return (
                  <div key={msg.id} className={`bg-surface-container-lowest rounded-xl shadow-sm border overflow-hidden transition-all duration-200 ${!msg.is_read ? 'border-primary shadow-md' : 'border-surface-container'} ${msg.is_pinned ? 'ring-1 ring-secondary' : ''}`}>
                    <div 
                      onClick={() => {
                        setExpandedId(isExpanded ? null : msg.id as string);
                        if (!msg.is_read) toggleRead(msg);
                      }}
                      className="p-4 cursor-pointer flex flex-col gap-2 relative"
                    >
                      <div className="flex justify-between items-start pr-12">
                        <div className="flex flex-col">
                          <h3 className={`text-base truncate ${!msg.is_read ? 'font-bold text-on-surface' : 'font-medium text-on-surface-variant'}`}>
                            {msg.name}
                          </h3>
                          <span className="text-xs text-on-surface-variant">{msg.contact_info}</span>
                        </div>
                        <span className="text-xs text-on-surface-variant whitespace-nowrap">
                          {new Date(msg.created_at || '').toLocaleDateString()}
                        </span>
                      </div>
                      
                      {!isExpanded && (
                        <p className={`text-sm truncate ${!msg.is_read ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>
                          {msg.message}
                        </p>
                      )}

                      <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
                        {msg.is_pinned && <span className="material-symbols-outlined text-[16px] text-secondary">push_pin</span>}
                        {!msg.is_read && <span className="w-2.5 h-2.5 rounded-full bg-primary mt-1"></span>}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-2 border-t border-surface-container bg-surface-container-low/50">
                        <p className="text-sm text-on-surface whitespace-pre-wrap leading-relaxed mb-4">
                          {msg.message}
                        </p>
                        
                        <div className="flex items-center gap-2 justify-end">
                          <button onClick={(e) => { e.stopPropagation(); toggleRead(msg); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-container hover:bg-surface-container-highest transition-colors text-on-surface-variant">
                            <span className="material-symbols-outlined text-[16px]">{msg.is_read ? 'mark_email_unread' : 'drafts'}</span>
                            Mark {msg.is_read ? 'Unread' : 'Read'}
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); togglePin(msg); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${msg.is_pinned ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container hover:bg-surface-container-highest text-on-surface-variant'}`}>
                            <span className="material-symbols-outlined text-[16px]">push_pin</span>
                            {msg.is_pinned ? 'Unpin' : 'Pin'}
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); deleteMessage(msg); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-error-container text-on-error-container hover:bg-error/20 transition-colors">
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
          
          <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-space-md py-space-xs bg-inverse-surface text-inverse-on-surface rounded-full shadow-xl text-body-sm font-body-sm transition-opacity duration-300 z-50 flex items-center gap-2 ${toastMessage ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <span className="material-symbols-outlined text-[16px] text-primary-fixed">info</span>
            <span>{toastMessage}</span>
          </div>

        </div>
      </main>
    </>
  );
}
