import { FormControlLabel, Checkbox } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

function AppCheckBox(props: Props) {
  const { field } = useController({ ...props, defaultValue: false });
  return (
    <FormControlLabel
      control={<Checkbox {...field} checked={field.value} color="secondary" />}
      label={props.label}
    ></FormControlLabel>
  );
}

export default AppCheckBox;
interface Props extends UseControllerProps {
  label: string;
}
