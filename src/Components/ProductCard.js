import { PureComponent } from "react";
import { Link } from "react-router-dom";
import Price from "./Price";
import PNames from "./PNames";
import FastShopImage from "./fastShopImage";

class ProductCard extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { fastShopBtn: false };
	}
	showPopup(e) {
		e.preventDefault();
	}
	render() {
		const { inStock, gallery, name, prices, id, isInCart } = this.props.product;
		return (
			<div
				className="ProductCard"
				onMouseEnter={() => {
					this.setState({ fastShopBtn: true });
				}}
				onMouseLeave={() => {
					this.setState({ fastShopBtn: false });
				}}
			>
				<div
					className="stockOverlay"
					style={{
						visibility: inStock ? "hidden" : "block",
					}}
				></div>

				<Link to={`/products/${id}`}>
					<div className="Image">
						<div
							className="FastShopBtnContainer"
							style={{
								display:
									this.state.fastShopBtn && inStock && !isInCart
										? "block"
										: "none",
							}}
							onClick={(e) => {
								e.preventDefault();
							}}
						>
							<FastShopImage productId={id} isInCart={isInCart} />
						</div>
						<div
							style={{
								visibility: inStock ? "hidden" : "block",
							}}
						>
							OUT OF STOCK
						</div>
						<img className="Image" alt="galleryBigImg" src={gallery[0]}></img>
					</div>

					<div className="desc">
						<div>
							<PNames name={name} />
							<Price prices={prices} />
						</div>
					</div>
				</Link>
			</div>
		);
	}
}

export default ProductCard;
