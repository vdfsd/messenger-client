import { RegistrationForm } from "../components/registrationForm/RegistrationForm"
import { Logo } from "../components/logo/Logo"
import { Link } from "react-router-dom"
export const Registration = () => {
  return (
    <div className="container py-32">
      <div className="bg-indigo-950 max-w-[500px] px-10 pb-16 pt-8 shadow-2xl rounded-xl mx-auto shadow-indigo-600">
        <Logo />
        <RegistrationForm />
        <p className="py-4 text-indigo-800 text-center">
          Already an account?
          <Link
            to={`login`}
            className="text-slate-200  hover:text-slate-400 transition duration-200 mx-2"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
