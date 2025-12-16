import { describe, it, expect } from "vitest";
import { generateWorkContent, hashWorkPayload } from "@/lib/generator";

describe("generator", () => {
  it("creates deterministic output without openai key", async () => {
    const payload = {
      universe: "WORM",
      type: "Personalized Song Kit",
      occasion: "birthday",
      mood: "electric",
      references: "bass, chrome",
      notes: "keep it tight",
    };
    const result = await generateWorkContent(payload);
    expect(result.universe).toBe("WORM");
    expect(result.output).toBeDefined();
  });

  it("hashes payload predictably", () => {
    const hashA = hashWorkPayload({ a: 1 });
    const hashB = hashWorkPayload({ a: 1 });
    expect(hashA).toBe(hashB);
  });
});
