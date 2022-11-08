import { taxVar } from "../apolloState/client";
import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_CART, GET_CURRENCIES } from "../apolloState/queries";

export const getCartItems = (PureComponent) => {
	return function WrappedComponent(props) {
		const tax = useReactiveVar(taxVar);
		const [totalPrices, setTotalPrices] = useState([]);
		const [quantity, setQuantity] = useState(0);
		// const cart = useReactiveVar(cartProductsVar);
		const { data, loading, error } = useQuery(GET_CART);
		const currencies = useQuery(GET_CURRENCIES);

		const cart = data.cart;

		useEffect(() => {
			let amounts = [];
			const sum = () => {
				console.log("summiung");
				let totalNum = 0;

				if (cart[0] !== undefined && currencies.loading === false) {
					// set inintial currencies

					currencies.data.currencies.map((price) =>
						amounts.push({ amount: 0, currency: price })
					);
					cart.map((item) => {
						totalNum = totalNum + item.inCartQuantity;
						setQuantity(totalNum);
						item.prices.map((price) =>
							amounts.map((am, index) =>
								price.currency.label === am.currency.label
									? (amounts[index].amount =
											amounts[index].amount +
											price.amount * item.inCartQuantity)
									: null
							)
						);
					});
					console.log(amounts);
					return setTotalPrices(amounts);
				} else {
					if (currencies.loading === false) {
						currencies.data.currencies.map((price) =>
							amounts.push({ amount: 0, currency: price })
						);
						console.log(amounts);
						return setTotalPrices(amounts);
					}
				}
			};

			return cart !== undefined ? sum() : null;
		}, [cart]);

		if (loading) {
			<p>loading...</p>;
		} else if (error) {
			<p>error occurred</p>;
		} else {
			return (
				<PureComponent
					{...props}
					items={cart}
					quantity={quantity}
					tax={tax}
					totalPrices={totalPrices}
				/>
			);
		}
	};
};
