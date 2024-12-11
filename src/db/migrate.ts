
import projectsJson from "./projects.json";
import snippetsJson from "./snippets.json";
import { db } from "../index";

import * as schema from "./schema";

(async () => {
    await db.insert(schema.projectTable).values(projectsJson);
    await db.insert(schema.snippetsTable).values(snippetsJson);

    const projects = await db.select().from(schema.projectTable);
    const snippets = await db.select().from(schema.snippetsTable);

    console.log({ projects, snippets });
})();

