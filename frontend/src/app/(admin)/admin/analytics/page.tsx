'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { AnalyticsEvent } from '@/lib/types';
import AdminHeader from '@/components/AdminHeader';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsDashboard() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      if (data) {
        setEvents(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const productViews = events.filter(e => e.event_name === 'product_view');
  const checkouts = events.filter(e => e.event_name === 'whatsapp_checkout');

  const categoryViewsMap: Record<string, number> = {};
  productViews.forEach(e => {
    const cat = e.payload?.category || 'Uncategorized';
    categoryViewsMap[cat] = (categoryViewsMap[cat] || 0) + 1;
  });
  
  const categoryData = Object.entries(categoryViewsMap)
    .map(([name, views]) => ({ name, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const pieData = [
    { name: 'Product Views', value: productViews.length, color: '#A89F91' },
    { name: 'Checkouts initiated', value: checkouts.length, color: '#25D366' },
  ];

  function formatEventText(event: AnalyticsEvent) {
    const p = event.payload;
    if (event.event_name === 'whatsapp_checkout') {
      return `Started checkout for ${p.total_items} item(s) totaling ₦${p.subtotal?.toLocaleString()}`;
    }
    if (event.event_name === 'product_view') {
      return `Viewed ${p.product_title || 'a product'} in ${p.category || 'store'}`;
    }
    return `Performed ${event.event_name.replace('_', ' ')}`;
  }

  return (
    <>
      <AdminHeader title="Analytics" showBack={true} />

      <main className="flex flex-col relative w-full bg-surface min-h-screen">
        <div className="flex flex-col w-full px-space-md space-y-space-md pb-space-lg relative mt-4">
          
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-space-sm mb-2">
            <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container shadow-sm flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[28px] text-tertiary mb-2">visibility</span>
              <span className="font-headline-md text-headline-md text-on-surface">{productViews.length}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Product Views</span>
            </div>
            <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container shadow-sm flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[28px] text-[#25D366] mb-2">shopping_bag</span>
              <span className="font-headline-md text-headline-md text-on-surface">{checkouts.length}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Checkouts</span>
            </div>
          </div>

          {/* Charts */}
          {!isLoading && events.length > 0 && (
            <div className="flex flex-col gap-space-md">
              <section className="bg-surface-container-lowest rounded-xl border border-surface-container p-space-md shadow-sm">
                <h3 className="font-title-md text-title-md text-on-surface mb-6">Trending Categories</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#78736B', fontSize: 12 }} width={90} />
                      <Tooltip 
                        cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                      />
                      <Bar dataKey="views" fill="#3D4536" radius={[0, 4, 4, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>

              <section className="bg-surface-container-lowest rounded-xl border border-surface-container p-space-md shadow-sm">
                <h3 className="font-title-md text-title-md text-on-surface mb-2">Intent Distribution</h3>
                <div className="h-48 w-full flex items-center justify-center relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <span className="font-headline-sm text-headline-sm text-on-surface">{events.length}</span>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">Events</span>
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {pieData.map(d => (
                    <div key={d.name} className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                      <span className="text-xs text-on-surface-variant font-medium">{d.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Activity Feed */}
          <h3 className="font-title-md text-title-md text-on-surface mt-2">Recent Activity Feed</h3>
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container overflow-hidden flex flex-col">
            {isLoading ? (
              <div className="p-8 flex justify-center">
                <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
              </div>
            ) : events.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant text-sm">No analytics events found yet.</div>
            ) : (
              <div className="flex flex-col divide-y divide-surface-container">
                {events.map(event => (
                  <div key={event.id} className="p-space-md flex flex-col gap-1.5 hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${event.event_name === 'whatsapp_checkout' ? 'bg-[#25D366]/15 text-[#25D366]' : 'bg-tertiary-container/30 text-tertiary'}`}>
                        <span className="material-symbols-outlined text-[16px]">
                          {event.event_name === 'whatsapp_checkout' ? 'chat' : 'visibility'}
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="font-label-md text-label-md text-on-surface leading-tight">
                          {formatEventText(event)}
                        </span>
                        <span className="text-[11px] text-on-surface-variant mt-0.5">
                          {new Date(event.created_at || '').toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
