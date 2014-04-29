create table confessions (
	ID serial primary key,
	created_at timestamp default current_timestamp,
	sessionID int,
	body text,
	likes int default 0,
	dislikes int default 0
);

create table comments (
	ID serial primary key,
	created_at timestamp default current_timestamp,
	confessionID int,
	sessionID int,
	body text,
	likes int default 0,
	dislikes int default 0,
	FOREIGN KEY (confessionID) REFERENCES confessions(ID)
);