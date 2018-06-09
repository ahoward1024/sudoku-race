import org.junit.Test;
import org.junit.Assert;

public class RootResourceTests {
  @Test
  public void test_session_generation() {
    System.out.println(RootResource.generateGameSessionId());
  }
}
