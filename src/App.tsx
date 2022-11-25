import React, { useState } from "react";
import { ethers } from "ethers";
import MemberRole from "./artifacts/contracts/MemberRole.sol/MemberRole.json";
import "./App.css";
import RoleList from "./pages/RoleList";

function App() {
	return (
		<div className="App">
			hello dapp
			<RoleList />
		</div>
	);
}

export default App;
