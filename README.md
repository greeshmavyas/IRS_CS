# Intelligent Routing System For Customer Support
Final Project: CMPE295A, CMPE295B


### Steps to run

#### 1.To run backend
Go to server folder
Open command line <br />
Execute command 'npm install' <br />
Execute command 'node index.js' This will start the backend server in http://:3001.

#### 2.To run kafka backend
Go to kafka-backend folder
Open command line <br />
Execute command 'npm install' <br />
Execute command 'npm start' This will start the backend server in http://:3001

#### 3.To run frontend
Go to client folder <br />
Open command line <br />
Execute command 'npm install' <br />
Execute command 'npm start' This will start the application in your default server in http://:3000

#### 4.To run NLP Model ipynb file
Do the required pip installations given in 1st ipynb block <br />
Execute (Shift+Enter) each block in ipynb after installations

#### 5.To run Flask 
pipenv shell <br />
$ env FLASK_APP=app.py flask run <br />
End point: http://127.0.0.1:5000/ <br />
Request body : {
    "case": "When can I get my delivery"
} (json) <br />
Response : Shipping (String) <br />

