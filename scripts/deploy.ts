import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const testUSDphiFactory = await ethers.getContractFactory("TUSDCphi");
  const testUSDphi = await testUSDphiFactory.deploy(await deployer.address);
  console.log("Token address:", await testUSDphi.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
