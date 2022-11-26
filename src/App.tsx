import React, { useState } from "react";
import { ethers } from "ethers";
import MemberRole from "./artifacts/contracts/MemberRole.sol/MemberRole.json";
import "./App.css";
import RoleList from "./pages/RoleList";
import { CONTRACT_ADDRESS } from "./config";
import NewRole from "./pages/NewRole";

function App() {
	const [roleTypes, setRoleTypes] = useState(0);
	const fetchRoleTypes = async () => {
		if (typeof window.ethereum !== undefined) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				CONTRACT_ADDRESS,
				MemberRole.abi,
				signer
			);
			try {
				const roles = await contract.addRoleType("teacher");
				roles.wait();
				// setRoleTypes(roles.toNumber());
				// console.log(roles.toNumber());
				// for (let i = 0; i < roles.toNumber(); i++) {
				// 	let role = await contract.addRoleType("admin");
				// 	// arr.push(role);
				// 	// setRoleNames((roleNames: any) => [...roleNames, role]);
				// }
			} catch (error) {
				console.log("Error", error);
			}
		}
	};
	return (
		<div className="App">
			hello dapp
			{/* <button onClick={fetchRoleTypes}>here</button> */}
			<NewRole/>
		</div>
	);
}

export default App;
