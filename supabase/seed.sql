-- in supabase/seed.sql
insert into auth.users (id)
values 
  ('0d5a27ca-6263-418a-9732-5a33b19ecaf9');

-- バケットとポリシーを作成
insert into storage.buckets (id, name)
values ('photos', 'photos');

create policy "Photos are publicly accessible." on storage.objects
  for select using (bucket_id = 'photos');

create policy "Anyone can upload an photo." on storage.objects
  for insert with check (bucket_id = 'photos');

create policy "Anyone can update an photo." on storage.objects
  for update with check (bucket_id = 'photos');

-- リアルタイム通信を許可
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime
  add table rooms;
alter publication supabase_realtime
  add table game_results;
alter publication supabase_realtime
  add table standard_game_user_progresses;

