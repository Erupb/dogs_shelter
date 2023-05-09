\c course_work;

create table if not exists dogs
(
    id          bigint generated by default as identity (maxvalue 2147483647)
        primary key,
    breed       varchar(255),
    img         varchar(255),
    name        varchar(255),
    age         integer,
    description varchar(255),
    ordered     boolean default false,
    gender      varchar(7)
);

create table if not exists users
(
    id           bigint generated by default as identity (maxvalue 2147483647)
        primary key,
    password     varchar(255),
    role         varchar(255),
    username     varchar(255),
    phone_number varchar(12),
    activity     boolean default true,
    initials     varchar(45)
);

create table if not exists orders
(
    user_id integer not null,
    dog_id  integer not null,
    id      bigserial not null primary key,
    FOREIGN KEY(user_id) REFERENCES public.users(id) on delete cascade,
    FOREIGN KEY(dog_id) REFERENCES public.dogs(id) on delete cascade
);

alter table users
    owner to postgres;

alter table orders
    owner to postgres;

alter table dogs
    owner to postgres;

/*create table dogs
(
    id          bigint generated by default as identity (maxvalue 2147483647)
        primary key,
    breed       varchar(255),
    img         varchar(255),
    name        varchar(255),
    age         integer,
    description varchar(255),
    ordered     boolean default false,
    gender      varchar(7)
);

create table users
(
    id           bigint generated by default as identity (maxvalue 2147483647)
        primary key,
    password     varchar(255),
    role         varchar(255),
    username     varchar(255),
    phone_number varchar(12),
    activity     boolean default true,
    initials     varchar(45)
);

create table orders
(
    user_id integer not null
        constraint user_id
            references public.users
            on update cascade on delete cascade,
    dog_id  integer not null
        constraint dog_id
            references public.dogs
            on update cascade on delete cascade,
    id      bigserial
        constraint orders_pk
            primary key
);

alter table users
    owner to postgres;

alter table orders
    owner to postgres;

alter table dogs
    owner to postgres;*/