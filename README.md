# Member Role DAPP

This project uses hardhat and ReactJS along with TypeScript. 

To set up the project locally:
(make sure you have node installed on your system)

In one terminal instance : 

```shell
npm install
npx hardhat node
```
Run following command in another terminal instance:

```shell
npx hardhat run scripts/deploy.ts --network localhost
```

You will receive contract address. Replace the CONTRACT_ADDRESS in /src/config.ts .

Import first address of hardhat addresses in your metamask to be authenticated as owner of contract.

Run following command to start-up the react app.
```shell
npm start
```
