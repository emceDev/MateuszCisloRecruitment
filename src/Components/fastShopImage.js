import { Component } from "react";
import { addToCart } from "../HOC/addToCart";
import fastShopImg from "../images/CircleIcon.png";
class FastShopImage extends Component {
	state = {};
	handleClick(e) {
		this.props.showPopup(e);
		this.props.addRemove();
	}
	render() {
		return (
			<img
				src={fastShopImg}
				onClick={(e) => this.handleClick(e)}
				alt="fastShopImg"
			/>
		);
	}
}
export default addToCart(FastShopImage);
