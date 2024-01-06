"use client";
import { faAdd, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

type UserScreenProps = {
  pageTitle: string;
};

const UserScreen = ({ pageTitle }: UserScreenProps) => {
  const [elModalForm, setElModalForm] = useState<any>();

  useEffect(() => {
    const bootstrap = require("bootstrap");
    setElModalForm(() => new bootstrap.Modal("#modalForm"));
  }, []);

  const showForm = () => {
    elModalForm!.show();
  };

  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">
          <div className="d-flex align-items-center">
            <div>
              <FontAwesomeIcon icon={faTable} className="me-1" /> Data{" "}
              {pageTitle}
            </div>
            <div className="ms-auto d-flex">
              <button className="btn btn-sm btn-primary" onClick={showForm}>
                <FontAwesomeIcon icon={faAdd} /> Data
              </button>
            </div>
          </div>
        </div>
        <div className="card-body"></div>
      </div>
      <div className="modal fade" id="modalForm">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Modal title</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Ini adalah modal</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserScreen;
