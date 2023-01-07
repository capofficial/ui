# CAP UI Web Client

## TODO

For details on how the margin / trading system works, please check the [Whitepaper](https://www.cap.finance/whitepaper.pdf), specifically sections 4 and 4.4. Liquidation Rebates and Interest Rate no longer apply.

The items below are listed in non-priority order. All milestones are **ASAP**, with a target production launch date of **early January**. The driving factor is high quality, speed, and code simplicity/readability.

The contracts that this UI interacts with are in the [protocol](https://github.com/capofficial/protocol) repo. It would probably be wise to run and connect to those contracts locally to be able to test UI changes quickly.

- [x] Component: Account, showing balance, equity, locked margin, free margin, margin level, buttons to deposit and withdraw
- [x] Component: Deposit / Withdraw modal
- [x] Component: New Order
- [x] Component: Chart, with price history pulled from Chainlink APIs
- [x] Component: Ticker, showing selected market symbol, latest price, and funding rate
- [x] Component: Markets, showing list of market symbols with latest prices
- [x] Component: Positions, showing list of active positions
- [x] Component: Close Position modal
- [x] Component: Orders, showing list of active orders
- [x] Subgraph: a separate repo that includes a simple subgraph to query historical trades
- [x] Component: History, showing list of past trades, pulled from subgraph
- [ ] Easy trade sharing for both active positions and historical trades
- [ ] Ability to export history to CSV, with a modal to determine the timeframe to export. This should probably use a web worker to avoid it blocking the UI in cases where the amount of items to export is big.
- [x] Component: Pool, showing pool balance, buffer balance, user pool balance, add liquidity, remove liquidity
- [x] Component: Network selector (top-right) to switch between chains
- [ ] Error strings should be synced with new contracts
- [ ] Mobile UI

## Done

- [x] ABIs for new contracts
- [x] APIs for new contracts
- [x] Simplify: remove market search, sorting, etc.

## Running on your local machine

```
npm i
npm run dev
```

## Contributing

You can submit a PR. Our devs will review it and merge into the main branch for deployment.