-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "alt" VARCHAR(255) NOT NULL,
    "short_description" TEXT NOT NULL,
    "long_description" TEXT,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);
