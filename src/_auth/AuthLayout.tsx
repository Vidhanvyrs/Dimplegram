import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-col items-center justify-center flex-1 py-10">
            <Outlet />
          </section>
          <img
            src="/assets/images/sideimage1.png"
            alt="side-image"
            className="hidden object-cover w-1/2 h-screen bg-no-repeat xl:block"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
