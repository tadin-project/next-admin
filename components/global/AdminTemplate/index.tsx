type AdminTemplateProps = {
  pageTitle?: string;
  children?: React.ReactNode;
};

const AdminTemplate = ({ pageTitle, children }: AdminTemplateProps) => {
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">{pageTitle}</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">{pageTitle}</li>
      </ol>
      {children}
    </div>
  );
};

export default AdminTemplate;
