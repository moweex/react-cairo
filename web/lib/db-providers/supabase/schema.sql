create table events (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table events enable row level security;

create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique,
  verified boolean default false,
  "ticketNumber" bigserial,
  name text,
  username text unique,
  company text,
  title text,
  experience integer,
  github text,
  linkedin text,
  twitter text,
  "avatarUrl" text,
  event uuid references events(id) not null,
  constraint unique_email_event unique (email, event),
  hash text,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table users enable row level security;
create index users_email_idx on users (email);