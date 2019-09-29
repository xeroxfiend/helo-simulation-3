insert into posts (user_id, title, image, content)
values (${user_id}, ${title}, ${image}, ${content})
returning post_id;