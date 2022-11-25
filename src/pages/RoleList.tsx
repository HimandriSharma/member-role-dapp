import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MemberRole from "../artifacts/contracts/MemberRole.sol/MemberRole.json";
import { CONTRACT_ADDRESS } from "../config";
import { Button, Card, Form, Input } from "antd";

function RoleList() {
	const [roleTypes, setRoleTypes] = useState<any>(0);
	const [roleNames, setRoleNames] = useState<any>([]);
	const [form] = Form.useForm();

	useEffect(() => {
		fetchRoleTypes();
	}, [roleNames]);
	const fetchRoleTypes = async () => {
		if (typeof window.ethereum !== undefined) {
			let arr: any[] = [];
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
					arr.push(role);
				}
			} catch (error) {
				console.log("Error", error);
			}
			setRoleNames(arr);
		}
	};
	const handleCreateNewRole = async (values: any) => {
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
				const role = await contract.addRoleType(values.new_role_name);
				role.wait();
				fetchRoleTypes();
				form.setFieldsValue({ new_role_name: "" });
			} catch (error) {
				console.log("Error", error);
			}
		}
	};
	return (
		<span
			style={{
				width: "100vw",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Form onFinish={handleCreateNewRole} form={form}>
				<Form.Item name="new_role_name">
					<Input
						style={{
							width: 200,
						}}
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Create Role
					</Button>
				</Form.Item>
			</Form>

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
