import Modal from "react-modal";
import PropTypes from "prop-types";

Modal.setAppElement("#root");

const CustomModal = ({ isOpen, onRequestClose, contentLabel, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      style={{
        overlay: {
          backgroundColor: "#2121211F",
        },
        content: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 2000,
          maxWidth: "672px",
          maxHeight: "574px",
          position: "absolute",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          border: "1px solid #ccc",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          padding: "50px",
          boxSizing: "border-box",
        },
      }}
    >
      {children}
    </Modal>
  );
};
CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Boolean și este necesar
  onRequestClose: PropTypes.func.isRequired, // Funcție și este necesară
  contentLabel: PropTypes.string.isRequired, // String și este necesar
  children: PropTypes.node, // Poate fi orice nod React, nu este marcat ca necesar
};
export default CustomModal;
