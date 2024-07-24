import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

function CheckBoxButton({ items, checked, onchange }: props) {
  const [checkeditems, setcheckeditems] = useState(checked || []);
  function handlechange(value: string) {
    const currentindex = checkeditems.findIndex((items) => items === value);
    let newchecked: string[] = [];
    if (currentindex === -1) newchecked = [...checkeditems, value];
    else newchecked = checkeditems.filter((items) => items !== value);
    setcheckeditems(newchecked);
    onchange(newchecked);
  }
  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={checkeditems.indexOf(item) !== -1}
              onClick={() => handlechange(item)}
            />
          }
          label={item}
          key={item}
        />
      ))}
    </FormGroup>
  );
}
interface props {
  items: string[];
  checked?: string[];
  onchange: (item: string[]) => void;
}
export default CheckBoxButton;
