import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { loginSuccess } from "../../store/authSlice";
import { useNavigate, Link } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/firebase";
import { Eye, EyeOff } from "lucide-react";
import Button from "../../components/ui/Button";

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string; confirmPassword: string }) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, values.email, values.password);
      dispatch(loginSuccess({ id: cred.user.uid, email: cred.user.email ?? values.email }));
      navigate("/");
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="ag-form-wrapper">
      <h2 className="ag-form__title">Create account</h2>
      <p className="ag-form__subtitle">Sign up to get started</p>

      <Formik initialValues={{ email: "", password: "", confirmPassword: "" }} validationSchema={schema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="ag-form">
            <div className="ag-field">
              <label className="ag-field__label" htmlFor="reg-email">Email</label>
              <Field id="reg-email" name="email" type="email" placeholder="you@example.com" className="ag-field__input" />
              <ErrorMessage name="email" component="div" className="ag-field__error" />
            </div>

            <div className="ag-field">
              <label className="ag-field__label" htmlFor="reg-password">Password</label>
              <div className="ag-field__password">
                <Field id="reg-password" name="password" type={showPassword ? "text" : "password"} placeholder="Create password" className="ag-field__input" />
                <button type="button" className="ag-field__toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="ag-field__error" />
            </div>

            <div className="ag-field">
              <label className="ag-field__label" htmlFor="reg-confirm">Confirm password</label>
              <div className="ag-field__password">
                <Field id="reg-confirm" name="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="Confirm password" className="ag-field__input" />
                <button type="button" className="ag-field__toggle" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="ag-field__error" />
            </div>

            <Button type="submit" loading={isSubmitting}>Create account</Button>
          </Form>
        )}
      </Formik>

      <p className="ag-form__footer">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}
