import { Post } from "@/types/json-placeholder-api";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  first5Posts: procedure.query(async ({ ctx }) => {
    const responses = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts/1"),
      fetch("https://jsonplaceholder.typicode.com/posts/2"),
      fetch("https://jsonplaceholder.typicode.com/posts/3"),
      fetch("https://jsonplaceholder.typicode.com/posts/4"),
      fetch("https://jsonplaceholder.typicode.com/posts/5"),
    ]);

    const data: Post[] = await Promise.all(
      responses.map((response) => response.json())
    );

    console.log(data);

    return data;
  }),
  allPosts: procedure.query(async ({ ctx }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data: Post[] = await response.json();
    return data;
  }),
  postById: procedure.input(z.number()).query(async ({ ctx, input }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${input}`
    );
    const data: Post = await response.json();
    return data;
  }),
  commentsByPostId: procedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${input}/comments`
      );
      const data: Comment[] = await response.json();
    }),
});

export type AppRouter = typeof appRouter;
export { trpcNext };
