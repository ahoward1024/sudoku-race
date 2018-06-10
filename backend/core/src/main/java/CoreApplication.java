import java.util.Arrays;

public class CoreApplication {
  private static boolean validSet(char[] num) {
    int[] frequencies = new int[10];
    for (int i = 0; i < num.length; ++i) {
      int number = num[i] - '0';
      if (number < 0 || 10 < number) {
        continue;
      }
      if (++frequencies[number] > 1) {
        return false;
      }
    }
    return true;
  }

  private static char[] extractRow(char[] board, int rowIndex) {
    return Arrays.copyOfRange(board, rowIndex * 9, rowIndex * 9 + 9);
  }

  private static char[] extractCol(char[] board, int colIndex) {
    char[] col = new char[9];
    int idx = 0;
    int boardIndex = colIndex;
    while (boardIndex < 81) {
      col[idx] = board[boardIndex];
      boardIndex += 9;
      ++idx;
    }
    return col;
  }

  private static char[] extractSquare(char[] board, int squareIndex) {
    int[] indices = SQUARE_INDICES[squareIndex];
    char[] square = new char[9];
    for (int i = 0; i < 9; ++i) {
      square[i] = board[indices[i]];
    }
    return square;
  }

  private static final int[][] SQUARE_INDICES = new int[][] {
    {0, 1, 2, 9, 10, 11, 18, 19, 20 },
    {3, 4, 5, 12, 13, 14, 21, 22, 23 },
    {6, 7, 8, 15, 16, 17, 24, 25, 26 },
    {27, 28, 29, 36, 37, 38, 45, 46, 47 },
    {30, 31, 32, 39, 40, 41, 48, 49, 50 },
    {33, 34, 35, 42, 43, 44, 51, 52, 53 },
    {54, 55, 56, 63, 64, 65, 72, 73, 74 },
    {57, 58, 59, 66, 67, 68, 75, 76, 77 },
    {60, 61, 62, 69, 70, 71, 78, 79, 80 }
  };

  /**
   * Displays a sudoku board in a 9x9 grid.
   */
  public static void printBoard(char[] board) {
    for (int i = 0; i < 9; ++i) {
      for (int j = 0; j < 9; ++j) {
        System.out.print(board[i * 9 + j] + " ");
      }
      System.out.println();
    }
  }

  /**
   * Validates whether or not a board is possible.
   */
  public static boolean isValidBoard(char[] board) {
    for (int i = 0; i < 9; ++i) {
      if (!validSet(extractRow(board, i))) {
        return false;
      }
      if (!validSet(extractCol(board, i))) {
        return false;
      }
      if (!validSet(extractSquare(board, i))) {
        return false;
      }
    }
    return true;
  }

  /**
   * Entry point of the program.
   */
  public static void main(String[] args) {
    char[] board = ("15248937673925684146837129538712465959176342824689"
      + "5713914637582625948137873512964").toCharArray();
    printBoard(board);
    System.out.println(isValidBoard(board));
  }
}
