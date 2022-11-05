import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		const location = useLocation();
		const urlChange = new Event("urlChange");

		useEffect(() => {
			window.dispatchEvent(urlChange);
		}, [location.pathname]);
		return <Component {...props} />;
	}

	return ComponentWithRouterProp;
}
