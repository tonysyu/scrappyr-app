Scrappyr Frontend
=================

Frontend code for the scrappyr web app. In general, code is organized by Django apps, with
top-level directory names matching Django app names. The exceptions are the `utils` directory and
the `core` directory. The `core` directory primarily contains components that are reused by other
apps and other domain-specific code, while `utils` contains generic utilities that are not specific
to the this codebase.
