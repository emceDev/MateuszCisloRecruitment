import { PureComponent } from "react";
import { setCount } from "../HOC/setQuantity";

class AddToCartButton extends PureComponent {
	render() {
		return (
			<div
				className="AddToCart"
				onClick={() => {
					this.props.counter(true);
				}}
			>
				ADD
			</div>
		);
	}
}

export default setCount(AddToCartButton);
