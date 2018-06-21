import unittest
from sudokurace.views import index


class AppTestCase(unittest.TestCase):
    """Tests for App routes"""

    def test_string_from_root_route(self):
        self.assertEqual('Welcome to SudokuRace', index.root())


if __name__ == '__main__':
    unittest.main()
