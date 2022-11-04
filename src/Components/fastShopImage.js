import { Component } from "react";
import { setCount } from "../HOC/setQuantity";
import fastShopImg from "../images/CircleIcon.png";
class FastShopImage extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<img
				src={fastShopImg}
				onClick={() => {
					this.props.counter(true);
				}}
				alt="fastShopImg"
			/>
		);
	}
}
export default setCount(FastShopImage);
