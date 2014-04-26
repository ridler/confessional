create table sessions (
	ID serial primary key,
	created_at timestamp not null,
	banned boolean
);

create table confessions (
	ID serial primary key,
	created_at timestamp default current_timestamp,
	sessionID int,
	body text,
	likes int default 0,
	dislikes int default 0,
	FOREIGN KEY (sessionID) REFERENCES sessions(ID)
);

create table comments (
	ID serial primary key,
	created_at timestamp not null,
	confessionID int,
	sessionID int,
	body text,
	likes int default 0,
	dislikes int default 0,
	FOREIGN KEY (confessionID) REFERENCES confessions(ID),
	FOREIGN KEY (sessionID) REFERENCES sessions(ID)
);