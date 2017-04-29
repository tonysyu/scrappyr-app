from django.apps import AppConfig


class UsersConfig(AppConfig):
    name = 'scrappyr.users'
    verbose_name = "Users"

    def ready(self):
        pass
