-- CreateTable
CREATE TABLE "packages" (
    "id" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "alt" VARCHAR(255),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "long_description" TEXT,
    "price" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);
