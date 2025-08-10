import { FileService } from "../services/file.service";
import { Context } from "elysia";


const fileService = new FileService();

export async function createFolder(ctx: {
  body: {
    name: string;
    parent_id: number
  };
  set: any;
}) {
  const { name, parent_id } = ctx.body;
  try {
    const folder = await fileService.createFolder(parent_id, name);
    ctx.set.status = 201;
    return {};
  } catch (error) {
    ctx.set.status = 500;
    return { error: "Failed to create folder" };
  }
}


export async function getList(ctx: Context) {
    const { id } = ctx.params;
    try {
        const files = await fileService.getAllFiles(parseInt(id));
        const serializedFiles = files.map(file => ({
            ...file,
            file_size: file.file_size ? file.file_size.toString() : "0",
        }));
        ctx.set.status = 200;
        return serializedFiles;
    } catch (error) {
        ctx.set.status = 500;
        return { error: "Failed to get user" };
    }
}

export async function getFile(ctx: Context) {
    const { id } = ctx.params;
    try {
        const file = await fileService.getFile(parseInt(id));
        ctx.set.status = 200;
        return file;
    } catch (error) {
        ctx.set.status = 500;
        return { error: "Failed to get user" };
    }
}

export async function uploadFile(ctx: {
  body: {
    parent_id: string;
    file: Blob;
  };
  set: any;
}) {
//   const { parent_id, file } = ctx.body;
  const parent_id = ctx.body.parent_id;
  const file_original = ctx.body.file;
  try {
    const file = await fileService.uploadFile(
        parseInt(parent_id),
        file_original,
        file_original.name,
        file_original.type,
        file_original.size
    );
    ctx.set.status = 201;
    return {};
  } catch (error) {
    console.log(error);
    ctx.set.status = 500;
    return { error: "Failed to create folder" };
  }
}
