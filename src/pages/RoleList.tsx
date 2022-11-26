import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MemberRole from "../artifacts/contracts/MemberRole.sol/MemberRole.json";
import { CONTRACT_ADDRESS } from "../config";
import { Button, Card, Form, Input, notification } from "antd";
import "../App.css";

function RoleList() {
	const [roleTypes, setRoleTypes] = useState(0);
	const [roleNames, setRoleNames] = useState<String[]>([]);
	const [form] = Form.useForm();

	useEffect(() => {
		fetchRoleTypes();
	}, [roleNames]);
	const fetchRoleTypes = async () => {
		if (typeof window.ethereum !== "undefined") {
			let arr: String[] = [];
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
				notification.error({
					message: "Error occured while role type creation.",
				});
			}
			setRoleNames(arr);
		}
	};
	const handleCreateNewRole = async (values: { new_role_name: String }) => {
		if (typeof window.ethereum !== "undefined") {
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
				notification.success({message:"Role Type created successfully."})
				form.setFieldsValue({ new_role_name: "" });
			} catch (error) {
				notification.error({
					message: "Error occured while role type creation.",
				});
			}
		}
	};
	return (
		<span className="center-width">
			<Form onFinish={handleCreateNewRole} form={form}>
				<Form.Item name="new_role_name" rules={[{ required: true, message: 'Please input role type' }]}>
					<Input
						style={{
							width: 200,
						}}
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Create Role Type
					</Button>
				</Form.Item>
			</Form>

			{roleTypes !== 0 ? (
				roleNames.map((val, i) => (
					<Card key={i} style={{ width: 300, margin: "10px" }}>
						index = {i} : {val}
					</Card>
				))
			) : (
				<Card style={{ width: 300 }}>No Role Types declared yet.</Card>
			)}
		</span>
	);
}

export default RoleList;
