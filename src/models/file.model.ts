import { t } from "elysia";

const FileSchema = t.Object({
  name: t.String(),
  type: t.String(),
  size: t.Number(),
});

export const FileCreateModels = t.Object({
  parent_id: t.String(),
  file: t.File({
    required: true,
    schema: FileSchema,
  }),
});

export const FolderCreateModels = t.Object({
  parent_id: t.Number(),
  name: t.String({ maxLength: 250, required: true }),
});