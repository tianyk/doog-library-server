#如果复制到mysql中执行时 加上
#DELIMITER;;
drop database `doog_library`;
create database `doog_library`;
use `doog_library`;

drop table if exists `sys_user`;
drop table if exists `sys_book`;

## -- 用户表
create table `sys_user`(
`user_id` bigint not null auto_increment,
`username` varchar(100),
constraint `pk_sys_user` primary key(`user_id`)
) charset=utf8 ENGINE=InnoDB;
alter table `sys_user` auto_increment=100000;

## -- 书籍表
create table `sys_book`(
`book_id` bigint not null auto_increment,
`title` varchar(100) not null,
`isbn10` char(10),
`isbn13` char(13),
constraint `pk_sys_book` primary key(`book_id`)
) charset=utf8 ENGINE=InnoDB;
alter table `sys_book` auto_increment=100000;

## -- 藏书表
drop table if exists `sys_collection`;
create table `sys_collection`(
`book_id` bigint not null,
`user_id` bigint not null,
`state` varchar(10) not null default 'await',
constraint `pk_sys_collection` primary key(`book_id`, `user_id`),
constraint `fk_sys_collection_sys_user_user_id` foreign key (`user_id`) references `sys_user` (`user_id`),
constraint `fk_sys_collection_sys_book_book_id` foreign key (`book_id`) references `sys_book` (`book_id`)
) charset=utf8 ENGINE=InnoDB;
alter table `sys_collection` auto_increment=100000;

## -- 借阅表
drop table if exists `sys_brrow_history`;
create table `sys_brrow_history`(
`brrow_history_id` bigint not null auto_increment,
`book_id` bigint not null,
`owner_user_id` bigint not null,
`user_id` bigint not null,
`loan_at` bigint not null,
`return_at` bigint not null,
`state` varchar(10) not null default 'reading',
constraint `pk_sys_brrow_history` primary key(`brrow_history_id`),
constraint `fk_sys_brrow_history_sys_user_user_id` foreign key (`user_id`) references `sys_user` (`user_id`),
constraint `fk_sys_brrow_history_sys_user_owner_user_id` foreign key (`owner_user_id`) references `sys_user` (`user_id`),
constraint `fk_sys_brrow_history_sys_book_book_id` foreign key (`book_id`) references `sys_book` (`book_id`)
) charset=utf8 ENGINE=InnoDB;
alter table `sys_brrow_history` auto_increment=100000;

## -- `brrow_history_id` 借阅历史ID
## -- `book_id` 图书ID
## -- `owner_user_id` 图书拥有者ID
## -- `user_id` 借书人
## -- `loan_at` 借出时间
## -- `return_at` 归还时间
## -- `state` 状态