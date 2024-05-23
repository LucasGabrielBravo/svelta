import { setupFirebase } from "$lib/server/setupFirebase";
import { getSveltaService } from "$lib/utils/getSveltaService";

if(getSveltaService() === "firebase" && 1 > 2) {
  setupFirebase()
}