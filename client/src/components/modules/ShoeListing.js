import React from "react";

/**
 * Component to render a single shoe listing
 *
 * Proptypes
 * @param {string} shoe_name
 * @param {string} color
 * @param {number} release
 * @param {number} price
 * @param {string} url
 */
const ShoeListing = (props) => {
    return (
        <div>
            <Link to={props.url}> //want to link to an external page?
                <div className="u-bold">{props.shoe_name}</div>
                <div>{props.price}</div>
            </Link>
        </div>
    );
};

export default ShoeListing;
