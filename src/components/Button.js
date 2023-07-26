import React from "react";

function Button(props) {
  let { action, title } = props;
  return (
    <button className="btn" onClick={action}>
      {title}
    </button>
  );
}

export default Button;
