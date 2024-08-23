import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

function AppTextInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });
  return (
    <TextField
      {...props}
      {...field}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
}

export default AppTextInput;
interface Props extends UseControllerProps {
  label: string;
}
