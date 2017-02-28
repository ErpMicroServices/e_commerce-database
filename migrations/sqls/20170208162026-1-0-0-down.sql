alter table feature_object drop constraint if exists feature_object_web_object_id_fkey;

alter table object_purpose drop constraint if exists object_purpose_purpose_type_id_fkey;
alter table object_purpose drop constraint if exists object_purpose_web_object_id_fkey;

alter table object_usage drop constraint if exists object_usage_web_object_id;
alter table object_usage drop constraint if exists object_usage_web_content_id;

alter table party_object drop constraint if exists party_object_web_object_id_fkey;

alter table product_object drop constraint if exists product_object_web_object_id_fkey;

alter table subscription drop constraint if exists subscription_subscription_type_id_fk;

alter table subscription_fulfillment_piece drop constraint if exists subscription_fulfillment_piece_subscription_id_fkey;
alter table subscription_fulfillment_piece drop constraint if exists subscription_fulfillment_piece_subscription_activity_id_fkey;

alter table web_content_association drop constraint if exists web_content_association_function_type_fkey;
alter table web_content_association drop constraint if exists web_content_association_associate_for_fkey;
alter table web_content_association drop constraint if exists web_content_association_associate_of_fkey;

alter table web_content_role drop constraint if exists web_content_role_web_content_id_fkey;
alter table web_content_role drop constraint if exists web_content_role_web_content_type_id_fkey;

alter table web_object drop constraint if exists web_object_web_object_type_id_fkey;

alter table web_user_preference drop constraint if exists web_user_preference_web_preference_type_id_fkey;

drop table if exists electronic_text_object;
drop table if exists feature_object;
drop table if exists function_type;
drop table if exists image_object;
drop table if exists login_account_history;
drop table if exists object_purpose;
drop table if exists object_usage;
drop table if exists other_object;
drop table if exists party_object;
drop table if exists product_object;
drop table if exists purpose_type;
drop table if exists subscription;
drop table if exists subscription_activity;
drop table if exists subscription_fulfillment_piece;
drop table if exists subscription_type;
drop table if exists user_login;
drop table if exists web_content;
drop table if exists web_content_association;
drop table if exists web_content_role;
drop table if exists web_content_status_type;
drop table if exists web_content_type;
drop table if exists web_object;
drop table if exists web_object_type;
drop table if exists web_preference_type;
drop table if exists web_user_preference;
