import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const cartProductsVar = makeVar([]);

export const cartSummary = makeVar([]);
export const cartItemsVar = makeVar([]);

// default currency
export const selectedCurrencyVar = makeVar({
	label: "USD",
	symbol: "$",
});

// selected category
export const currentCategoryVar = makeVar("all");

export const taxVar = makeVar(25);

const cache = new InMemoryCache({
	typePolicies: {
		Product: {
			fields: {
				isInCart: {
					read(_, { readField }) {
						const productId = readField("id");

						const product = cartProductsVar().some(
							(product) => product.productId === productId
						);
						return product;
					},
				},
				setAttrs: {
					read(setAttrs = [], { readField }) {
						const defs = [];
						if (setAttrs.length === 0) {
							readField("attributes")?.map((ref) => {
								const id = ref.name;
								const value = readField("items", ref)[0].__ref.replace(
									"Attribute:",
									""
								);

								return defs.push({ attrId: id, attrValue: value });
							});
							return defs;
						} else {
							return setAttrs;
						}
					},
					merge(setAttrs = [], incoming) {
						return incoming;
					},
				},
				inCartQuantity: {
					read(quantity = 0) {
						return quantity;
					},
				},
			},
		},
		Currency: {
			fields: {
				selected: {
					read(_, { readField }) {
						const label = readField("label");
						return selectedCurrencyVar() === label;
					},
				},
			},
		},
		Query: {
			fields: {
				cart: {
					read() {
						return cartProductsVar();
					},
				},
			},
		},
	},
});

export const client = new ApolloClient({
	uri: "http://localhost:4000",
	cache: cache,
});
