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
  active_from timestamp not null,
  active_thru timestamp,
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

create table if not exists web_content_status_type(
  id uuid default uuid_generate_v4(),
  description text not null constraint  web_content_status_type_description_not_empty check( description <> ''),
  constraint web_content_status_type_id_pk primary key(id)
);

create table if not exists web_content(
  id uuid default uuid_generate_v4(),
  content_description text not null constraint  content_description_not_empty check( content_description <> ''),
  file_location text,
  web_content_status_type_id uuid not null,
  constraint web_content_id_pk primary key(id)
  );

create table if not exists function_type(
  id uuid default uuid_generate_v4(),
  content_description text not null constraint  content_description_not_empty check( content_description <> ''),
  constraint function_type_id_pk primary key(id)
);

create table if not exists web_content_association(
  id uuid default uuid_generate_v4(),
  upper_left_coordinate point,
  function_type uuid references function_type(id),
  associate_for uuid references web_content(id),
  associate_of uuid references web_content(id),
  constraint web_content_association_id_pk primary key(id)
);

create table if not exists web_content_type(
  id uuid default uuid_generate_v4(),
  content text not null unique,
  constraint web_content_type_id_pk primary key(id)
);

create table if not exists web_content_role(
  id uuid default uuid_generate_v4(),
  active_from timestamp not null,
  active_thru timestamp,
  web_content_type_id uuid references web_content_type(id),
  web_content_id uuid references web_content(id),
  party_id uuid,
  constraint web_content_role_id primary key(id)
);

create table if not exists web_object_type (
  id uuid default uuid_generate_v4(),
  description text not null unique constraint web_object_type_description_not_empty check(description <> ''),
  constraint web_object_type_pk primary key(id)
);

create table if not exists web_object (
  id uuid default uuid_generate_v4(),
  name text not null unique constraint web_object_name_not_empty check(name <> ''),
  description text not null constraint web_object_description_not_empty check(name <> ''),
  file_location text,
  web_object_type_id uuid not null references web_object_type(id),
  constraint web_object_id_pk primary key(id)
);

create table if not exists electronic_text_object(
  electronic_text text not null constraint electronic_text_object_electronic_text_not_empty check(electronic_text <> '')
) inherits (web_object);

create table if not exists image_object(
  image_location text not null constraint image_object_image_location_not_empty check(image_location <> '')
) inherits (web_object);

create table if not exists other_object(
  object_content text,
  object_location text
) inherits (web_object);

create table if not exists feature_object(
  id uuid default uuid_generate_v4(),
  product_feature_id uuid not null,
  web_object_id uuid not null references web_object(id),
  constraint feature_object_pk primary key(id)
);

create table if not exists object_usage(
  id uuid default uuid_generate_v4(),
  web_object_id uuid references web_object(id),
  web_content_id uuid references web_content(id),
  from_date timestamp not null,
  thru_date timestamp,
  constraint object_usage_pk primary key(id)
);

create table if not exists purpose_type (
  id uuid default uuid_generate_v4(),
  description text not null unique constraint purpose_type_description_not_empty check(description <> ''),
  constraint purpose_type_pk primary key(id)
);

create table if not exists object_purpose(
  id uuid default uuid_generate_v4(),
  web_object_id uuid not null references web_object(id),
  purpose_type_id uuid not null references purpose_type(id),
  constraint object_purpose_pk primary key(id)
);

create table if not exists product_object(
  id uuid default uuid_generate_v4(),
  product_id uuid not null,
  web_object_id uuid not null references web_object(id),
  constraint product_object_pk primary key(id)
);

create table if not exists party_object(
  id uuid default uuid_generate_v4(),
  party_id uuid not null,
  web_object_id uuid not null references web_object(id),
  constraint party_object_pk primary key(id)
);

create table if not exists subscription_type(
  id uuid default uuid_generate_v4(),
  description text not null unique constraint subscription_type_description_not_empty check(description <> ''),
  constraint subscription_type_pk primary key(id)
);

create table if not exists subscription(
  id uuid default uuid_generate_v4(),
  start_date timestamp not null,
  end_date timestamp,
  subscription_type_id uuid not null references subscription_type(id),
  product_id uuid,
  product_category_id uuid,
  need_type uuid,
  party_role_id uuid,
  contact_mechanism_id uuid,
  commmunication_event_id uuid,
  party_need uuid,
  constraint subscription_pk primary key(id)
);

create table if not exists subscription_activity(
  id uuid default uuid_generate_v4(),
  date_sent timestamp not null,
  comment text,
  constraint subscription_activity_pk primary key(id)
);

create table if not exists subscription_fulfillment_piece(
  id uuid default uuid_generate_v4(),
  subscription_id uuid not null references subscription(id),
  subscription_activity_id uuid not null references subscription_activity(id),
  constraint subscription_fulfillment_piece_pk primary key(id)
);
