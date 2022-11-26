import { Button, Card } from "antd";
import { Link } from "react-router-dom";
import "../App.css";

function Warning() {
	return (
		<span className="center-page">
			<Card style={{ width: 500 }}>
				<b>Error 404</b> <br />
				This page does not exist.
				<br />
				<Link to="/">
					<Button style={{ margin: "15px" }}>Go Home</Button>
				</Link>
			</Card>
		</span>
	);
}

export default Warning;
