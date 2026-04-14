import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    const { data: products, error } = await supabase.from('products').select('*').order('created_at', { ascending: true });
    if (error) {
        console.error(error);
        return;
    }

    if (products.length >= 2) {
        console.log("Updating first product to price 2...");
        await supabase.from('products').update({ price: 2 }).eq('id', products[0].id);

        console.log("Updating second product to price 1...");
        await supabase.from('products').update({ price: 1 }).eq('id', products[1].id);

        if (products.length >= 3) {
            console.log("Updating third product to price 1...");
            await supabase.from('products').update({ price: 1 }).eq('id', products[2].id);
        }
    }

    const { data: newProducts } = await supabase.from('products').select('*');
    console.log('Updated Products:', newProducts.map(p => ({ name: p.name, price: p.price })));
}
run();
