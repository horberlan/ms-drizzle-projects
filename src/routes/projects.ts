// Bun v1.1.27+ required

Bun.serve({
    static: {
      "/api/health-check": new Response("All good!"),
    },
  
    fetch(req) {
      return new Response("❌ 404 ❌");
    },
  });