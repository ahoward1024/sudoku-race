import java.util.Arrays;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;

public class SudokuGameTests {
  @Test
  public void test_loaded_boards() {
    List<char[]> boards = SudokuGame.loadBoards();
    Assert.assertEquals("Unexpected number of boards", 62, boards.size());
    boards.forEach(board -> {
      Assert.assertEquals("Board has incorrect length", 81, board.length);
    });
  }
}
