import { gql } from "@apollo/client";
import { PureComponent } from "react";
import Price from "./Price";
import Taxed from "./Taxed";

const readyOrder = (PureComponent) => {
	return function WrappedComponent(props) {
		function readFragment(productId) {
			return props.client.readFragment({
				id: "Product:" + productId,
				fragment: gql`
					fragment Proddc on Product {
						setAttrs {
							attrId
							attrValue
						}
						prices {
							currency {
								symbol
								label
							}
							amount
						}
					}
				`,
			});
		}

		function order() {
			const cartToBuy = [];
			props.items.map((product) =>
				cartToBuy.push({
					...readFragment(product.productId),
					quantity: product.inCartQuantity,
					id: product.productId,
				})
			);
			console.log("Ordered: ", cartToBuy);
		}
		return (
			<>
				<PureComponent {...props} order={order} />
			</>
		);
	};
};
class CartOrder extends PureComponent {
	state = {};
	render() {
		const { totalPrices, quantity } = this.props;
		return (
			<div className="CartOrder">
				<div className="CartOrderDetails">
					<div>
						<p>tax</p>
						<p>quantity</p>
						<p>total</p>
					</div>
					<div>
						<Taxed prices={totalPrices} />
						<p>{quantity}</p>
						{totalPrices !== undefined ? (
							<Price prices={totalPrices} />
						) : (
							<p>no prices</p>
						)}
					</div>
				</div>
				<div className="ButtonOrder" onClick={this.props.order}>
					Order
				</div>
			</div>
		);
	}
}
export default readyOrder(CartOrder);
