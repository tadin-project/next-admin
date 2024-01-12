"use client";
import { AppRoutes } from "@/constants";
import {
  faAdd,
  faPencil,
  faTable,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AppModal from "../../global/AppModal";
import { UserType } from "@/types/api";
import { revalidatePath } from "next/cache";

type UserScreenProps = {
  pageTitle: string;
};

const UserScreen = ({ pageTitle }: UserScreenProps) => {
  const router = useRouter();
  const [elModalForm, setElModalForm] = useState<any>();
  // form
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userStatus, setUserStatus] = useState<string>("false");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGetData, setIsGetData] = useState<boolean>(false);
  const [data, setData] = useState<UserType[]>([]);

  const fnLoadTbl = () => {
    setIsGetData(() => true);
    // revalidatePath(AppRoutes.users);
  };

  const fnResetForm = () => {
    setUsername("");
    setPassword("");
    setUserStatus("false");
  };

  const showForm = () => {
    elModalForm!.show();
    fnResetForm();
    fnLoadTbl();
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

        fnLoadTbl();
        fnResetForm();
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

  const getData = async () => {
    axios
      .get(AppRoutes.api.users)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
          return;
        }

        setData(() => res.data.data);
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
      });
    setIsLoading(() => false);
  };

  useEffect(() => {
    const bootstrap = require("bootstrap");
    setElModalForm(() => {
      const initModalForm: bootstrap.Modal = new bootstrap.Modal("#modalForm");

      return initModalForm;
    });

    fnLoadTbl();
  }, []);

  useEffect(() => {
    if (isGetData) {
      console.log("ok");
      getData();
    }
  }, [isGetData, setIsGetData]);

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
        <div className="card-body">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">Username</th>
                <th className="text-center">Pegawai</th>
                <th className="text-center">Status</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((i: UserType, index: number) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>{i.username}</td>
                    <td>{i.pegawai_nama}</td>
                    <td className="text-center">
                      <span
                        className={
                          "badge bg-" + (i.user_status ? "success" : "danger")
                        }
                      >
                        {i.user_status ? "" : "Non-"}Aktif
                      </span>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-success m-1">
                        <FontAwesomeIcon icon={faPencil} />
                      </button>
                      <button className="btn btn-sm btn-danger m-1">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center" colSpan={5}>
                    Tidak Ada Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AppModal.Modal id="modalForm">
        <AppModal.Content>
          <AppModal.Header title={"Form " + pageTitle} />
          <AppModal.Body>
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
                  <option value="false">Non-Aktif</option>
                </select>
              </div>
            </form>
          </AppModal.Body>
          <AppModal.Footer>
            <AppModal.ButtonDismissModal />
            <button
              type="button"
              className="btn btn-primary"
              disabled={isLoading}
              onClick={fnSave}
            >
              {!isLoading ? "Simpan" : "Loading..."}
            </button>
          </AppModal.Footer>
        </AppModal.Content>
      </AppModal.Modal>
    </div>
  );
};

export default UserScreen;
