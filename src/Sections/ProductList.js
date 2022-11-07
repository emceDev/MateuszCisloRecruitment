import { PureComponent } from "react";
import ProductCard from "../Components/ProductCard";

import { getProducts } from "../HOC/getProdFromCat";

class ProductList extends PureComponent {
	state = {};
	render() {
		const { selected, products } = this.props;
		if (products !== undefined) {
			return (
				<div className="ProductListContainer">
					<h1>{selected}</h1>
					<div className="ProductList">
						{products.category.products.map((product) => {
							return (
								<ProductCard
									product={product}
									key={product.id}
									client={this.props.client}
								/>
							);
						})}
					</div>
				</div>
			);
		} else {
			return <div className="ProductList">Loading Products</div>;
		}
	}
}

export default getProducts(ProductList);
