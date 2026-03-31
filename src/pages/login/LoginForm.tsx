import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { loginSuccess } from "../../store/authSlice";
import { useNavigate, Link } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/firebase";
import { Eye, EyeOff } from "lucide-react";
import Button from "../../components/ui/Button";

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, values.email, values.password);
      dispatch(loginSuccess({ id: cred.user.uid, email: cred.user.email ?? values.email }));
      navigate("/");
    } catch {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="ag-form-wrapper">
      <h2 className="ag-form__title">Sign in</h2>
      <p className="ag-form__subtitle">Enter your credentials to continue</p>

      <Formik initialValues={{ email: "", password: "" }} validationSchema={schema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="ag-form">
            <div className="ag-field">
              <label className="ag-field__label" htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" placeholder="you@example.com" className="ag-field__input" />
              <ErrorMessage name="email" component="div" className="ag-field__error" />
            </div>

            <div className="ag-field">
              <label className="ag-field__label" htmlFor="password">Password</label>
              <div className="ag-field__password">
                <Field id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter password" className="ag-field__input" />
                <button type="button" className="ag-field__toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="ag-field__error" />
            </div>

            <Button type="submit" loading={isSubmitting}>Sign in</Button>
          </Form>
        )}
      </Formik>

      <p className="ag-form__footer">
        Don't have an account? <Link to="/register">Create one</Link>
      </p>
    </div>
  );
}
