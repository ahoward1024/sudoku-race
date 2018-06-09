import org.junit.Assert;
import org.junit.Test;

public class RootResourceTests {
  @Test
  public void test_session_generation() {
    System.out.println(RootResource.generateGameSessionId());
  }
}
