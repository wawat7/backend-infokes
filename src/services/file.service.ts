import { FileRepository } from "../repositories/file.repository";
import { randomUUID } from "node:crypto";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";

export class FileService {
  private fileRepository: FileRepository;

  constructor() {
    this.fileRepository = new FileRepository();
  }

  async createFolder(
    parent_id: number,
    file_name: string,
  ) {
    return this.fileRepository.create({
      parent_id,
      file_name,
      file_type: "folder",
      file_size: 0
    });
  }

  async uploadFile(
    parent_id: number,
    file_original: Blob,
    file_name: string,
    file_type: string,
    file_size: number
  ) {
    const fileExtension = file_name.split(".").pop();
    const fileNameWithoutExtension = file_name.split(".").slice(0, -1).join(".");
    const uniqueFileName = `${fileNameWithoutExtension}_${randomUUID()}.${fileExtension}`;
    const filePath = `uploads/${uniqueFileName}`;

    await pipeline(file_original.stream(), createWriteStream(filePath));

    return this.fileRepository.create({
      parent_id,
      file_name: uniqueFileName,
      file_type,
      file_size
    });
  }

  async getAllFiles(parent_id: number) {
    return this.fileRepository.getAll(parent_id);
  }

  async getFile(id: number) {
    return this.fileRepository.getById(id);
  }

  async search(query: string) {
    return this.fileRepository.search(query);
  }

}
