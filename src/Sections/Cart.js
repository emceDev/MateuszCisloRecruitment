import { PureComponent } from "react";

import CartProduct from "../Components/CartProduct";
import CartSwitch from "../Components/CartSwitch";
import CartOrder from "../Components/CartOrder";
import CartOverlayBottom from "../Components/CartOverlayBottom";
import { getCartItems } from "../HOC/getCartItems";

class Cart extends PureComponent {
	state = { cartVisible: true, overlay: false };

	toggleVisibility() {
		this.setState({ cartVisible: !this.state.cartVisible });
		document.getElementById("OverlayDark").style.display = !this.state
			.cartVisible
			? "none"
			: "block";
	}

	render() {
		const { myBag, items, totalPrices, quantity } = this.props;
		return (
			<div className="Cart">
				{myBag ? (
					<CartSwitch
						cartVisible={this.state.cartVisible}
						toggleVisibility={() => this.toggleVisibility()}
						items={items}
					/>
				) : null}
				<div
					className={myBag ? "CartOverlay" : "MainCart"}
					style={{
						display: this.state.cartVisible && myBag ? "none" : "block",
					}}
				>
					<div>
						<div>
							<b>{!myBag ? "Cart" : "My bag"}</b>, {items.length}
							{items.length > 1 || items.length === 0 ? " items" : " item"}
						</div>
						<div className="CartProducts">
							{items.map((item) => (
								<CartProduct
									myBag={myBag}
									key={item.productId}
									item={item.productId}
									inCartQuantity={item.inCartQuantity}
									client={this.props.client}
								/>
							))}
						</div>

						{myBag ? (
							<CartOverlayBottom totalPrices={totalPrices} />
						) : (
							<CartOrder
								totalPrices={totalPrices}
								prices={totalPrices}
								quantity={quantity}
								items={items}
								client={this.props.client}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default getCartItems(Cart);
