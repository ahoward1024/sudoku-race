import javax.annotation.Nonnull;

import lombok.Value;

@Value
public class MakeMove {
  @Nonnull private final int gameId;
  @Nonnull private final SudokuMove move;
}
