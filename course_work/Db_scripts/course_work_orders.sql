create table orders
(
    user_id integer not null
        constraint user_id
            references users
            on update cascade on delete cascade,
    dog_id  integer not null
        constraint dog_id
            references dogs
            on update cascade on delete cascade,
    id      bigserial
        constraint orders_pk
            primary key
);

alter table orders
    owner to postgres;

INSERT INTO public.orders (user_id, dog_id, id) VALUES (68, 65, 41);
