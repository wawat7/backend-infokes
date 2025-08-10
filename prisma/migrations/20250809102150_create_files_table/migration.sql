-- CreateTable
CREATE TABLE "public"."File" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "file_name" VARCHAR(255) NOT NULL,
    "file_type" VARCHAR(255) NOT NULL,
    "file_size" BIGINT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT now(),
    "is_hidden" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id", "created_at")
) PARTITION BY RANGE (created_at);

-- CreateIndex
CREATE INDEX "File_parent_id_idx" ON "public"."File"("parent_id");

CREATE TABLE "File_2025" PARTITION OF "File"
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

CREATE TABLE "File_2026" PARTITION OF "File"
  FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

CREATE TABLE "File_2027" PARTITION OF "File"
  FOR VALUES FROM ('2027-01-01') TO ('2028-01-01');

CREATE TABLE "File_2028" PARTITION OF "File"
  FOR VALUES FROM ('2028-01-01') TO ('2029-01-01');

-- Default partition for future years
CREATE TABLE "File_future" PARTITION OF "File"
    FOR VALUES FROM ('2029-01-01') TO (MAXVALUE);
  