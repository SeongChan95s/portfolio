import { setGlobalOptions } from "firebase-functions";
export { velogRssProxy } from "./velogRssProxy";

setGlobalOptions({ maxInstances: 10 });
