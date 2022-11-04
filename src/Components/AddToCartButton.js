import { Component } from "react";
import { setCount } from "../HOC/setQuantity";

class AddToCartButton extends Component {
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
