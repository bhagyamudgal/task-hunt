import React from "react";
import { useState, useEffect} from "react";

function Input(props) {
  const [width, setWidth] = useState(props.width);
  const [height, setHeight] = useState(props.height);
  const [type, setType] = useState(props.type);
  const [id, setId] = useState(props.id);
  const [isRequired, setisRequired] = useState(props.required);
  const [value, setValue] = useState("");

  function valueHandler(event) {
    setValue(event.target.value);
  }

  useEffect(() => {
    props.value(value);
    props.reset && setValue("");
  }, [value, props]);

  return (
    <>
      {isRequired ? (
        <input
          id={id}
          name={id}
          className="input"
          type={type}
          onChange={valueHandler}
          value={value}
          required
        />
      ) : (
        <input
          id={id}
          name={id}
          className="input"
          type={type}
          onChange={valueHandler}
          value={value}
        />
      )}
      <style jsx>{`
        .input {
          width: ${width === undefined ? "100%" : props.width};
          height: ${height};
          background-color: var(--pureWhite);
          border: none;
          outline: none;
          font-family: Poppins;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
        }
        .input:focus {
          border: 2px solid black;
        }
      `}</style>
    </>
  );
}

export default Input;
