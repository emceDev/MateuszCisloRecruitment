import { PureComponent } from "react";
import { selectAttributes } from "../HOC/selectAttributes";

class AdjustButtons extends PureComponent {
	light(id, value, displayValue) {
		const className = id === "Color" ? "AttrBtnColor" : "AttrBtnText";
		const selected = this.props.setAttrs;
		const fullClassName = selected.some(
			(a) =>
				a.attrId === id &&
				(a.attrValue === value || a.attrValue === displayValue)
		);
		return fullClassName ? className + " active" : className;
	}

	render() {
		return (
			<div className="AdjustButtons">
				{this.props.attributes
					? this.props.attributes.map((attr) => {
							return (
								<div
									key={attr.name + this.props.productId}
									className="AttributeContainer"
								>
									<div className="AttrName">{attr.name}</div>
									<div className="AttrBtns">
										{attr.items.map((item, index) => {
											return (
												<div
													onClick={() =>
														this.props.active === false
															? null
															: this.props.modify(attr.name, item.value)
													}
													className={this.light(
														attr.name,
														item.value,
														item.displayValue
													)}
													key={item.id}
													id={item.id}
												>
													{attr.name !== "Color" ? (
														item.value
													) : (
														<div
															style={{
																backgroundColor: item.value,
															}}
														></div>
													)}
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
