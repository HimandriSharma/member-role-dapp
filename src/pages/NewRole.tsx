import { Button, Card, Form, Input } from "antd";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../config";
import MemberRole from "../artifacts/contracts/MemberRole.sol/MemberRole.json";

function NewRole() {
	const handleCreateRole = async (values: { address: String; index: String; }) => {
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
				const roles = await contract.addRole(values.address,values.index);
				roles.wait();
        console.log(roles)
			} catch (error) {
				console.log("Error", error);
			}
		}
	};
	return (
		<Card style={{ width: 500 }}>
			<Form onFinish={handleCreateRole}>
				<Form.Item label="Member address" name="address" style={{ width: 300 }}>
					<Input />
				</Form.Item>
				<Form.Item
					label="Role Type Index"
					name="index"
					style={{ width: 300 }}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Create Role
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
}

export default NewRole;
