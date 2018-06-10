import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

import org.junit.Assert;
import org.junit.Test;

public class SudokuGameTests {
  @Test
  public void test_all_precomputed_boards_are_valid() {
    InputStream inputStream = SudokuGame.class.getClassLoader().getResourceAsStream("puzzles.txt");
    Scanner scanner = new Scanner(inputStream, "UTF-8");
    while (scanner.hasNextLine()) {
      String line = scanner.nextLine();
      Assert.assertTrue(line + " is invalid", CoreApplication.isValidBoard(line.toCharArray()));
    }
  }

  @Test
  public void test_valid_board_is_considered_valid() {
    char[] board = ("15248937673925684146837129538712465959176342824689"
      + "5713914637582625948137873512964").toCharArray();
    Assert.assertTrue("Hardcoded board is no longer considered valid",
        CoreApplication.isValidBoard(board));
  }

  @Test
  public void test_confirm_a_valid_renderBoard() {
    char[] baseGame = (" 5248937673925684146837129538712465959176342824689"
      + "5713914637582625948137873512964").toCharArray();
    char[] expected = ("15248937673925684146837129538712465959176342824689"
      + "5713914637582625948137873512964").toCharArray();
    SudokuGame game = new SudokuGame(baseGame);
    game.makeMove(new SudokuMove(0, 0, '1'));

    char[] rendered = game.renderedBoard();
    Assert.assertTrue("Rendered array doesn't match expected", Arrays.equals(expected, rendered));
  }

  @Test(expected = IllegalStateException.class)
  public void test_that_illegal_move_throws_exception() {
    char[] baseGame = (" 5248937673925684146837129538712465959176342824689"
      + "5713914637582625948137873512964").toCharArray();
    SudokuGame game = new SudokuGame(baseGame);
    game.makeMove(new SudokuMove(0, 0, '5'));
    char[] rendered = game.renderedBoard();
  }
}
