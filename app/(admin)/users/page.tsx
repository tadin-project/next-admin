import { UserScreen } from "@/components/screens";
import { Metadata } from "next";

const pageTitle: string = "Master User";

export const metadata: Metadata = {
  title: pageTitle,
};

const UserPage = () => {
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">{pageTitle}</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">{pageTitle}</li>
      </ol>
      <UserScreen pageTitle={pageTitle} />
    </div>
  );
};

export default UserPage;
