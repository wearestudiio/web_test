// @ts-nocheck
import crypto from "crypto";
import OpenAI from "openai";

type GenerationInput = {
  universe: string;
  type: string;
  occasion: string;
  mood: string;
  references: string;
  notes: string;
};

const openaiKey = process.env.OPENAI_API_KEY;

const basePrompts: Record<string, (input: GenerationInput) => any> = {
  "Personalized Song Kit": (input) => ({
    title: `${input.universe.toUpperCase()} — ${titleCase(input.mood)} ${titleCase(input.occasion)}`,
    lyrics: [
      "Verse: a metallic whisper tucked under the kick.",
      `Chorus: ${input.mood} energy with call-and-response claps.`,
      "Bridge: featherweight vocoder stack with muted strings.",
    ],
    tempo: input.mood.includes("slow") ? "92 BPM" : "118 BPM",
    productionNotes: [
      `Mood board: ${input.references || "chromatic bass, lacquered pads"}`,
      "Drum DNA: dusty breaks resampled through tape, sidechain to sub.",
      `Do: ${input.notes || "Keep vocals close-mic'd with plate verbs."}`,
      "Don't: over-quantize; let the groove breathe.",
    ],
    cover: `Signed palette pull from ${input.universe}: ink on white with a single accent stroke.`,
  }),
  "Photoshoot Concept": (input) => ({
    concept: `Editorial study titled “${titleCase(input.occasion)} in ${titleCase(input.mood)}”`,
    shotList: [
      "Wide establishing shot with architectural negative space.",
      "Macro texture of fabric catching light.",
      "Kinetic portrait with blurred limbs, crisp eyes.",
      "Closing still: subject looking into lens, annotation overlays.",
    ],
    wardrobe: [
      "Look 1: sculpted monochrome silhouette with chrome hardware.",
      "Look 2: flowing textile with ink gradient hems.",
      "Accessory: minimal cuff acting as signature seal.",
    ],
    lighting: "High contrast key, cool fill; add a single specular slash.",
  }),
  "Video Treatment": (input) => ({
    title: `Treatment: ${titleCase(input.occasion)} / ${input.universe}`,
    runtime: "68–90 seconds",
    storyboard: [
      "Beat 1: breath + typography; bass rumble enters.",
      "Beat 2: subject in motion; camera orbit; ink ripple transition.",
      "Beat 3: collaborator cameo framed like a museum placard.",
      "Beat 4: climax with flashing signature seal; fade to handwritten note.",
    ],
    audioBed: "Minimal synth ostinato, choral pads, restrained sub hits.",
    callToAction: "Hold the final frame for autograph animation and drop URL.",
  }),
};

function titleCase(value: string) {
  return value
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function deterministicTemplate(input: GenerationInput) {
  const base = basePrompts[input.type] || basePrompts["Personalized Song Kit"];
  return {
    universe: input.universe,
    type: input.type,
    mood: input.mood,
    occasion: input.occasion,
    references: input.references,
    output: base(input),
    createdAt: new Date().toISOString(),
  };
}

export async function generateWorkContent(input: GenerationInput) {
  if (!openaiKey) {
    return deterministicTemplate(input);
  }

  const client = new OpenAI({ apiKey: openaiKey });
  const prompt = `You are the studiio creative director. Universe=${input.universe}. Mood=${input.mood}. Occasion=${input.occasion}. References=${input.references}. Notes=${input.notes}. Build a concise JSON with fields: title, highlights[], steps[], closing.`;

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "user",
        content: [{ type: "text", text: prompt }],
      },
    ],
    output: {
      type: "json_object",
    },
  });

  const content = response.output_parsed as Record<string, any>;
  return {
    universe: input.universe,
    type: input.type,
    mood: input.mood,
    occasion: input.occasion,
    references: input.references,
    output: content,
    createdAt: new Date().toISOString(),
  };
}

export function hashWorkPayload(payload: any) {
  const canonical = JSON.stringify(payload);
  return `0x${crypto.createHash("sha256").update(canonical).digest("hex")}`;
}
