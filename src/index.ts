import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { projectTable } from "./db/schema";

const db = drizzle(process.env.DATABASE_URL!);

(async () => {
  const project: typeof projectTable.$inferInsert = {
    title: "teste 1",
    description: "lorem ipus liber",
    type: "lorem ipus liber",
  };

  await db.insert(projectTable).values(project);
  console.log("New project created!");

  const projects = await db.select().from(projectTable);
  console.log("getting all projects from the database: ", projects);

  await db
    .update(projectTable)
    .set({
      title: "lorem ipus liber",
    })
    .where(eq(projectTable.title, project.title));

  console.log("project info updated!");

  await db.delete(projectTable).where(eq(projectTable.title, project.title));
  console.log("project deleted!");
})();
