
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  is_premium boolean default false,
  credits int default 3,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(full_name) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for chat history
create table chat_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  message text not null,
  role text not null check (role in ('user', 'assistant')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for chat history
alter table chat_history enable row level security;

create policy "Users can view their own chat history." on chat_history
  for select using (auth.uid() = user_id);

create policy "Users can insert their own chat history." on chat_history
  for insert with check (auth.uid() = user_id);

-- Trigger to create profile on signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
