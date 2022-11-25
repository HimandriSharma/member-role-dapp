import React, { useState } from "react";
import { ethers } from "ethers";
import MemberRole from "./artifacts/contracts/MemberRole.sol/MemberRole.json";
import "./App.css";

const CONTRACT_ADDRESS = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";

function App() {
	const [roleTypes, setRoleTypes] = useState(0);
	const fetchRoleTypes = async () => {
		// const accounts = await window.ethereum.request({
		// 	method: "eth_requestAccounts",
		// });
		if (typeof window.ethereum !== undefined) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []); 
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				CONTRACT_ADDRESS,
				MemberRole.abi,
				signer
			);
			try {
				const data = await contract.addresses("0");
				// await data.wait();
        console.log(data)
			} catch (error) {
				console.log("Error", error);
			}
		}
	};
	return (
		<div className="App">
			hello dapp<button onClick={fetchRoleTypes}>click</button>
		</div>
	);
}

export default App;
