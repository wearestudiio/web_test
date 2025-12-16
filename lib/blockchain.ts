// @ts-nocheck
import { createPublicClient, createWalletClient, http, Hex, getContract } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const registryAbi = [
  {
    type: "function",
    name: "registerWork",
    stateMutability: "nonpayable",
    inputs: [
      { name: "hash_", type: "bytes32" },
      { name: "universeSlug_", type: "string" },
      { name: "signer_", type: "address" },
      { name: "signature_", type: "bytes" },
      { name: "uri_", type: "string" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "getWork",
    stateMutability: "view",
    inputs: [{ name: "hash_", type: "bytes32" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "hash", type: "bytes32" },
          { name: "universeSlug", type: "string" },
          { name: "signer", type: "address" },
          { name: "timestamp", type: "uint256" },
          { name: "signature", type: "bytes" },
          { name: "uri", type: "string" },
        ],
      },
    ],
  },
] as const;

type RegisterParams = {
  hash: string;
  universeSlug: string;
  signature: string;
  uri: string;
  privateKey?: string;
};

const chainUrl = process.env.CHAIN_RPC_URL || "http://127.0.0.1:8545";
const registryAddress = process.env.UNIVERSE_REGISTRY_ADDRESS as Hex | undefined;

export function getSignerAccount(privateKey?: string) {
  if (!privateKey) return null;
  try {
    return privateKeyToAccount(privateKey as Hex);
  } catch {
    return null;
  }
}

export function getPublicClient() {
  if (!registryAddress) return null;
  return createPublicClient({
    transport: http(chainUrl),
  });
}

export function getRegistryContract() {
  const publicClient = getPublicClient();
  if (!publicClient || !registryAddress) return null;
  return getContract({
    abi: registryAbi,
    address: registryAddress,
    client: publicClient,
  });
}

export async function registerOnChain({ hash, universeSlug, signature, uri, privateKey }: RegisterParams) {
  if (!registryAddress || !privateKey) {
    return { txHash: null, status: "demo" };
  }
  const account = getSignerAccount(privateKey);
  if (!account) return { txHash: null, status: "demo" };

  const walletClient = createWalletClient({
    account,
    transport: http(chainUrl),
  });

  try {
    const txHash = await walletClient.writeContract({
      address: registryAddress,
      abi: registryAbi,
      functionName: "registerWork",
      args: [hash as Hex, universeSlug, account.address, signature as Hex, uri],
      chain: undefined,
    });
    return { txHash };
  } catch (error) {
    console.warn("Register on chain failed, continuing in demo mode", error);
    return { txHash: null, status: "demo" };
  }
}

export async function verifyChainRecord(hash: string) {
  try {
    const contract = getRegistryContract();
    if (!contract) return { onChain: false };
    const record = (await contract.read.getWork([hash as Hex])) as any;
    if (!record || record.timestamp === 0n) {
      return { onChain: false };
    }
    return {
      onChain: true,
      universeSlug: record.universeSlug as string,
      signer: record.signer as string,
      timestamp: Number(record.timestamp),
      uri: record.uri as string,
    };
  } catch (error) {
    console.error("verifyChainRecord error", error);
    return { onChain: false, error: "Chain unavailable" };
  }
}
