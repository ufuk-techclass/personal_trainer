import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Addtraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    activity: "",
    date: "",
    duration: "",
    customername: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = event => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const addTraining = () => {
    props.saveTraining(training);
    handleClose();
  };

  return (
    <div>
      <Button
        style={{ margin: 10 }}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Add Training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => handleInputChange(e)}
            label="activity"
            fullWidth
          />
          <TextField
            margin="dense"
            name="date"
            value={training.date}
            onChange={e => handleInputChange(e)}
            label="date"
            fullWidth
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={e => handleInputChange(e)}
            label="duration"
            fullWidth
          />
          <TextField
            margin="dense"
            name="customername"
            value={training.customername}
            onChange={e => handleInputChange(e)}
            label="customername"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTraining} color="primary">
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
