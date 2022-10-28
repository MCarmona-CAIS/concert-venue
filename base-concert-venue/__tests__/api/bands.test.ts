import { testApiHandler } from "next-test-api-route-handler";
import bandsHandler from "@/pages/api/bands";

it("POST /api/bands return 401 status for incorrect revalidation secret", async () => {
  await testApiHandler({
    handler: bandsHandler,
    paramsPatcher: (params) => params.queryStringURLParams = { secret: "NOT REAL SECRET" },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "POST" });
      expect(res.status).toEqual(401);
    }
  });
});