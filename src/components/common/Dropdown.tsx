import * as React from "react";
import Select, { SelectProps, selectClasses } from "@mui/base/Select";
import Option, { optionClasses } from "@mui/base/Option";
import Popper from "@mui/base/Popper";
import { styled } from "@mui/system";

interface Items {
  _id: number | string;
  name: string;
}

interface Props {
  items: Items[];
  purpose: "small" | "middle" | "large";
  handleSelect: any;
}

const Dropdown: React.FC<Props> = ({ items, purpose, dropdownSelect }) => {
  const [selected, setSelected] = React.useState<Items | null>(items[0]);

  dropdownSelect(selected);

  return (
    <div>
      <CustomSelect
        value={selected?.name}
        // @ts-expect-error
        onChange={(event, newValue) => setSelected(newValue)}
        purpose={purpose}
      >
        {items.map((item) => (
          <StyledOption key={item._id} value={item.name}>
            {item.name}
          </StyledOption>
        ))}
      </CustomSelect>
    </div>
  );
};

function CustomSelect<TValue extends {}, Multiple extends boolean = false>(
  props: SelectProps<TValue, Multiple> & { purpose?: string }
) {
  const slots: SelectProps<TValue, Multiple>["slots"] = {
    root: StyledButton,
    listbox: (listboxProps) => (
      <StyledListbox {...listboxProps} purpose={props.purpose} />
    ),
    popper: StyledPopper,
    ...props.slots,
  };

  return <Select {...props} slots={slots} />;
}

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  400: "#8c959f",
  900: "#24292f",
};

const StyledButton = styled("button")<{ purpose?: string }>(
  ({ purpose }) => `
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 18px);
  padding: 12px;
  border-radius: 12px;
  text-align: left;
  line-height: 1.5;
  background:  #fff;
  border: 1px solid ${grey[200]};
  color: ${grey[900]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &.${selectClasses.focusVisible} {
    border-color: #5F30E2;
    outline: 3px solid #5F30E2;
  }

  &.${selectClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }

  ${
    purpose === "small"
      ? `min-width: 105px;`
      : purpose === "middle"
      ? `min-width: 240px;`
      : `min-width: 304px;`
  }
  `
);

const StyledListbox = styled("ul")<{ purpose?: string }>(
  ({ purpose }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 3px 0;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: #fff;
  border: 1px solid ${grey[200]};
  color: ${grey[900]};
  box-shadow: 0px 4px 30px ${grey[200]};
  ${
    purpose === "small"
      ? `min-width: 105px;`
      : purpose === "middle"
      ? `min-width: 240px;`
      : `min-width: 304px;`
  }
  `
);

const StyledOption = styled(Option)(`
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: #EFEAFC;
    color: 28293D;
  }

  &.${optionClasses.highlighted} {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: #EFEAFC;
    color: 28293D;
  }

  &.${optionClasses.disabled} {
    color: ${grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }
  `);

const StyledPopper = styled(Popper)`
  z-index: 1;
`;

export default Dropdown;
