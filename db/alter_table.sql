insert into helo_users (name, hash)
values (${username}, ${hash})
returning user_id;
