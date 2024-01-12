type BodyProps = {
  children?: React.ReactNode;
};

const Body = ({ children }: BodyProps) => {
  return <div className="modal-body">{children}</div>;
};

export default Body;
