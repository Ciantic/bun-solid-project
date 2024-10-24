import { defineConfig } from "@solidjs/start/config";
import { createDb } from "./src/db/db";

// Create the database, dropping it if it already exists
await createDb(true);

export default defineConfig({
});
