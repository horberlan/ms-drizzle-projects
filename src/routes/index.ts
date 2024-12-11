Bun.serve({
  static: {
    // todo: as a checker for all available rotues
    "/api/health-check": new Response("All good!"),
  },
  fetch(req) {
    return new Response("❌ 404 ❌");
  },
});
