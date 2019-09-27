create table helo_users (
    user_id serial primary key,
    name varchar,
    pic text,
    hash text
);

create table posts (
    post_id serial primary key,
    user_id int references helo_users(user_id),
    title varchar,
    image text,
    content text
);

insert into helo_users (name, pic, hash)
values ('brian', 'https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg', 'asdkfj'),
('mary', 'https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg', 'asdfj;lasdfj');

insert into posts (user_id, title, image, content)
values (1, 'brian post', 'https://image.shutterstock.com/image-photo/large-beautiful-drops-transparent-rain-260nw-668593321.jpg', 'This is brian post'),
(2, 'mary post', 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'this is mary post');

select * from helo_users;

select * from posts;

-- sample join

select * from helo_users hu
join posts p on hu.user_id = p.user_id;


