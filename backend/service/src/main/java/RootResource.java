import com.fasterxml.jackson.core.JsonProcessingException;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.concurrent.ThreadLocalRandom;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import lombok.RequiredArgsConstructor;

@Path("/")
@RequiredArgsConstructor
public class RootResource {
  private final ObjectMapper mapper;
  private final GameStore store;

  @GET
  public Response root() {
    return Response.ok("Welcome to SudokuRace!").build();
  }

  @GET
  @Path("game.create")
  public Response gameCreate() throws JsonProcessingException {
    String newGame = mapper.writeValueAsString(store.createGame());
    return Response.ok(newGame).build();
  }

  @POST
  @Path("move.make")
  public Response moveMake(MakeMove move) {
    System.out.println(move);
    return Response.ok().build();
  }
}
