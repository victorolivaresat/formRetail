//import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ConfirmationModal = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmación de Validación</Modal.Title>
      </Modal.Header>
      <Modal.Body>¿Estás seguro que deseas cambiar el estado a Validado?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;
