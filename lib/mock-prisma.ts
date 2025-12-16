import { collaboratorProfiles as seedCollaborators, demoUsers, products as seedProducts, releases as seedReleases, universes as seedUniverses } from "./seed-data";
import crypto from "crypto";
import bcrypt from "bcryptjs";

type Role = "FAN" | "COLLABORATOR" | "ARTIST_ADMIN" | "ADMIN";
type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

const id = () => crypto.randomUUID();

function buildUniverses() {
  return seedUniverses.map((u) => ({ ...u, id: id() }));
}

const db = {
  universes: buildUniverses(),
  releases: [] as any[],
  products: [] as any[],
  users: [] as any[],
  collaboratorProfiles: [] as any[],
  leads: [] as any[],
  works: [] as any[],
  orders: [] as any[],
  orderItems: [] as any[],
  collabRequests: [] as any[],
};

function universeBySlug(slug: string) {
  return db.universes.find((u) => u.slug === slug);
}

function seedProductsWithUniverse() {
  for (const product of seedProducts) {
    const universe = universeBySlug(product.universeSlug);
    if (!universe) continue;
    db.products.push({
      ...product,
      id: id(),
      universeId: universe.id,
      status: "ACTIVE" as ProductStatus,
      createdAt: new Date(),
    });
  }
}

function seedReleasesWithUniverse() {
  for (const [slug, items] of Object.entries(seedReleases)) {
    const universe = universeBySlug(slug);
    if (!universe) continue;
    for (const release of items) {
      db.releases.push({ ...release, id: id(), universeId: universe.id });
    }
  }
}

async function seedUsers() {
  const passwordHash = bcrypt.hashSync("demo1234", 10);
  for (const demo of demoUsers) {
    const user = {
      id: id(),
      ...demo,
      passwordHash,
      createdAt: new Date(),
    };
    db.users.push(user);
    if (demo.role === "COLLABORATOR") {
      const profile = seedCollaborators.shift();
      if (profile) {
        db.collaboratorProfiles.push({ ...profile, id: id(), userId: user.id });
      }
    }
  }
  const fan = db.users.find((u) => u.role === "FAN");
  if (fan) {
    for (const profile of seedCollaborators) {
      const collaborator = {
        id: id(),
        email: `${profile.displayName.toLowerCase().replace(/\s+/g, "")}@studi.io`,
        name: profile.displayName,
        role: "COLLABORATOR" as Role,
        passwordHash,
        createdAt: new Date(),
      };
      db.users.push(collaborator);
      db.collaboratorProfiles.push({ ...profile, id: id(), userId: collaborator.id });
    }
  }
}

seedProductsWithUniverse();
seedReleasesWithUniverse();
seedUsers();

type Where = Record<string, any>;

function findByWhere(collection: any[], where: Where) {
  const [key, value] = Object.entries(where)[0];
  return collection.find((item) => item[key] === value);
}

function filterByWhere(collection: any[], where?: any) {
  if (!where) return collection;
  return collection.filter((item) =>
    Object.entries(where).every(([key, value]) => {
      if (typeof value === "object" && value !== null && "equals" in value) {
        return item[key] === (value as any).equals;
      }
      return item[key] === value;
    }),
  );
}

function attachIncludes(item: any, include: any) {
  if (!include || !item) return item;
  const clone = { ...item };
  if (include.universe) clone.universe = db.universes.find((u) => u.id === item.universeId);
  if (include.user) clone.user = db.users.find((u) => u.id === item.userId);
  // attach universe relations
  if (include.releases) {
    clone.releases = db.releases.filter((r) => r.universeId === item.id);
  }
  if (include.products) {
    clone.products = db.products.filter((p) => p.universeId === item.id);
  }
  if (include.items) {
    clone.items = db.orderItems.filter((i) => i.orderId === item.id).map((i) => ({
      ...i,
      product: include.items.include?.product ? db.products.find((p) => p.id === i.productId) : undefined,
    }));
  }
  return clone;
}

export function createMockPrisma() {
  return {
    $disconnect: async () => {},
    universe: {
      findMany: async ({ include }: any = {}) => db.universes.map((u) => attachIncludes(u, include)),
      findUnique: async ({ where, include }: any) => attachIncludes(findByWhere(db.universes, where), include),
      findUniqueOrThrow: async ({ where, include }: any) => {
        const found = attachIncludes(findByWhere(db.universes, where), include);
        if (!found) throw new Error("Not found");
        return found;
      },
      upsert: async ({ where, create, update }: any) => {
        const existing = findByWhere(db.universes, where);
        if (existing) {
          Object.assign(existing, update);
          return existing;
        }
        const created = { ...create, id: id(), createdAt: new Date() };
        db.universes.push(created);
        return created;
      },
    },
    release: {
      upsert: async ({ where, create, update }: any) => {
        const existing = findByWhere(db.releases, where);
        if (existing) {
          Object.assign(existing, update);
          return existing;
        }
        const created = { ...create, id: id() };
        db.releases.push(created);
        return created;
      },
      findMany: async ({ where, orderBy }: any = {}) => {
        let list = filterByWhere(db.releases, where);
        if (orderBy?.date === "desc") list = list.sort((a, b) => +b.date - +a.date);
        return list;
      },
    },
    product: {
      upsert: async ({ where, create, update }: any) => {
        const existing = findByWhere(db.products, where);
        if (existing) {
          Object.assign(existing, update);
          return existing;
        }
        const created = { ...create, id: id(), status: "ACTIVE" as ProductStatus, createdAt: new Date() };
        db.products.push(created);
        return created;
      },
      findMany: async ({ include, where }: any = {}) =>
        filterByWhere(db.products, where).map((p) => attachIncludes(p, include)),
      findUnique: async ({ where, include }: any) => attachIncludes(findByWhere(db.products, where), include),
    },
    user: {
      findUnique: async ({ where }: any) => findByWhere(db.users, where),
      findMany: async ({ where }: any = {}) => filterByWhere(db.users, where),
      create: async ({ data }: any) => {
        const created = { ...data, id: id(), createdAt: new Date() };
        db.users.push(created);
        return created;
      },
      update: async ({ where, data }: any) => {
        const user = findByWhere(db.users, where);
        if (user) Object.assign(user, data);
        return user;
      },
      upsert: async ({ where, update, create }: any) => {
        const existing = findByWhere(db.users, where);
        if (existing) {
          Object.assign(existing, update);
          return existing;
        }
        const created = { ...create, id: id(), createdAt: new Date() };
        db.users.push(created);
        return created;
      },
    },
    collaboratorProfile: {
      upsert: async ({ where, create, update }: any) => {
        const existing = findByWhere(db.collaboratorProfiles, where);
        if (existing) {
          Object.assign(existing, update);
          return existing;
        }
        const created = { ...create, id: id() };
        db.collaboratorProfiles.push(created);
        return created;
      },
      create: async ({ data }: any) => {
        const created = { ...data, id: id() };
        db.collaboratorProfiles.push(created);
        return created;
      },
      findMany: async ({ include }: any = {}) =>
        db.collaboratorProfiles.map((p) =>
          include?.user ? { ...p, user: db.users.find((u) => u.id === p.userId) } : p,
        ),
    },
    lead: {
      createMany: async ({ data }: any) => {
        data.forEach((item: any) => db.leads.push({ ...item, id: id(), createdAt: new Date() }));
        return { count: data.length };
      },
      create: async ({ data }: any) => {
        const created = { ...data, id: id(), createdAt: new Date() };
        db.leads.push(created);
        return created;
      },
      findMany: async () => db.leads,
    },
    order: {
      create: async ({ data }: any) => {
        const created = { ...data, id: id(), createdAt: new Date() };
        db.orders.push(created);
        for (const item of data.items?.create || []) {
          db.orderItems.push({ ...item, id: id(), orderId: created.id });
        }
        return created;
      },
      findMany: async ({ where, include, orderBy }: any = {}) => {
        let list = filterByWhere(db.orders, where);
        if (orderBy?.createdAt === "desc") list = list.sort((a, b) => +b.createdAt - +a.createdAt);
        return list.map((o) => attachIncludes(o, include));
      },
      update: async ({ where, data }: any) => {
        const order = findByWhere(db.orders, where);
        if (order) Object.assign(order, data);
        return order;
      },
    },
    orderItem: {
      findMany: async ({ where, include }: any = {}) =>
        filterByWhere(db.orderItems, where).map((i) => attachIncludes(i, include)),
    },
    work: {
      create: async ({ data }: any) => {
        const created = { ...data, id: id(), createdAt: new Date() };
        db.works.push(created);
        return created;
      },
      update: async ({ where, data }: any) => {
        const work = findByWhere(db.works, where);
        if (work) Object.assign(work, data);
        return work;
      },
      findMany: async ({ where, include, orderBy, take }: any = {}) => {
        let list = filterByWhere(db.works, where);
        if (orderBy?.createdAt === "desc") list = list.sort((a, b) => +b.createdAt - +a.createdAt);
        if (take) list = list.slice(0, take);
        return list.map((w) => attachIncludes(w, include));
      },
      findUnique: async ({ where, include }: any) => attachIncludes(findByWhere(db.works, where), include),
      findFirst: async ({ where, include }: any) => attachIncludes(filterByWhere(db.works, where)[0], include),
    },
    collabRequest: {
      create: async ({ data }: any) => {
        const created = { ...data, id: id(), createdAt: new Date(), status: data.status || "PENDING" };
        db.collabRequests.push(created);
        return created;
      },
      findMany: async () => db.collabRequests,
    },
  };
}
