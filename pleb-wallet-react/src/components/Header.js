import React from "react";


const Header = ({price}) => {
    return (
        <header>
            <h2>BTC/USD</h2>
            <h1>${price}</h1>
        </header>
    )
}

export default Header