import { useQuery, useReactiveVar } from "@apollo/client";
import { cartProductsVar } from "../apolloState/client";
import { GET_PRICES } from "../apolloState/queries";

export const addToCart = (Component) => {
	return function WrappedComponent(props) {
		const currentCart = useReactiveVar(cartProductsVar);
		const { data, loading, error } = useQuery(GET_PRICES, {
			variables: { pid: props.productId },
		});
		function addRemove() {
			console.log(props);
			if (props.inCart === true) {
				console.log("is in cart");
			} else {
				console.log("add to cart");
			}
		}
		if (loading) {
			<p>loading...</p>;
		} else if (error) {
			<p>error occurred</p>;
		} else {
			return <Component {...props} data={data} addRemove={addRemove} />;
		}
	};
};
