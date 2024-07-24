import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

function RadioButtonGroup({ sortoption, onchange, selectedvalue }: props) {
  return (
    <FormControl>
      <RadioGroup onChange={onchange} value={selectedvalue}>
        {sortoption.map(({ value, lable }) => (
          <FormControlLabel
            value={value}
            control={<Radio />}
            label={lable}
            key={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButtonGroup;
interface props {
  sortoption: any[];
  onchange: (event: any) => void;
  selectedvalue: string;
}
