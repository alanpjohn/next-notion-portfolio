import { redisNamespace, redisUrl } from "./config";
import Keyv from "@keyvhq/core";
import KeyvRedis from "@keyvhq/redis";

const keyvRedis = new KeyvRedis(redisUrl);
const db: Keyv = new Keyv({
    store: keyvRedis,
    namespace: redisNamespace || undefined,
});
db.on("error", (err) => console.log("Connection Error", err));

export { db };
