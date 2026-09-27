'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { AnalyticsEvent } from '@/lib/types';
import AdminHeader from '@/components/AdminHeader';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function parseDateString(dateStr: string) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-');
  return new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
}

function DatePicker({ value, onChange, align = 'left' }: { value: string, onChange: (v: string) => void, align?: 'left' | 'right' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const d = parseDateString(value);
      if (d && !isNaN(d.getTime())) setCurrentMonth(d);
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const selectDate = (d: Date) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    onChange(`${yyyy}-${mm}-${dd}`);
    setIsOpen(false);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const parsedValue = value ? parseDateString(value) : null;

  return (
    <div className="relative" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-xl border border-surface-container pl-3 pr-2.5 py-2 cursor-pointer shadow-sm hover:border-primary/50 transition-all w-[140px]"
      >
        <span className={value ? "text-on-surface font-medium" : "text-on-surface-variant"}>
          {value || "Select date"}
        </span>
        <span className="material-symbols-outlined text-on-surface-variant text-[18px]">calendar_month</span>
      </div>

      {isOpen && (
        <div className={`absolute top-full mt-1.5 p-3 bg-surface-container-lowest border border-surface-container rounded-2xl shadow-xl z-50 w-64 animate-backdrop-in ${align === 'right' ? 'right-0' : 'left-0'}`}>
          <div className="flex items-center justify-between mb-3">
            <button onClick={handlePrevMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <span className="font-title-sm text-on-surface font-medium">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button onClick={handleNextMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} className="text-center text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
                {d}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => {
              if (!d) return <div key={`empty-${i}`} className="w-8 h-8"></div>;
              
              const isSelected = parsedValue && d.getFullYear() === parsedValue.getFullYear() && d.getMonth() === parsedValue.getMonth() && d.getDate() === parsedValue.getDate();
              const isToday = d.toDateString() === new Date().toDateString();
              
              return (
                <button
                  key={i}
                  onClick={() => selectDate(d)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-xs transition-colors ${
                    isSelected 
                      ? 'bg-primary text-on-primary font-bold shadow-sm' 
                      : isToday
                        ? 'bg-surface-container-high text-primary font-bold hover:bg-primary-container'
                        : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
          
          {value && (
            <div className="mt-3 pt-2 border-t border-surface-container text-center">
              <button onClick={() => { onChange(''); setIsOpen(false); }} className="text-[11px] text-error hover:text-error-container font-semibold transition-colors">
                Clear Selection
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isLoadingCharts, setIsLoadingCharts] = useState(true);
  const [chartStartDate, setChartStartDate] = useState('');
  const [chartEndDate, setChartEndDate] = useState('');

  const [feedEvents, setFeedEvents] = useState<AnalyticsEvent[]>([]);
  const [isFeedLoading, setIsFeedLoading] = useState(true);
  const [feedLoadingMore, setFeedLoadingMore] = useState(false);
  const [feedStartDate, setFeedStartDate] = useState('');
  const [feedEndDate, setFeedEndDate] = useState('');
  const [feedHasMore, setFeedHasMore] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    fetchChartEvents();
  }, [chartStartDate, chartEndDate]);

  useEffect(() => {
    fetchFeedEvents(true);
  }, [feedStartDate, feedEndDate]);

  async function fetchChartEvents() {
    setIsLoadingCharts(true);
    try {
      let query = supabase.from('analytics_events').select('*').order('created_at', { ascending: false });
      if (chartStartDate) query = query.gte('created_at', new Date(chartStartDate).toISOString());
      if (chartEndDate) query = query.lte('created_at', new Date(chartEndDate + 'T23:59:59.999Z').toISOString());
      
      const { data } = await query;
      if (data) setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingCharts(false);
    }
  }

  async function fetchFeedEvents(reset = false) {
    if (reset) setIsFeedLoading(true);
    else setFeedLoadingMore(true);
    
    try {
      const from = reset ? 0 : feedEvents.length;
      const to = from + 19;
      
      let query = supabase.from('analytics_events').select('*').order('created_at', { ascending: false }).range(from, to);
      if (feedStartDate) query = query.gte('created_at', new Date(feedStartDate).toISOString());
      if (feedEndDate) query = query.lte('created_at', new Date(feedEndDate + 'T23:59:59.999Z').toISOString());

      const { data } = await query;
      if (data) {
        if (reset) {
          setFeedEvents(data);
        } else {
          setFeedEvents(prev => {
            const existingIds = new Set(prev.map(e => e.id));
            const unique = data.filter(e => !existingIds.has(e.id));
            return [...prev, ...unique];
          });
        }
        setFeedHasMore(data.length >= 20);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsFeedLoading(false);
      setFeedLoadingMore(false);
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
          
          <div className="flex flex-col space-y-3 mb-2">
            <h2 className="font-title-lg text-title-lg text-on-surface">Overview</h2>
            <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-2xl w-max border border-surface-container shadow-sm">
              <DatePicker value={chartStartDate} onChange={setChartStartDate} />
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-container-lowest border border-surface-container shadow-sm">
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant">arrow_forward</span>
              </div>
              <DatePicker value={chartEndDate} onChange={setChartEndDate} align="right" />
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-space-sm">
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
          {isLoadingCharts ? (
            <div className="flex justify-center p-8"><span className="material-symbols-outlined animate-spin text-primary">progress_activity</span></div>
          ) : events.length === 0 ? (
            <div className="text-center py-8 text-on-surface-variant text-sm bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm">No analytics events in this period.</div>
          ) : (
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
          <div className="flex flex-col space-y-3 mt-4">
            <h3 className="font-title-md text-title-md text-on-surface">Recent Activity Feed</h3>
            <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-2xl w-max border border-surface-container shadow-sm mb-2">
              <DatePicker value={feedStartDate} onChange={setFeedStartDate} />
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-container-lowest border border-surface-container shadow-sm">
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant">arrow_forward</span>
              </div>
              <DatePicker value={feedEndDate} onChange={setFeedEndDate} align="right" />
            </div>
          </div>
          
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container overflow-hidden flex flex-col">
            {isFeedLoading ? (
              <div className="p-8 flex justify-center">
                <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
              </div>
            ) : feedEvents.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant text-sm">No analytics events found in this period.</div>
            ) : (
              <div className="flex flex-col divide-y divide-surface-container">
                {feedEvents.map(event => (
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
                
                {feedHasMore && (
                  <div className="p-4 flex justify-center border-t border-surface-container bg-surface-container-lowest/50">
                    <button 
                      onClick={() => fetchFeedEvents(false)}
                      disabled={feedLoadingMore}
                      className="px-6 py-2 bg-surface-container-low hover:bg-surface-container active:scale-95 text-on-surface text-sm font-semibold rounded-lg border border-surface-container transition-all disabled:opacity-50"
                    >
                      {feedLoadingMore ? 'Loading...' : 'Load More'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
