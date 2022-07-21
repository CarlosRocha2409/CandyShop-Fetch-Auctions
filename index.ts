import { PublicKey, Cluster, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { CandyShop } from "@liqnft/candy-shop-sdk";
import bs58 from "bs58";
import { BN } from "@project-serum/anchor";
const CANDY_SHOP_CREATOR_ADDRESS = new PublicKey(
  "CkgbW1EXqAtX6rbUZsudLyAfMgGR9gw3biHc6aJxZutp"
);
const CANDY_SHOP_TREASURY_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);
const CANDY_SHOP_PROGRAM_ID = new PublicKey(
  "csbMUULiQfGjT8ezT16EoEBaiarS6VWRevTw1JMydrS"
);
const NETWORK = "devnet" as Cluster;

const TOKEN_ACCOUNT = new PublicKey(
  "CkeqZzVB19EqsHNQ2GAQkf7gLV2BUqHEXUiGQ85bYYHf"
);
const TOKEN_MINT = new PublicKey(
  "AGSEDJJLMHt9sFvi9YoAduizfHVFU5KDAgs24Sd9CyGw"
);
const WALLET_SECRET_KEY =
  "52nikbBE8odPFV4P21bRn7RrmjXWY1coNEiLdq9pX16F16i9Nxy6pVXmWw5JZGMHnS2jT9EzJW7hivTHSqHiay4Q";

async function main() {
  const candyShop = new CandyShop({
    candyShopCreatorAddress: new PublicKey(CANDY_SHOP_CREATOR_ADDRESS), // creator address (i.e. your wallet address)
    treasuryMint: new PublicKey(CANDY_SHOP_TREASURY_MINT), // treasury mint (i.e. currency to buy and sell with)
    candyShopProgramId: new PublicKey(CANDY_SHOP_PROGRAM_ID), // Candy Shop program id
    env: NETWORK, // mainnet, devnet
    settings: {
      currencyDecimals: Number(9),
      currencySymbol: "SOL",
    },
  });

  const result = await candyShop
    .createAuction({
      startingBid: new BN(0.5 * LAMPORTS_PER_SOL),
      startTime: new BN(Date.now()),
      tickSize: new BN(0.5 * LAMPORTS_PER_SOL),
      buyNowPrice: new BN(10 * LAMPORTS_PER_SOL),
      tokenAccount: TOKEN_ACCOUNT,
      tokenMint: TOKEN_MINT,
      wallet: Keypair.fromSecretKey(bs58.decode(WALLET_SECRET_KEY)),
      biddingPeriod: new BN(84000),
    })
    .catch((e: any) => {
      console.log("An error ocurred");
      console.log(e.message);
      return;
    });

  console.log("Successfully created auction!");
  console.log(result);
}
main();
