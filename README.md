# Todo list with React - Python

## Todo list uses

This is a proyect created to practice React, using my own API created with Python (Django). in this branch 'render_deploy',
you will find the configuration to deploy the backend in [Render](https://render.com/) a PaaS to deploy django apps, and deploy the app to netlify with react.

## Live demo

Check it out, it's hosted in a free server so, it will problably be slow, don't worry if it takes too much time: [FullStack React Django App](https://rvjonh-todo-app.netlify.app/)

**Link:**

You can deploy it in your on computer (check development)

## Technologies

* Javascript
  * React
  * React Router
  * Axios
  * Context API
  * Bootstrap
  * Sass

* Python
  * Django
  * Rest_framework
  * corsheaders

* SQL
  * Sqlite

## Development

### Requirements

To have the full app in your computer working, you'll need to have these technologies :)

* Python
* Node js
* An text editor, like [Visual Studio code](https://code.visualstudio.com/)

if you would like to want, you can learn more about those technologies by yourself...

## Put the Backend app to work

Open another CMD or Terminal an go to the folder **FullStack-ToDo-App**/**backend**

on Windows CMD is 'cd' the command:

```cmd
  cd backend
```

Run the next commads:

(creates a environment to install required packages)(e.g. django)

```cmd
  python -m venv venv
```

`**REALLY IMPORTANT**` ACTIVATE THE ENVIRONMENT TO WORK WITH PYTHON AND PACKAGES

on Windows:

```cmd
  venv\Scripts\activate.bat
```

**Further information** [ENVIRONMENTS](https://docs.python.org/3/tutorial/venv.html)!!

(installs a list of packages need for development)

```cmd
  (venv): python -r install requirements.txt
```

(controls models to store data in a data base, this case [sqlite](https://docs.djangoproject.com/en/4.1/ref/databases/))

(in case of changing the models, you should run this command, to control the version of the models.)

```cmd
  (venv): python manage.py makemigrations
```

(apply last models to the data base, update the data base schema)

```cmd
  (venv): python manage.py migrate
```

(CREATE ENVIRONMENTAL VARIABLES): COPY OR CREATE A NEW .env file like the file .env-copy at the folder backend

```cmd
  copy backend\.env-copy backend\.env
```

(SET THE VARIABLES, IN THE FILE backend\.env)

```cmd
# ENVIROMENT VARIABLES

URL_FRONTEND=http://localhost:3000 #this is the same where your frontend is running ...

## SMTP credentials
### a gmail account with double check credencials to be used in app ...

EMAIL_SMTP=whoami@email.com
EMAIL_PASSWORD=emailpassword

## SECURITY WARNING: keep the secret key used in production secret!
## a unique key

# you can generate a key with next code:
# in bash

> openssl rand -base64 32

# copy the text and pasete next the '=' symbol

SECRET_KEY=friedchickenisawesome.com

```

**`RUNNING THE SERVER`**

(run development server)

```cmd
  (venv): python manage.py runserver
```

(should appear something like this)

```cmd
  Watching for file changes with StatReloader Performing system checks...

  System check identified no issues (0 silenced).
  December 17, 2022 - 22:16:44
  Django version 4.1.4, using settings 'backend.settings'
  Starting development server at http://127.0.0.1:8000/
  Quit the server with CTRL-BREAK.

```

**Open in your browser:** [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)

You will need and admin account
`pd`: the direction can change in some cases ...

**`Create an admin account`**

> stop the server with 'ctrl + z' or 'ctrl + c' and enter ...

in the terminal with environment active, so **(venv) FullStack-ToDo-App**/**backend**: type:

> You will be able to create an account to manage or develop in the admin panel

```cmd
  py manage.py createsuperuser
```

>run again

```cmd
  py manage.py runserver
```

> visit: [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin) and enter your information.

•

•

•

## Put the Frontend app to work

Open a new CMD or Terminal an go to the folder **FullStack-ToDo-App**/**frontend**

on Windows CMD is 'cd' the command:

```cmd
  cd frontend
```

Install the dependencies in the package.json with:

>this will install the required packages

```cmd
 npm install
```

> Copy and set the frontend variables (on Windows)

```cmd
  copy .env-vars .env
```

> Set the variables (it's the backend direction)

```env
# API route

REACT_APP_TO_DO_API='http://127.0.0.1:8000/api'
```

>This will put the frontend to work

```cmd
  npm start
```

### Doing Changes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can use a EDITOR like [**Visual Studio code**](https://code.visualstudio.com/) to check the code if you like ...

## Contact

I really would like to know if you like what I have done in this project, so here it's my personal email : jonhvelasco3@gmail.com and [Twitter](https://twitter.com/Rvjonh) to get a touch.

Dear coder... me: Jonh Gomez
