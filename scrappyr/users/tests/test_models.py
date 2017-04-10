from test_plus.test import TestCase


class TestUser(TestCase):

    def test__str__(self):
        user = self.make_user()
        # 'testuser' is the default username for self.make_user()
        assert user.__str__() == 'testuser'

    def test_get_absolute_url(self):
        user = self.make_user()
        assert user.get_absolute_url() == '/users/testuser/'
