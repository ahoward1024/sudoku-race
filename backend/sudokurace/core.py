from collections import defaultdict


def is_valid_set(char_set):
    """Checks if a given 9 character string is possibly a valid sudoku move"""

    if len(char_set) < 9:
        return False

    # We skip spaces, so we can't just rely on collections.Counter
    count = defaultdict(int)
    for c in char_set:
        if c == ' ':
            continue
        if int(c) < 1 or 9 < int(c):
            return False
        count[c] += 1
    return all({char_count < 2 for char_count in count.values()})


def is_valid_board(board):
    if len(board) != 81:
        return False
    rows = {board[i * 9:(i * 9) + 10] for i in range(9)}
    # Transpose the rows to get the columns as rows for easier usage
    cols = {''.join(x) for x in zip(*rows)}
    return all({is_valid_set(char_set) for char_set in rows.union(cols)})
