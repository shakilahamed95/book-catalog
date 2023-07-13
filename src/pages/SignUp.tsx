import { Link } from "react-router-dom";
import { SignUpForm } from "../components/SignUpForm";

export default function SignUp() {
  return (
    <div className="h-[calc(100vh-290px)] flex items-center justify-center">
      <div>
        <h3 className="text-2xl font-semibold text-center mb-3">
          Create a new account
        </h3>
        <SignUpForm />
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
