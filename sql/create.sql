create table sessions (
	ID serial primary key,
	created_at timestamp not null,
	banned boolean
);

create table confessions (
	ID serial primary key,
	created_at timestamp not null,
	sessionID int,
	body text,
	likes int,
	dislikes int,
	FOREIGN KEY (sessionID) REFERENCES sessions(ID)
);

create table comments (
	ID serial primary key,
	created_at timestamp not null,
	confessionID int,
	sessionID int,
	body text,
	likes int,
	dislikes int,
	FOREIGN KEY (confessionID) REFERENCES confessions(ID),
	FOREIGN KEY (sessionID) REFERENCES sessions(ID)
);