import java.util.TreeMap;

public class GameStore {
  TreeMap<Integer, SudokuGame> gameStore = new TreeMap<>();

  /**
   * Create a new game session.
   */
  public NewGame createGame() {
    if (gameStore.isEmpty()) {
      gameStore.put(0, new SudokuGame());
      return new NewGame(0, new String(gameStore.get(0).renderedBoard()));
    }
    int highestId = gameStore.lastKey();
    for (int i = 0; i < highestId; ++i) {
      if (!gameStore.containsKey(i)) {
        gameStore.put(i, new SudokuGame());
        return new NewGame(i, new String(gameStore.get(i).renderedBoard()));
      }
    }
    int newId = highestId + 1;
    gameStore.put(newId, new SudokuGame());
    return new NewGame(newId, new String(gameStore.get(newId).renderedBoard()));
  }

  public char[] makeMove(int gameId, SudokuMove move) throws IllegalStateException {
    return gameStore.get(gameId).makeMove(move);
  }

  public void invalidateGame(int gameId) {
    gameStore.remove(gameId);
  }
}
