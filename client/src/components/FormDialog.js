import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const FormDialog = ({
  title, show, closeModal, handleSubmit, children,
}) => (
  <Dialog open={show}>
    <form onSubmit={handleSubmit}>
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Cancel
        </Button>
        <Button color="primary" type="submit">
          {title}
        </Button>
      </DialogActions>
    </form>
  </Dialog>
);

FormDialog.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

export default FormDialog;
