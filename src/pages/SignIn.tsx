import { LoginForm } from "../components/LoginForm";
import { Link } from "react-router-dom";
export default function SignIn() {
  return (
    <div className="h-[calc(100vh-290px)] flex items-center justify-center">
      <div>
        <h3 className="text-2xl font-semibold text-center mb-3">
          Login to your account
        </h3>
        <LoginForm />
        <p className="px-8 text-center text-sm mt-5">
          By clicking continue, you agree to our{" "}
          <Link
            to="/"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
