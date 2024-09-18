import fastfy from "fastify";
import { createGoal } from "../functions/create-goal";
import z from "zod";

const app = fastfy();

app.post("/goals", async (request) => {
  const createGoalSchema = z.object({
    title: z.string(),
    desiredWeeklyFrequency: z.number(),
  });
  const body = createGoalSchema.parse(request.body);

  await createGoal({
    title: body.title,
    desiredWeeklyFrequency: body.desiredWeeklyFrequency,
  });
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running on port 3333");
  });
