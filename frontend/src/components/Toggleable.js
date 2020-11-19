import React, { useState } from "react";

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideComponent = { display: visible ? "none" : " " };
  const showComponent = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible)
  }
return ( 
    <div>
        <div style={hideComponent}>
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showComponent}>
          {props.children}
        <button onClick={toggleVisibility}>cancel</button>
        </div>
    </div>
)

};

export default Toggleable;
