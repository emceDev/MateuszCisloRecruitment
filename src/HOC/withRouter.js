import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		const [urlChanged, setUrlChanged] = useState(false);
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		const urlChange = new Event("urlChange");

		useEffect(() => {
			window.dispatchEvent(urlChange);
		}, [location.pathname]);
		return <Component {...props} />;
	}

	return ComponentWithRouterProp;
}
