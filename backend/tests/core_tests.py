import unittest
from sudokurace import core


class CoreTestCase(unittest.TestCase):
    """Tests for core.py"""

    def test_is_valid_set(self):
        self.assertTrue(core.is_valid_set())


if __name__ == '__main__':
    unittest.main()
