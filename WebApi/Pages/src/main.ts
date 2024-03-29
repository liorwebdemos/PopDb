import { Aurelia } from "aurelia-framework";
import environment from "../config/environment.json";
import { PLATFORM } from "aurelia-pal";
import { DialogConfiguration } from "aurelia-dialog";

export function configure(aurelia: Aurelia): void
{
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName("value-converters/index"))
    .plugin(PLATFORM.moduleName("aurelia-dialog"), (config: DialogConfiguration) =>
    {
      // change some defaults
      config.settings.lock = false;
      config.settings.overlayDismiss = true;
      config.useRenderer("ux")
        .useStandardResources();
    });

  aurelia.use.developmentLogging(environment.debug ? "debug" : "warn");

  if (environment.testing)
  {
    aurelia.use.plugin(PLATFORM.moduleName("aurelia-testing"));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName("app")));
}
