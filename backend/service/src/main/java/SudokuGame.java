import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Deque;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.ThreadLocalRandom;

public class SudokuGame {
  private static final List<char[]> ALL_BOARDS = loadBoards();

  private final char[] baseGame;
  private final Deque<SudokuMove> moveHistory = new ArrayDeque<>();

  public SudokuGame() {
    this.baseGame = ALL_BOARDS.get(ThreadLocalRandom.current().nextInt(ALL_BOARDS.size()));
  }

  // Manual injection for testing only
  public SudokuGame(char[] baseGame) {
    this.baseGame = baseGame;
  }

  public char[] makeMove(SudokuMove move) throws IllegalStateException {
    moveHistory.push(move);
    return renderedBoard();
  }

  // Package private for testing only
  private static List<char[]> loadBoards() {
    InputStream inputStream = SudokuGame.class.getClassLoader().getResourceAsStream("puzzles.txt");
    Scanner scanner = new Scanner(inputStream, "UTF-8");
    List<char[]> boards = new ArrayList<>();
    while (scanner.hasNextLine()) {
      String line = scanner.nextLine();
      boards.add(line.toCharArray());
    }
    return Collections.unmodifiableList(boards);
  }

  /**
   * Takes the base board, applies the history to it, and sees if the board state is valid.
   */
  public char[] renderedBoard() throws IllegalStateException {
    char[] copyOfGame = Arrays.copyOf(baseGame, baseGame.length);
    for (SudokuMove move : moveHistory) {
      char charAtLocation = copyOfGame[move.getIndex()];
      copyOfGame[move.getIndex()] = move.getValue();
      if (!CoreApplication.isValidBoard(copyOfGame)) {
        throw new IllegalStateException("An invalid move was made");
      }
    }
    return copyOfGame;
  }
}
