const { version } = require("hardhat");

require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers:[
      {version: "0.8.4"},
      {version: "0.6.6"},
      {version: "0.8.8"}
    ]
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://bsc-dataseed.bnbchain.org"
      }
    },
    testnet: {
      url: "https://bsc-testnet-dataseed.bnbchain.org",
      chainId: 97,
      accounts: [""],
    },
    mainnet: {
      url: "https://bsc-dataseed.bnbchain.org",
      chainId: 56,
    }
  }
};
