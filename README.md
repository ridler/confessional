# Confessional

## Dependencies
- Node.js, NPM, and Express
- PostgreSQL
- The first method on this page is my favorite way to install node and npm: https://gist.github.com/isaacs/579814
- The standard apt-get install on Ubuntu 12.04 for Postgres is what I used.

### Set up PostgreSQL

- make sure a PostgreSQL server is running on localhost:5432.

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
Update the `config/db.txt` file with your username and password that you created above.

```
<your username>
<your password>
confessional
localhost
5432
```

### Install the node components

```bash
$ npm install
```

## To run:
`npm start`
