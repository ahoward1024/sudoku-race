import javax.annotation.Nonnull;

import lombok.Value;

@Value
public class SudokuMove {
  @Nonnull private int playerId;
  @Nonnull private int index;
  @Nonnull private char value;
}
