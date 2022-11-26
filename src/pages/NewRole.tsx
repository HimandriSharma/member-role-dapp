import { Button, Card, Form, Input, notification } from "antd";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../config";
import MemberRole from "../artifacts/contracts/MemberRole.sol/MemberRole.json";
import "../App.css";

function NewRole() {
	const [form] = Form.useForm();
	const handleCreateRole = async (values: {
		address: String;
		index: String;
	}) => {
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
				const roles = await contract.addRole(values.address, values.index);
				roles.wait();
				notification.success({
					message: "Congratulations! Transaction Successfully.",
				});
			} catch (error) {
				notification.error({ message: `There was an error : ${error}` });
			}
			form.setFieldsValue({ address: "", index: "" });
		}
	};
	return (
		<span className="center-page">
			<Card style={{ width: 500 }} title="Create/Update member details">
				<Form form={form} onFinish={handleCreateRole}>
					<Form.Item
						label="Member address"
						name="address"
						style={{ width: 300 }}
					>
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
		</span>
	);
}

export default NewRole;
