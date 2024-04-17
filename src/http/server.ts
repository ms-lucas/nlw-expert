import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from "zod";

const app = fastify();

const prisma = new PrismaClient();

app.post("/polls", async (request, reply) => {
  const createPollSchema = z.object({
    title: z.string(),
  });

  const { title } = createPollSchema.parse(request.body);

  await prisma.poll.create({
    data: {
      title,
    },
  });

  return reply.code(201).send();
});

app.listen({ port: 3333 }).then(() => console.log("HTTP server running..."));
