import { useQuery, useReactiveVar } from "@apollo/client";
import { selectedCurrencyVar } from "../apolloState/client";
import { GET_CURRENCIES } from "../apolloState/queries";

export const getCurrencies = (PureComponent) => {
	return function WrappedComponent(props) {
		const { data, loading, error } = useQuery(GET_CURRENCIES);
		const currenc = useReactiveVar(selectedCurrencyVar);
		function selectCurrency(currency) {
			selectedCurrencyVar(currency);
		}
		if (loading) {
			<p>loading...</p>;
		} else if (error) {
			<p>error occurred</p>;
		} else {
			return (
				<PureComponent
					{...props}
					data={data}
					selectCurrency={(arg) => selectCurrency(arg)}
					currenc={currenc}
				/>
			);
		}
	};
};
