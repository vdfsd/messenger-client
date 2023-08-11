import logo from "../../assets/logo-bg.png"
export const Logo = () => {
  return (
    <div className="mb-12 w-auto mx-auto">
      <img width={180} height={180} src={logo} alt={logo} className="mx-auto" />
      <h1 className="text-[48px] leading-none text-indigo-700 font-semibold mt-[-20px] text-center mx-auto">
        MSW
      </h1>
    </div>
  )
}
