import { supabase } from './src/config/db.js';

async function testConnection() {
    try {
        const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
        if (error) {
            console.error('Connection failed or table missing:', error.message);
        } else {
            console.log('Profiles table exists. Row count:', data);
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
}

testConnection();
