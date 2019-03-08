import React from 'react';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

/* eslint-disable */
const LoginPrompt = ({ show, close }) => (
  <Dialog open={show}>
    <DialogContent>
      <Typography color="error">Please Login Or Sign Up First</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={close} color="primary" data-test="cancel">
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
);

export default LoginPrompt;
