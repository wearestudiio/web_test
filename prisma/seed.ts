// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { universes, releases, products, collaboratorProfiles, demoUsers } from "../lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("demo1234", 10);

  for (const universe of universes) {
    await prisma.universe.upsert({
      where: { slug: universe.slug },
      update: { ...universe },
      create: { ...universe },
    });
  }

  const worm = await prisma.universe.findUniqueOrThrow({ where: { slug: "worm" } });
  const tarns = await prisma.universe.findUniqueOrThrow({ where: { slug: "tarns" } });

  for (const rel of releases.worm) {
    await prisma.release.upsert({
      where: { title: rel.title },
      update: rel,
      create: { ...rel, universeId: worm.id },
    });
  }

  for (const rel of releases.tarns) {
    await prisma.release.upsert({
      where: { title: rel.title },
      update: rel,
      create: { ...rel, universeId: tarns.id },
    });
  }

  for (const product of products) {
    const universe = product.universeSlug === "worm" ? worm : tarns;
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: { ...product, universeId: universe.id, status: "ACTIVE" },
      create: { ...product, universeId: universe.id, status: "ACTIVE" },
    });
  }

  for (const userData of demoUsers) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: { role: userData.role, passwordHash, name: userData.name },
      create: { ...userData, role: userData.role, passwordHash },
    });

    if (userData.role === "COLLABORATOR") {
      const profile = collaboratorProfiles.shift();
      if (profile) {
        await prisma.collaboratorProfile.upsert({
          where: { userId: user.id },
          update: profile,
          create: { ...profile, userId: user.id },
        });
      }
    }
  }

  // Seed additional collaborator profiles attached to the fan user
  const fan = await prisma.user.findUnique({ where: { email: "fan@studi.io" } });
  if (fan) {
    for (const profile of collaboratorProfiles) {
      const collaborator = await prisma.user.create({
        data: {
          email: `${profile.displayName.toLowerCase().replace(/\s+/g, "")}@studi.io`,
          name: profile.displayName,
          role: "COLLABORATOR",
          passwordHash,
        },
      });
      await prisma.collaboratorProfile.create({
        data: { ...profile, userId: collaborator.id },
      });
    }
  }

  await prisma.lead.createMany({
    data: [
      { email: "press@studi.io", name: "Press Desk", note: "Interested in signature explainer." },
      { email: "tour@studi.io", name: "Touring Partner", note: "Exploring universe residency." },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    console.log("Seeded Studiio data.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
