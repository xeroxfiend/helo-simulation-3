select * from helo_users hu
join posts p on hu.user_id = p.user_id
where hu.user_id != $1 and p.content like $2

