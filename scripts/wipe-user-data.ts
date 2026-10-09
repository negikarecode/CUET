import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing from .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  console.log('--- Wiping User Database Data ---');

  // 1. Check Questions & Tests count to ensure we don't touch them
  const { count: questionsCount } = await supabase.from('questions').select('*', { count: 'exact', head: true });
  const { count: testsCount } = await supabase.from('tests').select('*', { count: 'exact', head: true });
  console.log(`[Safe Guard] Preserving questions: ${questionsCount ?? 0}, tests: ${testsCount ?? 0}`);

  // 2. Fetch all Auth users
  let allUsers: any[] = [];
  let page = 1;
  const perPage = 50;
  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage,
    });
    if (error) {
      console.error('Error listing auth users:', error);
      break;
    }
    if (!data.users || data.users.length === 0) {
      break;
    }
    allUsers.push(...data.users);
    if (data.users.length < perPage) break;
    page++;
  }

  console.log(`Found ${allUsers.length} user(s) in auth.users.`);

  // 3. Delete user related rows explicitly
  console.log('Cleaning up user relational tables...');
  
  const { error: smrErr } = await supabase.from('sunday_mentor_reports').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (smrErr) console.warn('Warning deleting sunday_mentor_reports:', smrErr.message);

  const { error: utErr } = await supabase.from('user_trophies').delete().neq('user_id', '00000000-0000-0000-0000-000000000000');
  if (utErr) console.warn('Warning deleting user_trophies:', utErr.message);

  const { error: uaErr } = await supabase.from('user_attempts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (uaErr) console.warn('Warning deleting user_attempts:', uaErr.message);

  const { error: profErr } = await supabase.from('profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (profErr) console.warn('Warning deleting profiles:', profErr.message);

  // 4. Delete auth.users
  console.log('Deleting auth users...');
  let deletedAuthUsersCount = 0;
  for (const user of allUsers) {
    const { error: delUserErr } = await supabase.auth.admin.deleteUser(user.id);
    if (delUserErr) {
      console.error(`Failed to delete user ${user.id} (${user.email}):`, delUserErr.message);
    } else {
      deletedAuthUsersCount++;
      console.log(`Deleted user ${user.id} (${user.email})`);
    }
  }

  // 5. Verification
  console.log('\n--- Verification ---');
  const { count: remainingProfiles } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
  const { count: remainingAttempts } = await supabase.from('user_attempts').select('*', { count: 'exact', head: true });
  const { count: remainingTrophies } = await supabase.from('user_trophies').select('*', { count: 'exact', head: true });
  const { count: remainingReports } = await supabase.from('sunday_mentor_reports').select('*', { count: 'exact', head: true });
  const { data: remainingAuth } = await supabase.auth.admin.listUsers({ page: 1, perPage: 10 });
  const { count: finalQuestions } = await supabase.from('questions').select('*', { count: 'exact', head: true });
  const { count: finalTests } = await supabase.from('tests').select('*', { count: 'exact', head: true });

  console.log(`Remaining auth.users: ${remainingAuth?.users?.length ?? 0}`);
  console.log(`Remaining profiles: ${remainingProfiles ?? 0}`);
  console.log(`Remaining user_attempts: ${remainingAttempts ?? 0}`);
  console.log(`Remaining user_trophies: ${remainingTrophies ?? 0}`);
  console.log(`Remaining sunday_mentor_reports: ${remainingReports ?? 0}`);
  console.log(`Questions intact: ${finalQuestions ?? 0}`);
  console.log(`Tests intact: ${finalTests ?? 0}`);
  console.log('\nAll user data successfully purged!');
}

main().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
