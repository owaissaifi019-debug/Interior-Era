import { NextResponse } from 'next/server';
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = createClient();
    
    const { error } = await supabase.from('contacts').insert([
      {
        first_name: data.firstName || data.name || '',
        last_name: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        city: data.city || 'Homepage',
        project_type: data.projectType || 'N/A',
        budget: data.budget || 'N/A',
        message: data.message || ''
      }
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
  }
}
