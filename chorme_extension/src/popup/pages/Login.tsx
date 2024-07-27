import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import { loginExten } from "../config/services/apiService";

const HOST_FE = process.env.HOST_FE;

const Login = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation(["main"]);
  const navigate = useNavigate();
  const { loginAuth } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required(t("main:SignIn.checkEmailTL")),
      password: Yup.string().required(t("main:SignIn.passwordTL")),
    }),
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      try {
        const response = await loginExten(data);
        if (response.status === "success") {
          loginAuth(response);
          console.log("Login successful", response);
          navigate("/shopee");
          // window
          // window.location.href =" http://localhost:5173/profile"
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <section className="w-[600px] h-[600px] flex justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen w-[350px] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {t("main:SignIn.titleTL")}
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("main:SignIn.passwordTL")}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      {t("main:SignIn.saveLoginTL")}
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-full">
                  <span onClick={() => changeLanguage("en")}>
                    <img
                      className="h-[30px] w-[60px] rounded-md"
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg"
                      alt="English"
                    />
                  </span>
                  <p className="px-5">|</p>
                  <span onClick={() => changeLanguage("vi")}>
                    <img
                      className="h-[30px] w-[60px] rounded-md"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/225px-Flag_of_Vietnam.svg.png"
                      alt="Vietnamese"
                    />
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                {t("main:SignIn.loginTL")}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {t("main:SignIn.cheAccountTL")} {"  "}
                <a
                  href={"http://localhost:5173/register"}
                  target="_blank"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {t("main:SignIn.registerTL")}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
