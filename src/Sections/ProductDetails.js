import AdjustButtons from "../Components/AdjustButtons";
import { PureComponent } from "react";
import AddToCartButton from "../Components/AddToCartButton.js";
import Price from "../Components/Price";
import PNames from "../Components/PNames";
import { getProductDetails } from "../HOC/getProductDetails";
import { sanitize } from "dompurify";
import Imgs from "../Components/Imgs";

class ProductDetails extends PureComponent {
	constructor() {
		super();
		this.state = {
			selected: 0,
		};
	}
	// image switch
	selected(index) {
		this.setState({ selected: index });
	}
	// decoding with sanitization
	decode(html) {
		const element = document.getElementsByClassName("Description")[0];
		element.innerHTML = html;
		return;
	}
	render() {
		const {
			id,
			gallery,
			brand,
			prices,
			description,
			isInCart,
			inCartQuantity,
		} = this.props.data.product;

		return (
			<>
				<div className="ProductDetails" id={id}>
					<Imgs
						product={this.props.data.product}
						select={(index) => {
							this.selected(index);
						}}
					/>
					<div className="BigImg">
						<img src={gallery[this.state.selected]} alt="BigImg"></img>
					</div>
					<div className="Text">
						<PNames name={brand} id={id} />

						<AdjustButtons
							productId={id}
							place="Details"
							client={this.props.client}
						/>
						<div>
							<p>PRICE:</p>
							<Price prices={prices} />
						</div>

						<div>
							<AddToCartButton
								productId={id}
								isInCart={isInCart}
								inCartQuantity={inCartQuantity}
							/>
						</div>
						<div className="Description">
							<div
								dangerouslySetInnerHTML={{
									__html: sanitize(description),
								}}
							/>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default getProductDetails(ProductDetails);
