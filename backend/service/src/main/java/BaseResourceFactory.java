import io.dropwizard.setup.Environment;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class BaseResourceFactory {
  protected final SudokuRaceConfiguration conf;
  protected final Environment env;

  public static class ResourceFactory extends BaseResourceFactory {
    public ResourceFactory(SudokuRaceConfiguration conf, Environment env) {
      super(conf, env);
    }

    @Getter
    private final RootResource rootResource = new RootResource();
  }
}
