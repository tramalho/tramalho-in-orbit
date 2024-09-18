import { client, db } from ".";
import { goals, golCompletions } from "./schema";
import dayjs from "dayjs";

async function seed() {
  await db.delete(golCompletions);
  await db.delete(goals);

  const result = await db
    .insert(goals)
    .values([
      {
        name: "Go to the gym",
        desiredWeeklyFrequency: 5,
      },
      {
        name: "Read a book",
        desiredWeeklyFrequency: 5,
      },
      {
        name: "Meditate",
        desiredWeeklyFrequency: 7,
      },
    ])
    .returning();

  const startOfWeek = dayjs().startOf("week");

  await db
    .insert(golCompletions)
    .values([
      { goalId: result[0].id, createdAt: startOfWeek.toDate() },
      { goalId: result[1].id, createdAt: startOfWeek.add(1, "day").toDate() },
    ])
    .returning();
}

seed().finally(() => client.end());
