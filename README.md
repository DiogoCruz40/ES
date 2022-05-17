# ES
This is the ES project

### Run Server:

1. About react:
 
$ `cd frontend && npm install && npm run build`

2. Run server django:

$ `python3 -m venv env`

$ `source .env/bin/activate`

$ `cd .. && python3 manage.py runserver`

- Then access localhost:8000 for react app
- Access localhost:8000/api for django app

### For frontend testing:

$ `cd frontend && npm install && npm run start`

- Access localhost:3000 for react app live reload

### Implement AWS:
- Dynamodb -> ids das caras 
- RDS postgres -> utilizadores
- lambda functions -> function handler de objetos e serviços
- step functions -> control flow mediante a execução

### Implement django:

### Implement React:

- Fetch list of items -> for testing use simulated objects
- Have 2 routes one for user and other for kitchen(with auth)

For testing purposes we will use a json server:
$ `npx json-server --watch test/test.db --port 8000`

### References:

https://www.youtube.com/watch?v=w8SQ8beafiQ&ab_channel=CodeKeen