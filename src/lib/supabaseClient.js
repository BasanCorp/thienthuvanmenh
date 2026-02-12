
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    const msg = 'ERROR: Missing Supabase Config. Please check Vercel Environment Variables.';
    console.error(msg);
    // Render error directly to body to ensure it's seen
    setTimeout(() => {
        if (typeof document !== 'undefined') {
            document.body.innerHTML = `
                <div style="background-color: #000; color: #ff5555; padding: 40px; font-family: sans-serif; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                    <h1 style="font-size: 24px; margin-bottom: 20px;">Configuration Error</h1>
                    <p style="font-size: 16px;">${msg}</p>
                    <div style="background: #222; padding: 20px; border-radius: 8px; margin-top: 20px; text-align: left;">
                        <p style="margin: 5px 0;">URL: <span style="color: ${supabaseUrl ? '#55ff55' : '#ff5555'}">${supabaseUrl ? 'Present' : 'MISSING'}</span></p>
                        <p style="margin: 5px 0;">KEY: <span style="color: ${supabaseAnonKey ? '#55ff55' : '#ff5555'}">${supabaseAnonKey ? 'Present' : 'MISSING'}</span></p>
                    </div>
                </div>
            `;
        }
    }, 100);
    throw new Error(msg);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
