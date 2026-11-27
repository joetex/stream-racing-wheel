import React from "react";

import flatstore from "flatstore";
function Pedal(props) {
    let [axisValue] = flatstore.useWatch(props.id);
    let [invert] = flatstore.useWatch("invert/" + props.invertId);

    axisValue = axisValue || { value: 0 };

    let { value } = axisValue;

    let currentPos = props.downAmount * value * (invert ? 1 : -1);

    let wheelStyle = {
        width: "70px",
        position: "absolute",
        top: props.top + "px",
        left: props.left + "px",
        transform: "translateY(" + currentPos + "px)",
    };

    return <img alt="" style={wheelStyle} src={props.src} />;
}

export default Pedal;
