import React, { useState } from "react";
import styled from "styled-components";


const InputWrapper = styled.div`
  display: flex;

  & > .phone-text {
    border-left: 1px solid #dedede;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 0.84rem;
    line-height: 1rem;
    padding-left: 10px;
  }

  & > input:-webkit-autofill {
    background: transparent;
  }

  & > input {
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border-left: none;
  }
`


const PhoneInput = ({ labelName, changeHandler, value }) => {
  const [input, setInput] = useState(value);



  const handleChange = (event) => {
    const { value } = event.target;
    const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');

    if(formattedValue.length <= 12) {
      changeHandler({ target: { value: formattedValue.replace(/\s/g, ''), name: event.target.name } });
      setInput(formattedValue);
    }
  }
 
  return (
    <>
    <label>{ labelName }</label>
    <InputWrapper>
      <span className="phone-text">+998</span>
      <input
        type="text"
        id="telephone"
        name="number"
        onChange={handleChange}
        value={input}
      />
    </InputWrapper>
    </>
  );
}

export default PhoneInput;