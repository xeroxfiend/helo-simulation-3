select * from helo_users hu
join posts p on hu.user_id = p.user_id
order by p.post_id desc;

