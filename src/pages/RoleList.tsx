import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MemberRole from "../artifacts/contracts/MemberRole.sol/MemberRole.json";
import { CONTRACT_ADDRESS } from "../config";
import { Button, Card } from "antd";

function RoleList() {
	const [roleTypes, setRoleTypes] = useState(0);
	const [roleNames, setRoleNames] = useState<any>([]);
	useEffect(() => {
		fetchRoleTypes();
	}, []);
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
				const roles = await contract.roleTypesCount();
				setRoleTypes(roles.toNumber());
				for (let i = 0; i < roles.toNumber(); i++) {
					let role = await contract.roleTypes(i);
					setRoleNames([...roleNames, role]);
				}
			} catch (error) {
				console.log("Error", error);
			}
		}
	};
	return (
		<span
			style={{
				height: "100vh",
				width: "100vw",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{roleTypes !== 0 ? (
				roleNames.map((val: any, i: any) => (
					<Card key={i} style={{ width: 300, margin: "10px" }}>
						{val}
					</Card>
				))
			) : (
				<Card style={{ width: 300 }}>No Role Types declared yet.</Card>
			)}
		</span>
	);
}

export default RoleList;
