select * from helo_users hu
join posts p on hu.user_id = p.user_id
where p.content like %$1%;
