import { useQuery, useReactiveVar } from "@apollo/client";
import { cartProductsVar } from "../apolloState/client";
import { GET_PRICES } from "../apolloState/queries";

export const setCount = (PureComponent) => {
	return function WrappedComponent(props) {
		const cart = useReactiveVar(cartProductsVar);
		const productId = props.productId;
		const { data } = useQuery(GET_PRICES, {
			variables: { pid: props.productId },
		});
		const count = (attrValue) => {
			const toCartData = {
				productId: productId,
				prices: data.product.prices,
				inCartQuantity: 1,
			};
			let quantity;
			const inCart = cart.find((prod) => prod.productId === productId);
			if (cart.length > 0) {
				if (inCart === undefined) {
					quantity = 1;
				} else {
					quantity = inCart.inCartQuantity;
				}
			} else {
				quantity = 1;
			}
			if (props.isInCart === false) {
				return cartProductsVar([...cart, toCartData]);
			} else {
				const number = attrValue ? quantity + 1 : quantity - 1;

				return handleWrite(number);
			}
		};
		function handleWrite(number) {
			let newArray = [];
			if (number === 0) {
				newArray = cart.filter((product) => product.productId !== productId);
			} else {
				cart.map((product) =>
					product.productId === productId
						? newArray.push({
								productId: product.productId,
								inCartQuantity: number,
								prices: product.prices,
						  })
						: newArray.push(product)
				);
			}

			cartProductsVar(newArray);
		}
		return (
			<PureComponent
				{...props}
				counter={(attrValue) => {
					count(attrValue);
				}}
			/>
		);
	};
};
