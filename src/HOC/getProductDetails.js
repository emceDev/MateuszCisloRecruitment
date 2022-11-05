import { useQuery, useReactiveVar } from "@apollo/client";
import { useParams } from "react-router-dom";
import { cartProductsVar } from "../apolloState/client";
import { GET_PRODUCT_DETAILS } from "../apolloState/queries";

export const getProductDetails = (PureComponent) => {
	return function WrappedComponent(props) {
		const urlParams = useParams().id;
		const currentCart = useReactiveVar(cartProductsVar);
		const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
			variables: { pid: props.place === "product" ? urlParams : props.item },
		});

		function addRemove() {
			const product = data.product;

			const toCartData = {
				productId: product.id,
				prices: product.prices,
				inCartQuantity: 1,
			};
			cartProductsVar(
				product.isInCart
					? currentCart.filter((product) => product.productId !== product.id)
					: [...currentCart, toCartData]
			);
		}

		if (loading) {
			<p>loading...</p>;
		} else if (error) {
			<p>error occurred</p>;
		} else {
			return <PureComponent {...props} data={data} addRemove={addRemove} />;
		}
	};
};
