import { prisma } from "../database/prisma";
import { File } from "@prisma/client";

export class FileRepository {
  async create(
    data: { 
        parent_id: number; 
        file_name: string; 
        file_type: string; 
        file_size: number; 
    }): Promise<File> {
    return prisma.file.create({
      data,
    });
  }

  async getById(id: number): Promise<File | null> {
    return prisma.file.findUnique({
      where: { id },
    });
  }

  async getAll(parent_id: number): Promise<File[]> {
    return prisma.file.findMany({
      where: { parent_id },
    })
  }

  async search(query: string): Promise<File[]> {
    return prisma.file.findMany({
      where: {
        file_name: {
          contains: query,
        },
      },
    });
  }

}
