import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.Scanner;

public class SudokuGame {
  private char[] baseGame;
  private final Deque<SudokuMove> moveHistory = new ArrayDeque<>();

  public void makeMove(SudokuMove move) throws IllegalStateException {
    moveHistory.push(move);
  }

  public void undoMove(SudokuMove move) {
    moveHistory.pop();
  }

  static List<char[]> loadBoards() {
    InputStream inputStream = SudokuGame.class.getClassLoader().getResourceAsStream("puzzles.txt");
    Scanner scanner = new Scanner(inputStream, "UTF-8");
    List<char[]> boards = new ArrayList<>();
    while (scanner.hasNextLine()) {
      String line = scanner.nextLine();
      boards.add(line.toCharArray());
    }
    return boards;
  }
}
