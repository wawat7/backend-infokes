import { Elysia } from "elysia";
import { createUser, getUserById, getAllUsers, updateUser, deleteUser } from "./controllers/user.controller";
import { UserCreateModels } from "./models/user.model";
import { createFolder, getList, getFile, uploadFile } from "./controllers/file.controller";
import { FolderCreateModels, FileCreateModels } from "./models/file.model";

const app = new Elysia()
  .post("/users", async (ctx) => createUser(ctx), {
    body: UserCreateModels,
    tags: ["User"],
    type: "multipart/form-data",
  })
  .get("/users/:id", getUserById)
  .get("/users", getAllUsers)
  .put("/users/:id", updateUser)
  .delete("/users/:id", deleteUser)


  .post("/folders", async (ctx) => createFolder(ctx), {
    body: FolderCreateModels,
    tags: ["Folder"],
  })
  .get("/folders/:id", getList)
  .post("/files", async (ctx) => uploadFile(ctx), {
    body: FileCreateModels,
    tags: ["File"],
    type: "multipart/form-data",
  })
  .get("/files/:id", getFile)
  .listen(3000);
  

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);