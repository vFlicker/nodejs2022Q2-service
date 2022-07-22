-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" UUID NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);
