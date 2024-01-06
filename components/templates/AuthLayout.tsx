import styles from "@/styles/auth/login.module.css";

interface AuthLayoutType {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutType) => {
  return (
    <div className="bg-primary">
      <div className={styles.authContent}>{children}</div>
    </div>
  );
};

export default AuthLayout;
