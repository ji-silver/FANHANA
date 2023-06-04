import React from "react";
import styled from "styled-components";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}
const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  appearance: none;
  border: 1px solid #8f90a6;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
  position: relative;

  &:checked {
    background-color: #5f30e2;
    border-color: #5f30e2;
  }

  &:checked::after {
    content: "";
    display: block;
    width: 6px;
    height: 4px;
    border-top: 2px solid rgb(255, 255, 255);
    border-right: 2px solid rgb(255, 255, 255);
    border-image: initial;
    border-left: none;
    border-bottom: none;
    transform: rotate(130deg);
    position: absolute;
    top: 3px;
    left: 3px;
  }
`;

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    onChange(newChecked);
  };

  return (
    <CheckboxInput type="checkbox" checked={checked} onChange={handleChange} />
  );
};

export default Checkbox;

/*사용예시
const [isChecked, setIsChecked] = useState(false);
const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
};

<Checkbox checked={isChecked} onChange={handleCheckboxChange} />
*/
