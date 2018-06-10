import static org.hamcrest.CoreMatchers.any;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.ws.rs.core.Response;

import lombok.SneakyThrows;

import org.junit.Assert;
import org.junit.Test;

public class RootResourceTests {

  private final ObjectMapper mapper = new ObjectMapper();
  private final GameStore store = new GameStore();

  @Test
  public void test_root() {
    RootResource target = new RootResource(mapper, store);
    Response expected = Response.ok("Welcome to SudokuRace!").build();
    Response actual = target.root();
    Assert.assertEquals("Root path response has changed", expected.getEntity(), actual.getEntity());
  }

  @Test
  @SneakyThrows
  public void test_game_create() {
    RootResource target = new RootResource(mapper, store);
    NewGame actual = mapper.readValue((String) target.gameCreate().getEntity(), NewGame.class);
    Assert.assertThat("Id is no longer an integer", actual.getId(), any(Integer.class));
    Assert.assertNotNull("Id came back as null", actual.getId());
    Assert.assertThat("Board is no longer a string", actual.getBoard(), any(String.class));
    Assert.assertNotNull("Board came back as null", actual.getBoard());
  }
}
