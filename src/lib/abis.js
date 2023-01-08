const orderTuple = `tuple(
	bool isLong,
	bool isReduceOnly,
	uint8 orderType,
	uint72 orderId,
	address user,
	string market,
	uint64 timestamp,
	uint192 fee,
	uint256 price,
	uint256 margin,
	uint256 size
)`;

const positionTuple = `tuple(
	bool isLong,
	uint64 timestamp,
	address user,
	string market,
	int256 fundingTracker,
	uint256 price,
	uint256 margin,
	uint256 size
)`;

const marketTuple = `tuple(
	string symbol,
	address feed,
	uint16 minSettlementTime,
	uint16 maxLeverage,
	uint32 fee,
	uint32 fundingFactor,
	uint256 maxOI,
	uint256 minSize
)`;

const erc20ABI = [
	"function totalSupply() view returns (uint256)",
	"function decimals() view returns (uint8)",
	"function balanceOf(address account) view returns (uint256)",
	"function transfer(address recipient, uint256 amount) returns (bool)",
	"function allowance(address owner, address spender) view returns (uint256)",
	"function approve(address spender, uint256 amount) returns (bool)"
];

export const EVENT_ABIS = [
	`event OrderCreated(
		uint256 indexed orderId,
		address indexed user,
		string market,
		bool isLong,
		uint256 margin,
		uint256 size,
		uint256 price,
		uint256 fee,
		uint8 orderType,
		bool isReduceOnly
	)`,
	`event OrderCancelled(
		uint256 indexed orderId,
		address indexed user
	)`,
	`event AddLiquidity(
        address indexed user, 
        uint256 amount, 
        uint256 clpAmount,
        uint256 poolBalance
    )`,

   `event RemoveLiquidity(
        address indexed user, 
        uint256 amount,  
        uint256 feeAmount,  
        uint256 clpAmount,
        uint256 poolBalance
    )`,

    `event PoolPayIn(
    	address indexed user, 
        string market,
        uint256 amount,
        uint256 bufferToPoolAmount,
        uint256 poolBalance,
        uint256 bufferBalance
    )`,

    `event PoolPayOut(
    	address indexed user,
        string market,
        uint256 amount,
        uint256 poolBalance,
        uint256 bufferBalance
    )`,
    `event PositionIncreased(
		uint256 indexed orderId,
		address indexed user,
		string market,
		bool isLong,
		uint256 size,
		uint256 margin,
		uint256 price,
		uint256 positionMargin,
		uint256 positionSize,
		uint256 positionPrice,
		int256 fundingTracker,
		uint256 fee,
		uint256 keeperFee
	)`,

	`event PositionDecreased(
		uint256 indexed orderId,
		address indexed user,
		string market,
		bool isLong,
		uint256 size,
		uint256 margin,
		uint256 price,
		uint256 positionMargin,
		uint256 positionSize,
		uint256 positionPrice,
		int256 fundingTracker,
		uint256 fee,
		uint256 keeperFee,
		int256 pnl,
		int256 fundingFee
	)`,

	`event FeePaid(
	    address indexed user,
	    string market,
	    uint256 fee,
	    uint256 poolFee,
	    bool isLiquidation
	)`,
	`event PositionLiquidated(
		address indexed user,
		string market,
		bool isLong,
		uint256 size,
		uint256 margin,
		uint256 price,
		uint256 fee,
		uint256 liquidationFee
	)`
];

export const ABIS = {
	ERC20: erc20ABI,
	Pool: [
		`function addLiquidity(uint256)`,
		`function removeLiquidity(uint256)`
	],
	Trade: [
		`function deposit(uint256)`,
		`function withdraw(uint256)`,
		`function submitOrder(${orderTuple}, uint256, uint256)`,
		`function updateOrder(uint256, uint256)`,
		`function cancelOrder(uint256)`,
		`function cancelOrders(uint256[] calldata)`,
		`function closePositionWithoutProfit(string memory)`,
		`function executeOrders()`,

		`function getUpl(address) view returns(int256)`,
		`function getUserPositionsWithUpls(address) view returns (${positionTuple}[], int256[])`,
		`function getMarketsWithPrices() view returns (${marketTuple}[], uint256[])`,
		`function getAccruedFunding(string memory, uint256) view returns (int256)`
	].concat(EVENT_ABIS),
	Store: [
		`function currency() view returns(address)`,
		`function clp() view returns(address)`,
		`function poolFeeShare() view returns(uint256)`,
		`function keeperFeeShare() view returns(uint256)`,
		`function poolWithdrawalFee() view returns(uint256)`,
		`function minimumMarginLevel() view returns(uint256)`,
		`function bufferBalance() view returns(uint256)`,
		`function poolBalance() view returns(uint256)`,
		`function treasuryBalance() view returns(uint256)`,
		`function bufferPayoutPeriod() view returns(uint256)`,
		
		`function getBalance(address) view returns(uint256)`,
		`function getLockedMargin(address) view returns(uint256)`,
		`function getOILong(string memory) view returns(uint256)`,
		`function getOIShort(string memory) view returns(uint256)`,
		`function getUserOrders(address) view returns(${orderTuple}[])`,
		`function getUserPoolBalance(address) public view returns(uint256)`
	]
};