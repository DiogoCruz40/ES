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
- Have 2 routes one for user "/" and other for kitchen(with authjwt) "/kitchen"
- installed react-router-dom and react-webcam


For testing purposes we will use a json server:
$ `npx json-server --watch test/test.db --port 8000`

### References:

https://www.youtube.com/watch?v=w8SQ8beafiQ&ab_channel=CodeKeen
https://www.youtube.com/watch?v=zCIpWFYDJ8s&list=PL9nWRykSBSFgQrO66TmO1vHFP6yuPF5G-&ab_channel=BeABetterDev
https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d
https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a
https://javascript.plainenglish.io/capture-images-via-webcam-using-react-9282bb87de5a