import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { createFolder, getList, getFile, uploadFile } from "./controllers/file.controller";
import { FolderCreateModels, FileCreateModels } from "./models/file.model";

const app = new Elysia()
  .use(swagger())
  .post("/folders", async (ctx) => createFolder(ctx), {
    body: FolderCreateModels,
    tags: ["Folder"],
  })
  .get("/folders/:id", async (ctx) => getList(ctx), {
    tags: ["Folder"],
  })
  .post("/files", async (ctx) => uploadFile(ctx), {
    body: FileCreateModels,
    tags: ["File"],
    type: "multipart/form-data",
  })
  .get("/files/:id", async (ctx) => getFile(ctx), {
    tags: ["File"],
  })
  .listen(3000);
  

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);