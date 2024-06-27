import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import agent from "../../App/API/agent";
import { useState } from "react";

function HomePage() {
  const [validationerror, setvalidationerror] = useState<String[]>([]);
  function getvalidationerror() {
    agent.testerrors
      .getvalidationerror()
      .then(() => console.log("shouldnt see this"))
      .catch((error) => setvalidationerror(error));
  }
  return (
    <Container>
      <Typography gutterBottom variant="h4">
        error for test puposes
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            agent.testerrors.get400error().catch((err) => console.log(err))
          }
        >
          test 400 error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.testerrors.get401error().catch((err) => console.log(err))
          }
        >
          test 401 error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.testerrors.get404error().catch((err) => console.log(err))
          }
        >
          test 404 error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.testerrors.get500error().catch((err) => console.log(err))
          }
        >
          test 500 error
        </Button>{" "}
        <Button variant="contained" onClick={getvalidationerror}>
          test validation error
        </Button>
      </ButtonGroup>
      {validationerror.length > 0 && (
        <Alert security="error">
          <AlertTitle>Validation Error</AlertTitle>
          <List>
            {validationerror.map((data) => (
              <ListItem>
                <ListItemText>{data}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}

export default HomePage;
