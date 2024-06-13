const { expect, assert } = require("chai")
const { ethers, waffle } = require("hardhat")
const { routerABI, erc20ABI, factoryABI} = require("../utils/ABIlist")
const { addressFactory, addressRouter, addressFrom, addressTo} = require("../utils/adressList")

describe("Read and write inthe blockchain", () => {
    let provider, contractFactory, contractRouter, contractToken, decimals, amounIn, amountOut;

    const network = "mainnet";
    //provider = new ethers.provider.AlchemyProvider(network, 'HD-e9u_6ppa4IerWPWArHYp1BU7Xrg4Y')
    provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/HD-e9u_6ppa4IerWPWArHYp1BU7Xrg4Y")

    contractFactory = new ethers.Contract(addressFactory, factoryABI, provider)
    contractRouter = new ethers.Contract(addressRouter, routerABI, provider)
    contractToken = new ethers.Contract(addressFrom, erc20ABI, provider)
    //console.log(contractFactory)

    //get prices amouts
    const getAmountOut = async () => {

        decimals = await contractToken.decimals()
        const amountInHuman = "1"
        amounIn = new ethers.utils.parseUnits(amountInHuman, decimals).toString()

        const amountsOut = await contractRouter.getAmountsOut(amounIn, [
            addressFrom,
            addressTo
        ])

        return amountsOut[1].toString()
    };

    it("Connets to provider, router, tokens and factory", () => {
        assert(provider._isProvider)

        expect(contractFactory.address).to.equal("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f")

        expect(contractRouter.address).to.equal("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")

        expect(contractToken.address).to.equal("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
    });

    it("get prices of amountsOut", async () => {
        const amount = await getAmountOut();
        assert(amount.toString())
    });

    it("sends transaccition swap a token", async () => {

        const [ownerSigner] =  await ethers.getSigners()

        const mainnetForkUniswapRouter = new ethers.Contract(
            addressRouter,
            routerABI,
            ownerSigner
        );

        const myAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
        const amountOut = await getAmountOut();

        const txSwap = await mainnetForkUniswapRouter.swapExactTokensForTokens(
            amounIn,
            amountOut,
            [addressFrom, addressTo],
            myAddress,
            Date.now() + 1000 * 60 * 5,
            {
                gasLimit: 200000,
                gasPrice: ethers.utils.parseUnits("5.5", "gwei")
            }
        )

        assert(txSwap.hash)
        const mainnetForkProvider = waffle.provider
        const txReceipt = await mainnetForkProvider.getTransactionReceipt(txSwap.hash)

        console.log("")
        console.log("SWAP TRANSACTION")
        console.log(txSwap)

        console.log("")
        console.log("TRANSACTION RECEIPT")
        console.log(txReceipt)
    })
})