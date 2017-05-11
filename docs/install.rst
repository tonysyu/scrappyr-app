Install
=======

Setup Virtual Environment
.........................

This repository was created with the following::

   $ pyenv install 3.6.1
   $ pyenv virtualenv 3.6.1 scrappyr-app

Note that this repo includes a `.python-version` file that points to `scrappyr-app`. pyenv
will automatically switch to the `scrappyr-app` virtualenv.

Install dependencies
....................

Install dependencies from requirements files::

   $ pip install -r requirements/local.py

   $ brew install postgres
   $ brew services start postgresql


Set up database::

   $ createdb scrappyr
   $ python manage.py migrate


Verify installation
...................

Execute tests to verify installation::

   $ py.test

Then, verify that you can start the application server::

   $ python manage.py runserver
