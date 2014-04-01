# Confessional

## Setup
- clone this repository

### Set up PostgreSQL
- make sure PostgreSQL is installed
- make sure you set up yourself as a valid user with correct permissions to create tables
  - see the PostgreSQL documentation for help.

### Create the Database:

``` bash
$ psql -c CREATE DATABASE confessional
$ psql -d confessional -a -f sql/create.sql
```
### Create a configuration file for the database
In a new folder called `config` create a file called `db.txt` with the following content:

```
<your username>
<your password>
confessional
localhost
```
### Install the node components

```bash
$ npm install pg
$ npm install
```

## To run:
`npm start`
