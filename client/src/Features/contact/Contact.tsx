import { Button, ButtonGroup, Typography } from "@mui/material";
import {
  useappdispatch,
  useappselectore,
} from "../../App/store/configureStore";
import { decrement, increment } from "./counterslice";
function Contact() {
  const dispatch = useappdispatch();
  const { data, title } = useappselectore((state) => state.counterr);
  return (
    <>
      <Typography variant="h2"> {data}</Typography>
      <Typography variant="h6"> {title}</Typography>
      <ButtonGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(decrement(5))}
        >
          Increment
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(increment(1))}
        >
          Decrement
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(increment(5))}
        >
          incrent by 5
        </Button>
      </ButtonGroup>
    </>
  );
}

export default Contact;
