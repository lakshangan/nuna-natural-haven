import { supabase } from './src/config/db.js';

async function checkProfiles() {
    try {
        const { data, error } = await supabase.from('profiles').select('*');
        if (error) {
            console.error('Error fetching profiles:', error.message);
        } else {
            console.log('Profiles currently in DB:', data.length);
            data.forEach(p => console.log(`- ${p.full_name || 'No Name'} (${p.email}) Role: ${p.role}`));
        }
    } catch (err) {
        console.error('Exception:', err.message);
    }
}

checkProfiles();
