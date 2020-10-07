import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const SpinnerDialog = (props:any) => {
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
        aria-labelledby="spinner-dialog"
        >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default SpinnerDialog;