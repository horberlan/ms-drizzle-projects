import { Elysia, t } from "elysia";
import { db } from "../index";
import { snippetsTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const snippetsRouter = new Elysia({ prefix: "/api" })
    .get("/snippets", async () => {
        try {
            return await db.select().from(snippetsTable);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to retrieve snippets: ${error.message}`);
            }
            throw new Error("Failed to retrieve snippets: Unknown error");
        }
    })
    .put("/snippets/:id", async ({ params, body }) => {
        try {
            const { id } = params;
            const updateData = body;

            if (Object.keys(updateData).length === 0) {
                throw new Error("No update data provided");
            }

            const updatedSnippet = await db.update(snippetsTable)
                .set(updateData)
                .where(eq(snippetsTable._id, id))
                .returning();

            if (!updatedSnippet.length) {
                throw new Error(`Snippet with ID ${id} not found`);
            }

            return updatedSnippet[ 0 ];
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to update snippet: ${error.message}`);
            }
            throw new Error("Failed to update snippet: Unknown error");
        }
    }, {
        params: t.Object({
            id: t.String()
        }),
        body: t.Object({})
    })
    .patch("/snippets/:id/stars", async ({ params, body }) => {
        try {
            const { id } = params;
            const { stars } = body;

            if (typeof stars !== "number" || stars < 0 || !Number.isInteger(stars)) {
                throw new Error("Invalid stars value. Must be a non-negative integer.");
            }

            const updatedSnippet = await db.update(snippetsTable)
                .set({ stars })
                .where(eq(snippetsTable._id, id))
                .returning();

            if (!updatedSnippet.length) {
                throw new Error(`Snippet with ID ${id} not found`);
            }

            return updatedSnippet[ 0 ];
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to update snippet stars: ${error.message}`);
            }
            throw new Error("Failed to update snippet stars: Unknown error");
        }
    }, {
        params: t.Object({
            id: t.String()
        }),
        body: t.Object({
            stars: t.Number()
        })
    });