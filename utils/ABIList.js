/* /* esta funciones vienen el PancakeRoute smart contract que esta en el addressList
que esta como addressRouter según vi en el curso pero buscando en polygon zkEVM

const erc20ABI = ["function decimals() external view returns (uint8)"]

const factoryABI = ["function getPair(address tokenA, address tokenB) external view returns (address pair)"]

const pairABI = [
    "function token0() external view returns (address)",
    "function token1() external view returns (address)",
    "function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)"
]

const routerABI = ["function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) public returns (uint amountOut)"] 
 */
 // Desde la ETHER scan 
const erc20ABI = ["function decimals() external pure returns (uint8)"]

const factoryABI = ["function getPair(address tokenA, address tokenB) external view returns (address pair)"]

const routerABI = [
    " function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",
    "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)"
] 

module.exports = { erc20ABI, factoryABI, routerABI }