import React from "react";

function Label(props) {
  return (
    <>
      <label htmlFor={`${props.for}`} className="label">
        {props.text}
      </label>
      <style jsx>{`
        .label {
          font-family: Poppins;
          font-style: normal;
          font-weight: normal;
          font-size: 22px;
          color: var(--pureWhite);
        }
      `}</style>
    </>
  );
}

export default Label;
