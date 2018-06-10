import org.junit.Assert;
import org.junit.Test;

public class GameStoreTests {
  @Test
  public void test_create_a_new_game() {
    GameStore store = new GameStore();
    Assert.assertEquals(0, store.createGame().getId());
    Assert.assertEquals(1, store.createGame().getId());
    Assert.assertEquals(2, store.createGame().getId());
  }

  @Test
  public void test_that_new_id_goes_down_after_invalidation_of_low_id_game() {
    GameStore store = new GameStore();
    Assert.assertEquals(0, store.createGame().getId());
    Assert.assertEquals(1, store.createGame().getId());
    Assert.assertEquals(2, store.createGame().getId());
    store.invalidateGame(1);
    Assert.assertEquals(1, store.createGame().getId());
    store.invalidateGame(0);
    Assert.assertEquals(0, store.createGame().getId());
  }
}
