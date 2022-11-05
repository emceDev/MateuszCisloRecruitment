import { PureComponent } from "react";

class Imgs extends PureComponent {
	state = { count: 0 };
	render() {
		return (
			<div className="Imgs">
				{this.props.product.gallery.map((image, index) => {
					return (
						<div key={index}>
							<img
								alt="galleryImg"
								src={image}
								id={index}
								onClick={(e) => this.props.select(e.target.id)}
							></img>
						</div>
					);
				})}
			</div>
		);
	}
}
export default Imgs;
