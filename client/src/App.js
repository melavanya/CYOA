import * as React from "react";
import Box from "@mui/material/Box";
import CommentList from "./components/commentsList";
import CommentForm from "./components/commentForm";
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { config } from "./constants";


const saveComments = (request) => {
  return fetch(`${config.API_URL}/createcomment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
}

export default function App() {
  const [isSaved, setIsSaved] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [comment, setComment] = React.useState([]);

  const postComments = (data) => {
    saveComments(data)
      .then(res => res.json())
      .then(result => {
        setComment(result)
        setIsSaved(true);
      })
      .catch((err) => {
        setIsError(true);
      })
  }

  return (
    <React.Fragment>
      {isSaved && <Alert variant="filled" onClose={() => setIsSaved(false)} severity="success">Thank you.Comments posted successfully.</Alert>}
      {isError && <Alert variant="filled" onClose={() => setIsError(false)} severity="error">Please try again later.</Alert>}

      <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: 200 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

          <Grid item xs={12} sm={5}>
            <CommentForm handleSubmit={postComments} />
          </Grid>

          <Grid item xs={12} sm={7}>
            <CommentList comment={comment} />
          </Grid>

        </Grid>
      </ Box>

    </React.Fragment>
  );
}