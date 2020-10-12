import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import React from 'react';

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