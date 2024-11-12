import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "./db/schema";
import projectsJson from "./db/projects.json";

const db = drizzle(process.env.DATABASE_URL!);

(async () => {
  // insert data
  await db.insert(schema.projectTable).values(projectsJson);

  // read data
  const projects = await db.select().from(schema.projectTable);
  console.log(JSON.stringify(projects, null, 2));
  // await db
  //   .update(schema.projectTable)
  //   .set({
  //     title: "lorem ipus liber",
  //   })
  //   .where(eq(schema.projectTable.title, project.title));

  // console.log("project info updated!");

  // await db.delete(schema.projectTable).where(eq(schema.projectTable.title, project.title));
  // console.log("project deleted!");
})();
