from invoke import task


@task(aliases=['dev-server'])
def dev_server(ctx, pty=True):
    """Run django dev server and servers for static files."""
    ctx.run('python manage.py runserver | npm run watch-static', pty=pty)


@task
def build(ctx):
    """Build docs, static-files, etc."""
    ctx.run("sphinx-build docs docs/_build")
    ctx.run("npm run build-static")


@task
def storybook(ctx):
    """Start react storybook server for developing & testing UI components."""
    ctx.run("npm run storybook")


@task
def test(ctx, coverage=True, backend=True, frontend=True, acceptance=False, pty=True):
    """Run automated tests.

    By default acceptance tests are not run. Add `--acceptance` flag to include those tests.
    """
    if backend:
        test_cmd = 'pytest'
        test_cmd += ' --cov=scrappyr --cov-report term-missing' if coverage else ''
        test_cmd += ' scrappyr'  # Root application directory

        print_header('Backend tests')
        ctx.run(test_cmd, pty=pty)

    if frontend:

        print_header('Frontend tests')
        ctx.run('npm test', pty=pty)

    if acceptance:
        print_header('Acceptance tests')
        # Skip acceptance test directory if `acceptance` is False.
        ctx.run('pytest acceptance_tests', pty=pty)


@task
def check(ctx, pty=True):
    """Run code quality checks."""
    print_header('Django check')
    ctx.run('python manage.py check', pty=pty)

    print_header('Flake8')
    ctx.run('flake8', pty=pty)

    print_header('eslint')
    ctx.run('./node_modules/.bin/eslint -c eslintrc  scrappyr/static/js/**', pty=pty)


@task
def createapp(ctx, app):
    ctx.run('mkdir scrappyr/{}'.format(app))
    ctx.run('python manage.py startapp {0} scrappyr/{0}'.format(app))


@task
def clean(ctx, docs=True, bytecode=True, static_files=True, node_modules=True, extra=''):
    """Remove build files.

    This command removes:
        - Documentation built by Sphinx
        - *.pyc files
    """
    patterns = ['build']
    if docs:
        patterns.append('docs/_build')
    if bytecode:
        patterns.append('**/*.pyc')
        patterns.append('`find . -name __pycache__ -type d`')
    if static_files:
        patterns.append('scrappyr/static/webpack_bundles/')
    if node_modules:
        patterns.append('node_modules/*')
    if extra:
        patterns.append(extra)
    for pattern in patterns:
        ctx.run('rm -rf {0}'.format(pattern))


@task(aliases=['graph-models'])
def graph_models(ctx):
    """Create ./scrappyr-models.pdf file displaying visualization of Django models"""
    ctx.run('python manage.py graph_models -ag -o scrappyr-models.pdf')


def print_header(title):
    print()
    print(title)
    print('-' * len(title))
