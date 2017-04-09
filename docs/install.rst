Install
=======

Setup Virtual Environment
.........................

This repository was created with the following::

   $ pyenv install 3.6.1
   $ pyenv virtualenv 3.6.1 scrappyr-django

Note that this repo includes a `.python-version` file that points to `scrappyr-django`. pyenv
will automatically switch to the `scrappyr-django` virtualenv.

Install dependencies
....................

Install dependencies from requirements files::

   $ pip install -r requirements/local.py

   $ brew install postgres
   $ brew services start postgresql


Verify installation
...................

Execute tests to verify installation::

   $ py.test

