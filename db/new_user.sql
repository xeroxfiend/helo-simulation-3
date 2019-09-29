insert into helo_users (name, pic, hash)
values (${username}, ${pic}, ${hash})
returning *;