import io.dropwizard.Configuration;

import javax.validation.Valid;

import lombok.Getter;

@Getter
public class SudokuRaceConfiguration extends Configuration {
  @Valid private String version;
}
