type ModalProps = {
  id: string;
  isCentered?: boolean;
  isScrollable?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const Modal = ({
  id,
  className,
  isCentered = false,
  isScrollable = false,
  children,
}: ModalProps) => {
  return (
    <div className={"modal fade" + (className ? " " + className : "")} id={id}>
      <div
        className={
          "modal-dialog " +
          (isCentered ? "modal-dialog-centered" : "") +
          (isScrollable ? "modal-dialog-scrollable" : "")
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
