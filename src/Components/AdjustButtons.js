import { Component } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import { cartItemsVar, currentlyModified } from "../apolloState/client";

const GET_PRODUCT_ATTRS = gql`
	query getAttrs($pid: String!) {
		product(id: $pid) {
			setAttrs @client {
				attrId
				attrValue
			}
		}
	}
`;
const selectAttributes = (Component) => {
	return function WrappedComponent(props) {
		const getAttrs = useQuery(GET_PRODUCT_ATTRS, {
			variables: { pid: props.productId },
		});
		const [attrs, setAttrs] = useState(null);

		useEffect(() => {
			if (getAttrs.data === undefined) {
			} else {
				setAttrs(getAttrs.data.product.setAttrs);
			}
		}, [getAttrs]);

		function handleWrite(data) {
			return props.client.writeFragment({
				id: "Product:" + props.productId,
				fragment: gql`
					fragment Prod on Product {
						setAttrs {
							attrId
							attrValue
						}
					}
				`,
				data: { setAttrs: data },
			});
		}

		const modify = (attrId, attrValue) => {
			let nA = [];
			attrs.map((attr) =>
				attr.attrId === attrId
					? nA.push({ attrId: attrId, attrValue: attrValue })
					: nA.push(attr)
			);
			return handleWrite(nA);
		};

		if (attrs !== null) {
			return (
				<Component
					{...props}
					setAttrs={attrs}
					modify={(prodId, attrId, attrValue) => {
						modify(prodId, attrId, attrValue);
					}}
				/>
			);
		} else {
			return <p>loading attributes</p>;
		}
	};
};

class AdjustButtons extends Component {
	constructor(props) {
		super(props);
	}
	light(id, value, name) {
		let clName = name === "Color" ? "AttrBtnColor" : "AttrBtnText";
		const selected = this.props.setAttrs;
		let z = selected.some((a) => a.attrId === id && a.attrValue === value);

		return z ? clName + " active" : clName;
	}

	render() {
		return (
			<div className="AdjustButtons">
				{this.props.attributes
					? this.props.attributes.map((attr) => {
							return (
								<div
									key={attr.id + this.props.productId}
									className="AttributeContainer"
								>
									<div className="AttrName">{attr.name}</div>
									<div className="AttrBtns">
										{attr.items.map((item, index) => {
											return (
												<div
													onClick={() => this.props.modify(attr.id, item.value)}
													className={this.light(
														attr.id,
														item.value,
														attr.name,
														index
													)}
													key={item.value}
													id={item.value}
													style={{
														backgroundColor:
															attr.name === "Color" ? item.value : null,
													}}
												>
													{attr.name !== "Color" ? item.value : null}
												</div>
											);
										})}
									</div>
								</div>
							);
					  })
					: null}
			</div>
		);
	}
}

export default selectAttributes(AdjustButtons);
