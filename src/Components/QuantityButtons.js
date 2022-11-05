import { PureComponent } from "react";
import { setCount } from "../HOC/setQuantity";

class QuantityButtons extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { number: 1 };
	}
	render() {
		return (
			<div className="QuantityButtons">
				<div
					onClick={() => {
						this.props.counter(true);
					}}
				>
					+
				</div>
				<p>{this.props.inCartQuantity}</p>
				<div
					onClick={() => {
						this.props.counter(false);
					}}
				>
					-
				</div>
			</div>
		);
	}
}

export default setCount(QuantityButtons);
