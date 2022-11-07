import { PureComponent } from "react";
import { getCurrencies } from "./Price";

class Taxed extends PureComponent {
	state = {};

	render() {
		const { prices, currenc, tax } = this.props;
		return (
			<>
				{prices.map((price) =>
					price.currency.label === currenc.label ? (
						<p key={price.currency.label}>
							{currenc.symbol}
							{Math.floor(price.amount / tax)}
						</p>
					) : null
				)}
			</>
		);
	}
}
export default getCurrencies(Taxed);
