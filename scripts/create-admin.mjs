import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_EMAIL || process.argv[2] || 'admin@bytetechbd.com';
const adminPassword = process.env.ADMIN_PASSWORD || process.argv[3] || 'ByteTechAdmin2026!';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.');
  console.log('Please configure .env.local with your Supabase credentials first.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function setupAdmin() {
  console.log(`\n🚀 Initializing Byte Tech BD Admin User setup...`);
  console.log(`Target Email: ${adminEmail}`);

  // Check if user already exists
  const { data: users, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('❌ Failed to list users:', listError.message);
    process.exit(1);
  }

  const existingUser = users.users.find((u) => u.email?.toLowerCase() === adminEmail.toLowerCase());

  let userId;

  if (existingUser) {
    console.log(`ℹ️ User ${adminEmail} already exists. Elevating role to 'admin'...`);
    userId = existingUser.id;
  } else {
    console.log(`Creating new user account for ${adminEmail}...`);
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        full_name: 'Byte Tech BD Administrator',
        role: 'admin',
      },
    });

    if (createError) {
      console.error('❌ Failed to create user:', createError.message);
      process.exit(1);
    }

    userId = newUser.user.id;
    console.log(`✅ Auth user created successfully with ID: ${userId}`);
  }

  // Upsert profile as role = admin
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      email: adminEmail,
      full_name: 'Byte Tech BD Administrator',
      role: 'admin',
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });

  if (profileError) {
    console.error('❌ Failed to update profile role:', profileError.message);
    process.exit(1);
  }

  console.log(`\n🎉 SUCCESS! Admin account is ready.`);
  console.log(`----------------------------------------`);
  console.log(`Login URL: http://localhost:3000/login`);
  console.log(`Email:     ${adminEmail}`);
  console.log(`Password:  ${adminPassword}`);
  console.log(`----------------------------------------\n`);
}

setupAdmin();
