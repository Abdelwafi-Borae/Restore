import { Container, Paper, Typography } from "@mui/material";

function ServerError() {
  return (
    <Container component={Paper}>
      <Typography variant="h5" gutterBottom>
        server error
      </Typography>
    </Container>
  );
}

export default ServerError;
