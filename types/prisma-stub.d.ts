declare module "@prisma/client" {
  export type Role = "FAN" | "COLLABORATOR" | "ARTIST_ADMIN" | "ADMIN";
  export type WorkStatus = "PENDING" | "COMPLETED" | "FAILED";
  export type OrderStatus = "PENDING" | "PAID" | "FULFILLED" | "CANCELLED";
  export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

  export class PrismaClient {
    [key: string]: any;
    $disconnect(): Promise<void>;
  }
}
