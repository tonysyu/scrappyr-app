========
scrappyr
========

A simple app for managing scraps of information. This app was created using the `Cookiecutter
Django`_ template. See `installation instructions`_ for how to setup your development environment.

.. image:: https://img.shields.io/badge/built%20with-Cookiecutter%20Django-ff69b4.svg
     :target: https://github.com/pydanny/cookiecutter-django/
     :alt: Built with Cookiecutter Django


:License: MIT


.. _Cookiecutter Django:
   http://cookiecutter-django.readthedocs.io/en/latest/developing-locally.html
.. _installation instructions: ./docs/install.rst


Settings
========

Moved to settings_.

.. _settings: http://cookiecutter-django.readthedocs.io/en/latest/settings.html


Basic Commands
==============


Database migrations
-------------------

When you make changes to models that require data migration, you run the following commands to
create migrations and apply them::

    $ python manage.py makemigrations
    $ python manage.py migrate


Setting Up Your Users
---------------------

* To create a **normal user account**, just go to Sign Up and fill out the form. Once you submit it, you'll see a "Verify Your E-mail Address" page. Go to your console to see a simulated email verification message. Copy the link into your browser. Now the user's email should be verified and ready to go.

* To create an **superuser account**, use this command::

    $ python manage.py createsuperuser

For convenience, you can keep your normal user logged in on Chrome and your superuser logged in on Firefox (or similar), so that you can see how the site behaves for both kinds of users.


Creating a new app
------------------

Note that django "apps" is distinct from the django project's web application. django apps are
small, function components that make up the web application. To create a new app, you'll need to
create a new directory for the app from this directory and use the management command to create
the app. For example, to create the `scraps` app (which is used to store, list, and create
scraps of data), run::

   $ mkdir scrappyr/scraps
   $ python manage.py startapp scraps scrappyr/scraps

Unfortunately, the management command doesn't correctly setup the `AppComfig` for the new app.
You'll need to open `./scrappyr/scraps/app.py` and change the `name` from `'scraps'` to
`'scrappyr.scraps'`.

Next, you'll need to register the new app in `INSTALLED_APPS` (under `LOCAL_APPS`).

If you add any models to the new app, you'll have need to make Django aware of the app::

   $ python manage.py makemigrations scraps

To add url routing for the new app, you'll need to add the following line to `./config/urls.py`::

    url(r'^scraps/', include('scrappyr.scraps.urls', namespace='scraps')),


Quality Control
===============

Troubleshooting
---------------

If you run into problems, try running::

   $ python manage.py check


Running tests
-------------

To run the full test suite, run::

    $ py.test

If you want include code coverage, run::

    $ py.test --cov=scrappyr


Linting
=======

::

   flake8


Live reloading and Sass CSS compilation
=======================================

Moved to `Live reloading and SASS compilation`_.

.. _`Live reloading and SASS compilation`: http://cookiecutter-django.readthedocs.io/en/latest/live-reloading-and-sass-compilation.html



Sentry
======

Sentry is an error logging aggregator service. You can sign up for a free account at
https://sentry.io/signup/?code=cookiecutter or download and host it yourself. The system is setup
with reasonable defaults, including 404 logging and integration with the WSGI application.

You must set the DSN url in production.
