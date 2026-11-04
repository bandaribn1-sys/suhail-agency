import { NextResponse } from 'next/server';
import { generateMarketingCampaign } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await generateMarketingCampaign(body);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'حدث خطأ أثناء توليد المحتوى' }, { status: 500 });
  }
}


