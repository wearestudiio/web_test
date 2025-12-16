// @ts-nocheck
import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const Registry = await ethers.getContractFactory("UniverseRegistry");
  const registry = await Registry.deploy();
  await registry.waitForDeployment();

  const address = await registry.getAddress();
  console.log("UniverseRegistry deployed to:", address);

  const envPath = path.join(process.cwd(), ".env.local");
  const line = `UNIVERSE_REGISTRY_ADDRESS=${address}\n`;

  if (fs.existsSync(envPath)) {
    const current = fs.readFileSync(envPath, "utf8");
    if (!current.includes("UNIVERSE_REGISTRY_ADDRESS")) {
      fs.appendFileSync(envPath, "\n" + line);
    } else {
      const next = current.replace(/UNIVERSE_REGISTRY_ADDRESS=.*/g, line.trim());
      fs.writeFileSync(envPath, next);
    }
  } else {
    fs.writeFileSync(envPath, line);
  }

  console.log("Address written to .env.local");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
