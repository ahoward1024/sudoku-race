import io.dropwizard.Application;
import io.dropwizard.setup.Environment;

public class SudokuRaceApplication extends Application<SudokuRaceConfiguration> {
  @Override
  public void run(SudokuRaceConfiguration conf, Environment env) throws Exception {
    BaseResourceFactory.ResourceFactory resources =
        new BaseResourceFactory.ResourceFactory(conf, env);
    env.jersey().register(resources.getRootResource());
  }

  public static void main(String[] args) throws Exception {
    new SudokuRaceApplication().run(args);
  }
}
