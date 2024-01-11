"use client";
import { AppRoutes } from "@/constants";
import { faAdd, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type UserScreenProps = {
  pageTitle: string;
};

const UserScreen = ({ pageTitle }: UserScreenProps) => {
  const [elModalForm, setElModalForm] = useState<any>();
  // form
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userStatus, setUserStatus] = useState<string>("false");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const bootstrap = require("bootstrap");
    setElModalForm(() => new bootstrap.Modal("#modalForm"));
  }, []);

  const showForm = () => {
    elModalForm!.show();
    fnResetForm();
  };

  const fnResetForm = () => {
    setUsername("");
    setPassword("");
    setUserStatus("false");
  };

  const fnSave = () => {
    setIsLoading(() => true);
    axios
      .post(AppRoutes.api.users, {
        username,
        password,
        user_status: userStatus,
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
          return;
        }

        toast.success("Data berhasil disimpan!");
        elModalForm!.hide();
      })
      .catch((err: Error | AxiosError) => {
        let errorMessage = "Error";
        if (axios.isAxiosError(err)) {
          if (err.response) {
            errorMessage = err.response.data.error;
            if (!errorMessage) {
              errorMessage = err.response.statusText;
            }
          }
        } else {
          errorMessage = err.message;
        }
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsLoading(() => false);
      });
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
            <div className="modal-body">
              <form>
                <div className="form-group mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setUsername(e.currentTarget.value)}
                    value={username}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    value={password}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Status</label>
                  <select
                    className="form-control"
                    onChange={(e) => setUserStatus(e.target.value)}
                    value={userStatus}
                  >
                    <option value="true">Aktif</option>
                    <option value="false">Non Aktif</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={isLoading}
                onClick={fnSave}
              >
                {!isLoading ? "Simpan" : "Loading..."}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserScreen;
