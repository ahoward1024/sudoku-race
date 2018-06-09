import lombok.Value;

@Value
public class SudokuMove {
  private int playerId;
  private int row;
  private int column;
  private int value;
}
