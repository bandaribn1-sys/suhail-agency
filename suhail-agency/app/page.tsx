'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    niche: '',
    tone: '',
    targetAudience: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        alert('حدث خطأ أثناء التوليد');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8 font-sans" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          منصة سهيل (Suhail AI)
        </h1>
        <p className="text-slate-400 mb-8">مساعدك الذكي للتسويق المخصص لسوق الخليج والسعودية.</p>

        <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-2xl shadow-xl space-y-4 border border-slate-700">
          <div>
            <label className="block text-sm font-medium mb-1">اسم البراند / المشروع</label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="مثال: متجر التمور الذكية"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">المجال (Niche)</label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="مثال: حلويات وقهوة مختصة"
              value={formData.niche}
              onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">نبرة الصوت (Tone)</label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="مثال: ودودة، محلية، فخمة..."
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">الجمهور المستهدف</label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="مثال: العائلات في الرياض وجدة"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 transition font-bold rounded-lg shadow-lg disabled:opacity-50"
          >
            {loading ? 'جاري توليد الحملة التسويقية...' : 'إطلاق الحملة عبر سهيل 🚀'}
          </button>
        </form>

        {result && (
          <div className="mt-8 bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
            <h2 className="text-2xl font-bold text-emerald-400">النتائج المقترحة:</h2>
            <div className="space-y-4">
              {result.posts?.map((post: any, idx: number) => (
                <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs bg-emerald-900 text-emerald-300 px-2 py-1 rounded">
                    {post.type}
                  </span>
                  <h3 className="font-bold mt-2 text-lg text-cyan-300">{post.hook}</h3>
                  <p className="text-slate-300 mt-1 whitespace-pre-line">{post.caption}</p>
                  <p className="text-xs text-slate-500 mt-2 italic">وصف التصميم المرئي: {post.visualDescription}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
