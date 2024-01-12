type ContentProps = {
  children?: React.ReactNode;
};

const Content = ({ children }: ContentProps) => {
  return <div className="modal-content">{children}</div>;
};

export default Content;
