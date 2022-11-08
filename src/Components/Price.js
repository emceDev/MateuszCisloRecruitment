import { useReactiveVar } from "@apollo/client";
import { PureComponent } from "react";
import { selectedCurrencyVar, taxVar } from "../apolloState/client";

export const getCurrencies = (PureComponent) => {
	return function WrappedComponent(props) {
		const currenc = useReactiveVar(selectedCurrencyVar);
		const tax = useReactiveVar(taxVar);
		return <PureComponent {...props} currenc={currenc} tax={tax} />;
	};
};

class Price extends PureComponent {
	state = {};

	render() {
		// console.log(this.props);
		return (
			<div className="Price">
				{this.props.prices.map((price) =>
					price.currency.label === this.props.currenc.label ? (
						<div key={price.currency.label}>
							<b>
								{this.props.currenc.symbol}
								{Math.round(price.amount * 100) / 100}
							</b>
						</div>
					) : null
				)}
			</div>
		);
	}
}

export default getCurrencies(Price);
