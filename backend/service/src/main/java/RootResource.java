import java.util.concurrent.ThreadLocalRandom;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import lombok.RequiredArgsConstructor;

@Path("/")
@RequiredArgsConstructor
public class RootResource {
  static String generateGameSessionId() {
    final StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 12; ++i) {
      sb.append((char) ThreadLocalRandom.current().nextInt(97, 123));
    }
    return sb.toString();
  }

  @GET
  public Response root() {
    return Response.ok("Hello world").build();
  }

  @GET
  @Path("game.create")
  public Response gameCreate() {
    return Response.ok("New game").build();
  }

  @GET
  @Path("game.join")
  public Response gameJoin() {
    return Response.ok("Joining game").build();
  }
}
