import io.dropwizard.Application;
import io.dropwizard.setup.Environment;

import java.util.EnumSet;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;

import org.eclipse.jetty.servlets.CrossOriginFilter;

public class SudokuRaceApplication extends Application<SudokuRaceConfiguration> {
  @Override
  public void run(SudokuRaceConfiguration conf, Environment env) throws Exception {
    BaseResourceFactory.ResourceFactory resources =
        new BaseResourceFactory.ResourceFactory(conf, env);
    env.jersey().register(resources.getRootResource());
    configureCors(env);
  }

  private void configureCors(Environment environment) {
    final FilterRegistration.Dynamic cors =
        environment.servlets().addFilter("CORS", CrossOriginFilter.class);

    // Configure CORS parameters
    cors.setInitParameter(CrossOriginFilter.ALLOWED_ORIGINS_PARAM, "*");
    cors.setInitParameter(CrossOriginFilter.ALLOWED_HEADERS_PARAM,
        "X-Requested-With,Content-Type,Accept,Origin,Authorization");
    cors.setInitParameter(CrossOriginFilter.ALLOWED_METHODS_PARAM,
        "OPTIONS,GET,PUT,POST,DELETE,HEAD");
    cors.setInitParameter(CrossOriginFilter.ALLOW_CREDENTIALS_PARAM, "true");

    // Add URL mapping
    cors.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");
  }

  public static void main(String[] args) throws Exception {
    new SudokuRaceApplication().run(args);
  }
}
