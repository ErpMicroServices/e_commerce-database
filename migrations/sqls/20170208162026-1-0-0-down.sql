alter table web_content_association drop constraint if exists web_content_association_function_type_fkey;
alter table web_content_association drop constraint if exists web_content_association_associate_for_fkey;
alter table web_content_association drop constraint if exists web_content_association_associate_of_fkey;

alter table web_content_role drop constraint if exists web_content_role_web_content_id_fkey;
alter table web_content_role drop constraint if exists web_content_role_web_content_type_id_fkey;

alter table web_user_preference drop constraint if exists web_user_preference_web_preference_type_id_fkey;

drop table if exists function_type;
drop table if exists login_account_history;
drop table if exists user_login;
drop table if exists web_content;
drop table if exists web_content_association;
drop table if exists web_content_status_type;
drop table if exists web_preference_type;
drop table if exists web_user_preference;
