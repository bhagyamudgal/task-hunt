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
        @media only screen and (max-width: 655px) {
          .label {
            margin-right:20px;
          }
        }
      `}</style>
    </>
  );
}

export default Label;
