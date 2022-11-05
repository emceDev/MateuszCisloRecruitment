import { PureComponent } from "react";

class PNames extends PureComponent {
	state = {};
	render() {
		return (
			<div className="PNames">
				<div className="PName">{this.props.name}</div>
				{!this.props.myBag ? <div className="PId">{this.props.id}</div> : null}
			</div>
		);
	}
}

export default PNames;
