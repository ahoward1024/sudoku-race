import lombok.Value;

@Value
public class SudokuMove {
  private int playerId;
  private int x;
  private int y;
  private int value;
}
