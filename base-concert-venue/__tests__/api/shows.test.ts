import { testApiHandler } from 'next-test-api-route-handler';
import showsHandler from '@/pages/api/shows';
import showsIdHandler from '@/pages/api/shows/[showId]';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';

it('GET /api/shows return shows from db', async () => {
  await testApiHandler({
    handler: showsHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' });
      expect(res.status).toBe(200);
      const json = await res.json();
      const { fakeShows } = await readFakeData();
      expect(json).toEqual({ shows: fakeShows });
    }
  });
});

it('GET /api/shows/[showId] returns the data for the correct show ID', async () => {
  await testApiHandler({
    handler: showsIdHandler,
    paramsPatcher: (params) => params.showId = 0,
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' });
      expect(res.status).toBe(200);
      const json = await res.json();
      const { fakeShows } = await readFakeData();
      expect(json).toEqual({ show: fakeShows[0] });
    }
  });
});

it("POST /api/shows return 401 status for incorrect revalidation secret", async () => {
  await testApiHandler({
    handler: showsHandler,
    paramsPatcher: (params) => params.queryStringURLParams = { secret: "NOT REAL SECRET" },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "POST" });
      expect(res.status).toEqual(401);
    }
  });
});