import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { config } from "../constants";

const prevComments = [
  {
    id: 1000,
    name: "Masha",
    message:
      "Brunch this week? I'll be in the town this week. Let's grab a bite to eat.",
    person: "/static/images/avatar/5.jpg",
    created: "Wed Jul 20 2022"
  },
  {
    id: 1001,
    name: "Dan",
    message: "Birthday Gift - Do you have a suggestion for a good present for John?",
    person: "/static/images/avatar/1.jpg",
    created: "Wed Jul 20 2022"
  },
  {
    id: 1002,
    name: "Tom",
    message:
      "Recipe to try - Trying new BBQ recipe, I think this might be amazing.",
    person: "/static/images/avatar/2.jpg",
    created: "Wed Jul 20 2022"
  }
];

export default function CommentList(props) {
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    const getComments = async () => {
      const response = await fetch(`${config.API_URL}/getcomments`);
      const data = await response.json();
      const formattedComments = await data.map((comment) => (
        { ...comment, 
        person: "/static/images/avatar/5.jpg", 
        created: new Date(comment.created).toDateString(),
        name: comment.name[0].toUpperCase() + comment.name.substring(1),
        message: comment.message[0].toUpperCase() + comment.message.substring(1)
       }
      ));
      setComments([...formattedComments.reverse(), ...prevComments]);
    }
    getComments()
      .catch(() => setComments(prevComments));
  }, [props.comment]);

  return (
    <Paper sx={{ pb: "50px", pr: "20px", margin: 4 }} style={{ maxHeight: 500, overflow: 'auto' }}>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={{
          p: 2, pb: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
        Comments
      </Typography>
      <List sx={{ mb: 2 }}>
        {comments.map(({ id, name, message, person, created }) => (
          <React.Fragment key={id}>

            {(id === comments[0].id && id !== 1000) && (
              <ListSubheader sx={{ bgcolor: "background.paper" }}>
                Recent Comments
              </ListSubheader>
            )}

            {id === 1000 && (
              <ListSubheader sx={{ bgcolor: "background.paper" }}>
                Older Comments
              </ListSubheader>
            )}

            <ListItem button>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={person} />
              </ListItemAvatar>
              <ListItemText primary={name} secondary={message}>
              </ListItemText>
              <Chip label={created} />
            </ListItem>

            <Divider variant="inset" component="li" />

          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}
