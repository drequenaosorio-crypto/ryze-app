create extension if not exists pgcrypto;

create table pitches (
  id uuid default gen_random_uuid() primary key,
  video_url text not null,
  caption text,
  handle text,
  likes int default 0,
  created_at timestamp default now()
);

create table likes (
  id uuid default gen_random_uuid() primary key,
  pitch_id uuid references pitches(id),
  user_id text,
  created_at timestamp default now()
);

-- storage bucket pitches public
