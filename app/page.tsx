"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError, AxiosResponse } from "axios";

import { AuthLayout } from "@/components/templates";
import { AppRoutes } from "@/constants";
import { TemplateResponse } from "@/types/api/TemplateResponse";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(AppRoutes.api.login, {
        username,
        password,
      })
      .then((res: AxiosResponse) => {
        const data: TemplateResponse = res.data;
        if (data.error) {
          throw new Error(data.error);
        } else {
          toast.success("Berhasil login");
          router.push(AppRoutes.dashboard);
        }
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
        setIsLoading(false);
      });
  };

  return (
    <AuthLayout>
      <main>
        <div className="container">
          <div className="row justify-content-center my-5">
            <div className="col-lg-5">
              <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-header">
                  <h3 className="text-center font-weight-light my-4">Login</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={(e) => submitHandler(e)}>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Masukkan username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AuthLayout>
  );
};

export default LoginPage;
