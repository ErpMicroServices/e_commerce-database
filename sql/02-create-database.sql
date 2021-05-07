create table if not exists user_login
(
    id             uuid default uuid_generate_v4(),
    user_id        text not null unique
        constraint user_id check (user_id <> ''),
    password       text not null
        constraint password_not_empty check (password <> ''),
    party_id       uuid,
    web_address_id uuid,
    constraint user_login_id_pk primary key (id)
);

create table if not exists login_account_history
(
    id            uuid default uuid_generate_v4(),
    user_login_id uuid                     not null references user_login (id),
    user_id       text                     not null
        constraint user_id check (user_id <> ''),
    password      text                     not null
        constraint password_not_empty check (password <> ''),
    active_from   timestamp with time zone not null,
    active_thru   timestamp with time zone,
    constraint login_account_history_id_pk primary key (id)
);

create table if not exists web_address
(
    id                   uuid default uuid_generate_v4(),
    end_point            text not null
        constraint end_point_not_empty check (end_point <> ''),
    contact_mechanism_id uuid not null,
    constraint web_address_id_pk primary key (id)
);

create table if not exists web_preference_type
(
    id          uuid default uuid_generate_v4(),
    description text not null unique
        constraint description_not_empty check ( description <> ''),
    parent_id   UUID REFERENCES web_preference_type (id),
    constraint web_preference_type_id_pk primary key (id)
);

create table if not exists web_user_preference
(
    id            uuid default uuid_generate_v4(),
    value         text,
    user_login_id uuid not null references user_login (id),
    type_id       uuid not null references web_preference_type (id),
    constraint web_user_preference_id_pk primary key (id)
);

create table if not exists web_content_status_type
(
    id          uuid default uuid_generate_v4(),
    description text not null unique
        constraint web_content_status_type_description_not_empty check ( description <> ''),
    parent_id   UUID REFERENCES web_content_status_type (id),
    constraint web_content_status_type_id_pk primary key (id)
);

create table if not exists web_content
(
    id             uuid default uuid_generate_v4(),
    description    text not null
        constraint content_description_not_empty check ( description <> ''),
    file_location  text,
    status_id      uuid not null references web_content_status_type (id),
    web_address_id uuid not null references web_address (id),
    constraint web_content_id_pk primary key (id)
);

create table if not exists function_type
(
    id          uuid default uuid_generate_v4(),
    description text not null unique
        constraint content_description_not_empty check ( description <> ''),
    parent_id   UUID REFERENCES function_type (id),
    constraint function_type_id_pk primary key (id)
);

create table if not exists web_content_association
(
    id                           uuid default uuid_generate_v4(),
    upper_left_coordinate        point,
    function_type_id             uuid references function_type (id),
    associate_for_web_content_id uuid references web_content (id),
    associate_of_web_content_id  uuid references web_content (id),
    constraint web_content_association_id_pk primary key (id)
);

create table if not exists web_content_type
(
    id          uuid default uuid_generate_v4(),
    description text not null unique,
    parent_id   UUID REFERENCES web_content_type (id),
    constraint web_content_type_id_pk primary key (id)
);

create table if not exists web_content_role_type
(
    id          uuid default uuid_generate_v4(),
    description text not null unique,
    parent_id   UUID REFERENCES web_content_role_type (id),
    constraint web_content_role_type_pk primary key (id)
);

create table if not exists web_content_role
(
    id                    uuid default uuid_generate_v4(),
    active_from           timestamp with time zone not null,
    active_thru           timestamp with time zone,
    web_content_id        uuid references web_content (id),
    web_content_role_type uuid references web_content_role_type (id),
    party_id              uuid                     not null,
    constraint web_content_role_id primary key (id)
);

create table if not exists web_object_type
(
    id          uuid default uuid_generate_v4(),
    description text not null unique
        constraint web_object_type_description_not_empty check (description <> ''),
    parent_id   UUID REFERENCES web_object_type (id),
    constraint web_object_type_pk primary key (id)
);

create table if not exists web_object
(
    id            uuid default uuid_generate_v4(),
    name          text not null unique
        constraint web_object_name_not_empty check (name <> ''),
    description   text not null
        constraint web_object_description_not_empty check (name <> ''),
    file_location text,
    type_id       uuid not null references web_object_type (id),
    constraint web_object_id_pk primary key (id)
);

create table if not exists feature_object
(
    id                 uuid default uuid_generate_v4(),
    product_feature_id uuid not null,
    web_object_id      uuid not null references web_object (id),
    constraint feature_object_pk primary key (id)
);

create table if not exists object_usage
(
    id             uuid default uuid_generate_v4(),
    web_object_id  uuid references web_object (id),
    web_content_id uuid references web_content (id),
    from_date      date not null,
    thru_date      date,
    constraint object_usage_pk primary key (id)
);

create table if not exists purpose_type
(
    id          uuid default uuid_generate_v4(),
    description text not null unique
        constraint purpose_type_description_not_empty check (description <> ''),
    parent_id   UUID REFERENCES purpose_type (id),
    constraint purpose_type_pk primary key (id)
);

create table if not exists object_purpose
(
    id            uuid default uuid_generate_v4(),
    web_object_id uuid not null references web_object (id),
    types_id      uuid not null references purpose_type (id),
    constraint object_purpose_pk primary key (id)
);

create table if not exists product_object
(
    id            uuid default uuid_generate_v4(),
    product_id    uuid not null,
    web_object_id uuid not null references web_object (id),
    constraint product_object_pk primary key (id)
);

create table if not exists party_object
(
    id            uuid default uuid_generate_v4(),
    party_id      uuid not null,
    web_object_id uuid not null references web_object (id),
    constraint party_object_pk primary key (id)
);


create table if not exists subscription_type
(
    id          uuid default uuid_generate_v4(),
    description text not null unique
        constraint subscription_type_description_not_empty check (description <> ''),
    parent_id   UUID REFERENCES subscription_type (id),
    constraint subscription_type_pk primary key (id)
);

create table if not exists subscription
(
    id                      uuid default uuid_generate_v4(),
    start_date              timestamp with time zone not null,
    end_date                timestamp with time zone,
    subscription_type_id    uuid                     not null references subscription_type (id),
    product_id              uuid,
    product_category_id     uuid,
    need_type               uuid,
    party_role_id           uuid,
    contact_mechanism_id    uuid,
    commmunication_event_id uuid,
    party_need              uuid,
    constraint subscription_pk primary key (id)
);

create table if not exists subscription_activity
(
    id        uuid default uuid_generate_v4(),
    date_sent timestamp with time zone not null,
    comment   text,
    constraint subscription_activity_pk primary key (id)
);

create table if not exists subscription_fulfillment_piece
(
    id                       uuid default uuid_generate_v4(),
    subscription_id          uuid not null references subscription (id),
    subscription_activity_id uuid not null references subscription_activity (id),
    constraint subscription_fulfillment_piece_pk primary key (id)
);

create table server_hit_status_type
(
    id          uuid default uuid_generate_v4(),
    description text not null unique
        constraint server_hit_status_type_description check (description <> ''),
    parent_id   UUID REFERENCES server_hit_status_type (id),
    constraint server_hit_status_type_pk primary key (id)
);

create table visit
(
    id             uuid default uuid_generate_v4(),
    from_date      timestamp with time zone not null,
    thru_date      timestamp with time zone,
    cookie         text                     not null unique,
    web_address_id uuid,
    visitor_id     uuid,
    constraint visit_pk primary key (id)
);

create table if not exists platform_type
(
    id        uuid default uuid_generate_v4(),
    name      text not null
        constraint platform_type_name check (name <> ''),
    version   text not null
        constraint platform_type_version check (version <> ''),
    parent_id UUID REFERENCES platform_type (id),
    constraint platform_type_pk primary key (id)
);

create table if not exists browser_type
(
    id      uuid default uuid_generate_v4(),
    name    text not null
        constraint browser_type_name check (name <> ''),
    version text not null
        constraint browser_type_version check (version <> ''),
    constraint browser_type_pk primary key (id)
);

create table if not exists protocol_type
(
    id   uuid default uuid_generate_v4(),
    name text not null unique
        constraint browser_type_name check (name <> ''),
    constraint protocol_type_pk primary key (id)
);

create table user_agent_method_type
(
    id          uuid default uuid_generate_v4(),
    description text not null unique
        constraint user_agent_method_type_description check (description <> ''),
    parent_id   UUID REFERENCES user_agent_method_type (id),
    constraint user_agent_method_type_pk primary key (id)
);

create table user_agent_type
(
    id          uuid default uuid_generate_v4(),
    description text not null unique
        constraint user_agent_type_description check (description <> ''),
    parent_id   UUID REFERENCES user_agent_type (id),
    constraint user_agent_type_pk primary key (id)
);

create table if not exists user_agent
(
    id                        uuid default uuid_generate_v4(),
    platform_type_id          uuid references platform_type (id),
    protocol_type_id          uuid references protocol_type (id),
    user_agent_method_type_id uuid references user_agent_method_type (id),
    user_agent_type_id        uuid references user_agent_type (id),
    constraint user_agent_pk primary key (id)
);

create table if not exists server_hit
(
    id                        uuid default uuid_generate_v4(),
    user_login_id             uuid references user_login (id),
    server_hit_status_type_id uuid not null references server_hit_status_type (id),
    visit_id                  uuid not null references visit (id),
    ip_adddress_id            uuid not null,
    user_agent_id             uuid not null references user_agent (id),
    web_content_id            uuid not null references web_content (id),
    constraint server_hit_pk primary key (id)
);
