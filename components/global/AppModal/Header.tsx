type HeaderProps = {
  title?: String;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="modal-header">
      <h1 className="modal-title fs-5">{title}</h1>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Header;
