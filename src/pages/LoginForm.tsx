import logo from "../../public/logo2.png";
import { AnimatePresence, motion } from "framer-motion";
import InputText from "../components/shared/Inputs/InputText";
import InputPassword from "../components/shared/Inputs/InputPassword";
import CustomButton from "../components/shared/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateEmail, validatePassword } from "../utils/validationUtils";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const fadeInOut = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  const handleValidation = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });

    return !emailError && !passwordError;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (handleValidation()) {
      navigate("/onboard");
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const emailError = validateEmail(value);
    setErrors((prev) => ({ ...prev, email: emailError }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const passwordError = validatePassword(value);
    setErrors((prev) => ({ ...prev, password: passwordError }));
  };

  return (
    <div className="min-h-screen w-full min-w-mobile flex flex-col items-center bg-background">
      <div className="h-64 flex flex-col items-center justify-evenly">
        <img src={logo} alt="logo 2" />
        <p className="text-text text-2xl font-medium">Bienvenido a Mindup</p>
      </div>
      <motion.form
        {...fadeInOut}
        className="flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <InputText
          name="Email *"
          placeholder="Ingrese su email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.div {...fadeInOut}>
              <p className="text-red-500 text-center">{errors.email}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <InputPassword
          name="Contraseña *"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        <AnimatePresence>
          {errors.password && (
            <motion.div {...fadeInOut}>
              <p className="text-red-500 text-center w-80">{errors.password}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <Link to="/forgotPassword">
          <p className="text-[#0a135d] text-sm font-medium text-end mt-2 underline">
            ¿Ha olvidado su contraseña?
          </p>
        </Link>

        <div className="h-36 flex flex-col items-center justify-evenly">
          <CustomButton title="Iniciar Sesión" appearance={true} type="submit" />
          <Link to="/register">
            <p className="text-text font-medium text-center">
              ¿Eres nuevo? Regístrate aquí
            </p>
          </Link>
        </div>
      </motion.form>
    </div>
  );
}

export default LoginForm;
