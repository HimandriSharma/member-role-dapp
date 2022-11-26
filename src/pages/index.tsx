import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NewRole from "./NewRole";
import RoleList from "./RoleList";
import Warning from "./Warning";

function index() {
	return (
		<Routes>
      <Route path="*" element={<Warning/>}/>
			<Route path="/" element={<Home />} />
			<Route path="/create_update_role" element={<NewRole />} />
			<Route path="/list_roles" element={<RoleList />} />
		</Routes>
	);
}

export default index;
