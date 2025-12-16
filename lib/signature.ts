// @ts-nocheck
import { hashWorkPayload } from "./generator";
import { getSignerAccount } from "./blockchain";
import { hexToBytes } from "viem";

export async function signWork(payload: any, privateKey?: string) {
  const hash = hashWorkPayload(payload);
  const cleanHash = hash.startsWith("0x") ? hash : `0x${hash}`;
  if (!privateKey) {
    return {
      hash,
      signature: `demo-signature-${hash.slice(0, 12)}`,
      signerAddress: "demo",
    };
  }
  const account = getSignerAccount(privateKey);
  if (!account) {
    return {
      hash,
      signature: `demo-signature-${hash.slice(0, 12)}`,
      signerAddress: "demo",
    };
  }

  const signature = await account.signMessage({ message: { raw: hexToBytes(cleanHash) } });

  return {
    hash,
    signature,
    signerAddress: account.address,
  };
}
