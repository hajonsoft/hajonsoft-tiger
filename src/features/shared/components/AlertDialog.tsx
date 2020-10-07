import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = (props: any) => {
  const { title, children, open, setOpen, onClose } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog">
      <DialogTitle id="alert-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {props.showOk ?
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              onClose();
            }}
            color="default">Ok
          </Button>
          :
          <><Button
            variant="contained"
            onClick={() => {
              props.formikProps.setFieldValue('is_opt', true);
              setOpen(false);
            }}
            color="primary">Agree
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              props.formikProps.setFieldValue('is_opt', false);
              setOpen(false);
            }}
            color="default">Disagree
          </Button></>
        }
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;