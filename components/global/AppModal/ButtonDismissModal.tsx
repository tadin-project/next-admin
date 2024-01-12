type ButtonDismissModalProps = {
  children?: React.ReactNode;
};

const ButtonDismissModal = ({
  children = "Close",
}: ButtonDismissModalProps) => {
  return (
    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
      {children}
    </button>
  );
};

export default ButtonDismissModal;
