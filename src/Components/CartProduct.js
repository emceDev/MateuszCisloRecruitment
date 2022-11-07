import AdjustButtons from "./AdjustButtons";
import QuantityButtons from "./QuantityButtons";
import { PureComponent } from "react";
import Price from "./Price";
import PNames from "./PNames";
import { getProductDetails } from "../HOC/getProductDetails";
import { Link } from "react-router-dom";

class CartProduct extends PureComponent {
	state = {
		selected: 0,
	};

	switchImg = (arg) => {
		const limit = this.props.data.product.gallery.length - 1;
		arg
			? this.state.selected + 1 > limit
				? this.setState({ selected: 0 })
				: this.setState({ selected: this.state.selected + 1 })
			: this.state.selected - 1 <= 0
			? this.setState({ selected: limit })
			: this.setState({ selected: this.state.selected - 1 });
	};
	componentDidMount() {}
	render() {
		const myBag = this.props.myBag;
		const product = this.props.data.product;
		return (
			<div className="CartProduct">
				<div className="col1">
					<PNames myBag={myBag} name={product.name} id={product.id} />
					<Price prices={product.prices} />

					<AdjustButtons
						productId={product.id}
						place={"cart" + product.id}
						client={this.props.client}
						active={false}
					/>
				</div>

				<div className="col2">
					<QuantityButtons
						productId={product.id}
						client={this.props.client}
						inCartQuantity={this.props.inCartQuantity}
					/>
					<div className="image">
						<Link to={`/products/${product.id}`}>
							<img
								alt="productphoto"
								src={product.gallery[this.state.selected]}
							></img>
						</Link>
						{myBag ? null : (
							<div className="imgBtns">
								<div onClick={() => this.switchImg(false)}>
									{/* <img src={vector}></img> */}
									{"<"}
								</div>
								<div onClick={() => this.switchImg(true)}>
									{">"}
									{/* <img src={vector}></img> */}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default getProductDetails(CartProduct);
