type FooterProps = {
  children?: React.ReactNode;
};

const Footer = ({ children }: FooterProps) => {
  return <div className="modal-footer">{children}</div>;
};

export default Footer;
