import { Post, Comment, User } from "@/types/json-placeholder-api";
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

    return data;
  }),
  allPosts: procedure.query(async ({ ctx }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data: Post[] = await response.json();
    return data.slice(5);
  }),
  postByIdWithUser: procedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const [post, user] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/posts/${input}`),
        fetch(`https://jsonplaceholder.typicode.com/users/${input}`),
      ]);

      const [postData, userData] = await Promise.all([
        post.json(),
        user.json(),
      ]);

      return { post: postData as Post, user: userData as User };
    }),
  commentsByPostId: procedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${input}/comments`
      );
      const data: Comment[] = await response.json();
      return data;
    }),

  postsByUserIdWithUser: procedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const [user, posts] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/users/${input}`),
        fetch(`https://jsonplaceholder.typicode.com/users/${input}/posts`),
      ]);

      const [userData, postsData] = await Promise.all([
        user.json(),
        posts.json(),
      ]);

      return {
        user: userData as User,
        posts: postsData as Post[],
      };
    }),
});

export type AppRouter = typeof appRouter;
export { trpcNext };
