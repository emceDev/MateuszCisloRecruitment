import { PureComponent } from "react";
import { Link } from "react-router-dom";
import Categories from "../Components/Categories";
import CurrencySwitcher from "../Components/CurrencySwitcher";
import navbarLogo from "../images/logoTransparent.png";
import Cart from "./Cart";

class Navbar extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { cartVisible: false };
	}
	render() {
		return (
			<div className="Navbar">
				<Categories />
				<Link to={`/`}>
					<img src={navbarLogo} alt="logo" />
				</Link>

				<div className="NavbarRight">
					<CurrencySwitcher />

					<Cart
						myBag={true}
						visible={this.state.cartVisible}
						client={this.props.client}
					/>
				</div>
			</div>
		);
	}
}

export default Navbar;
