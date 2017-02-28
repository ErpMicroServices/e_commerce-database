create table if not exists user_login (
  id uuid default uuid_generate_v4(),
  user_id text not null  unique constraint user_id check (user_id <> ''),
  password text constraint password_not_empty check (password <> ''),
  party_id uuid,
  web_address_id uuid,
  constraint user_login_id_pk primary key(id)
);

create table if not exists login_account_history(
  id uuid default uuid_generate_v4(),
  user_login uuid not null references user_login(id),
  user_id text not null  unique constraint user_id check (user_id <> ''),
  password text constraint password_not_empty check (password <> ''),
  from_date timestamp not null,
  thru_date timestamp,
  constraint login_account_history_id_pk primary key(id)
);

create table if not exists  web_preference_type(
  id uuid default uuid_generate_v4(),
  description text not null unique constraint description_not_empty check ( description <> ''),
  constraint web_preference_type_id_pk primary key(id)
);

create table if not exists web_user_preference(
  id uuid default uuid_generate_v4(),
  web_preference_type_id uuid not null references web_preference_type(id),
  constraint web_user_preference_id_pk primary key(id)
);
