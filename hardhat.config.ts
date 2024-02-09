import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    Fuji_C: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      accounts: [PRIVATE_KEY]
    }
  }
};

export default config;
