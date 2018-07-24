from sudokurace.core import (
    solve,
    display,
    parse_grid
)


def test_solve():
    board = ('    735     6   9486 4     34   71             52   87     '
             '4 3297   8     413    ')
    solved = ''.join([c for c in solve(board).values()])
    expected = ('421973568537681294869452713342867159798315426615249387'
                '156794832973528641284136975')
    assert expected == solved


def test_invalid_board():
    board = ('1   735     6   9486 4     34   71             52   87     '
             '4 3297   8     413    ')
    assert False is solve(board)


def test_display_looks_good():
    board = ('    735     6   9486 4     34   71             52   87     '
             '4 3297   8     413    ')
    print()
    displayed = display(parse_grid(board))
    assert displayed == ('4 2 1 |9 7 3 |5 6 8 \n'
                         '5 3 7 |6 8 1 |2 9 4 \n'
                         '8 6 9 |4 5 2 |7 1 3 \n'
                         '------+------+------\n'
                         '3 4 2 |8 6 7 |1 5 9 \n'
                         '7 9 8 |3 1 5 |4 2 6 \n'
                         '6 1 5 |2 4 9 |3 8 7 \n'
                         '------+------+------\n'
                         '1 5 6 |7 9 4 |8 3 2 \n'
                         '9 7 3 |5 2 8 |6 4 1 \n'
                         '2 8 4 |1 3 6 |9 7 5 \n\n')


def test_search_fallback():
    board = ('4     8 5 3          7      2     6     8 4      1       6 '
             '3 7 5  2     1 4      ')
    solve(board)
