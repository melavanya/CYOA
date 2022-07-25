import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

export default function CommentForm(props) {
    const [name, setName] = React.useState("");
    const [comments, setComments] = React.useState("");
    const [isNameInvalid, setNameInValid] = React.useState(false);
    const [isCommentsInvalid, setCommentsInValid] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        validateForm();
        if (name !== "" && comments !== "") {
            props.handleSubmit({ name, message: comments });
            setName("");
            setComments("");
        }
    };

    const validateForm = () => {
        name !== "" ? setNameInValid(false) : setNameInValid(true);
        comments !== "" ? setCommentsInValid(false) : setCommentsInValid(true);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>

                <Typography component="h1" variant="h5">Leave your Comments Below</Typography>

                <Box component="form" onSubmit={handleSubmit}>

                    <FormControl error={isNameInvalid} variant="filled" fullWidth>
                        <TextField
                            error={isNameInvalid}
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            value={name}
                            autoFocus
                            inputProps={{
                                maxLength: 25
                            }}
                            onChange={(e) => {
                                setName(e.target.value);
                                setNameInValid(false);
                            }}
                        />
                        {isNameInvalid && (<FormHelperText id="name-error-text"> *Required </FormHelperText>)}
                    </FormControl>
                    <FormControl error={isCommentsInvalid} variant="filled" fullWidth>
                        <TextField
                            margin="normal"
                            error={isCommentsInvalid}
                            fullWidth
                            name="comments"
                            label="Comments"
                            id="comments"
                            value={comments}
                            rows={4}
                            multiline
                            inputProps={{
                                maxLength: 250
                            }}
                            onChange={(e) => {
                                setComments(e.target.value);
                                setCommentsInValid(false);
                            }}
                        />
                        {isCommentsInvalid && (<FormHelperText id="comments-error-text">*Required</FormHelperText>)}
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isNameInvalid || isCommentsInvalid}>
                        Post
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
