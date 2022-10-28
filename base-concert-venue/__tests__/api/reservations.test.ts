import { testApiHandler } from "next-test-api-route-handler";
import reservationsHandler from "@/pages/api/reservations/[reservationId]";
import userReservationHandler from "@/pages/api/users/[userId]/reservations";
import { validateToken } from "@/lib/auth/utils";

jest.mock("@/lib/auth/utils");
const mockValidateToken = validateToken as jest.Mock;

test("POST /api/reservations/[reservationId] creates a reservation", async () => {
  await testApiHandler({
    handler: reservationsHandler,
    paramsPatcher: (params) => params.reservationId = 1234,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          seatCount: 2,
          userId: 1,
          showId: 0
        })
      });
      expect(res.status).toEqual(201);
      const json = await res.json();
      expect(json).toHaveProperty("reservation");
    }
  });
  await testApiHandler({
    handler: userReservationHandler,
    paramsPatcher: (params) => params.userId = 1,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.userReservations).toHaveLength(3);
    }
  });
});

test("POST /api/reservations/[reservationId] return 401 status when not authorized", async () => {
  mockValidateToken.mockResolvedValue(false);
  await testApiHandler({
    handler: reservationsHandler,
    paramsPatcher: (params) => params.reservationId = 1234,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          seatCount: 2,
          userId: 1,
          showId: 0
        })
      });
      expect(res.status).toEqual(401);
    }
  });
})