import { Modal, Button } from "react-bootstrap";

const ModalConfirm = ({ handleDeleteConfirm, deleteVisit }) => {
  return (
    <>
      <Modal show={true} backdrop="static" keyboard={false}>
        <Modal.Body>Delete this visit ?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleDeleteConfirm({ id: null, toDelete: false })}
          >
            No
          </Button>
          <Button variant="primary" onClick={deleteVisit}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalConfirm;
