import { defineConfig } from "cypress";
import { resetDB } from "./__tests__/__mocks__/db/utils/reset-db";
import { addBand } from "./lib/features/bands/queries";
import { addReservation } from "./lib/features/reservations/queries";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;
      on("task", {
        "db:reset": () => resetDB().then(() => null),
        addBand: (newBand) => addBand(newBand).then(() => null),
        addReservation: (newReservation) => addReservation(newReservation).then(() => null)
      })
    return config;
    },
  },
});