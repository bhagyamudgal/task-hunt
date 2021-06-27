import React from "react";

function FormButton(props) {
  return (
    <>
      <button className="form_button" type={props.type}>
        {props.text}
      </button>
      <style jsx>{`
        .form_button {
          width: 30%;
          height: 46px;
          background-color: var(--white);
          font-family: Poppins;
          font-style: normal;
          font-weight: normal;
          font-size: 22px;
          border: none;
          margin: auto;
          user-select: none;
        }
        .form_button:hover {
          background-color: lightgreen;
        }
      `}</style>
    </>
  );
}

export default FormButton;
