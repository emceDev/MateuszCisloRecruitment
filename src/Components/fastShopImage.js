import { PureComponent } from "react";
import { setCount } from "../HOC/setQuantity";
import fastShopImg from "../images/CircleIcon.png";
class FastShopImage extends PureComponent {
	render() {
		return (
			<img
				src={fastShopImg}
				onClick={(e) => {
					this.props.counter(true);
				}}
				alt="fastShopImg"
			/>
		);
	}
}
export default setCount(FastShopImage);
