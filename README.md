# Confessional

## Setup
- clone this repository

### Set up PostgreSQL
- make sure PostgreSQL and any dependencies are installed.
- make sure a PostgreSQL server is running on localhost.

### Create the Database:

```
$ psql -d postgres
postgres=# CREATE ROLE <name> WITH SUPERUSER;
postgres=# CREATE DATABASE confessional;
postgres=# \q
$ psql -d confessional
confessional=# ALTER USER <name> WITH password '<password>';
confessional=# ALTER ROLE <name> WITH LOGIN;
confessional=# \q
$ psql -d confessional -a -f sql/create.sql
```
If the above doesn't work try http://www.cyberciti.biz/faq/howto-add-postgresql-user-account/ or the PostgreSQL documentation for help.

### Create a configuration file for the database
In a new folder called `config` create a file called `db.txt` with the following content:

```
<your username>
<your password>
confessional
localhost
5432
```
### Install the node components

```bash
$ npm install pg
$ npm install
```

## To run:
`npm start`
