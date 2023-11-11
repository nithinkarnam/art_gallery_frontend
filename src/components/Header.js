// Header.js
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useCookies } from "react-cookie";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  const [pages, setPages] = useState([
    { name: "ART EXHIBITION", to: "/", current: false },
    { name: "ART EXPLORA", to: "/category", current: false },
    { name: "UPLOAD ART", to: "/uploadpost", current: false },
  ]);

  const handlePageClick = (index) => {
    const updatedPages = pages.map((page, i) => {
      return { ...page, current: i === index };
    });
    setPages(updatedPages);
  };

  const { isLoggedIn, setIsLoggedIn, setUser, user } = useAuth();
  const [cookie, setCookie] = useCookies(["connect.sid"]);

  useEffect(() => {
    if (user) {
      setUser(false);
    } else if (!user) {
      setUser(true);
    }
  }, []);

  const handleLogout = () => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() - 1);
    setIsLoggedIn(false);
    setCookie("token", null, { expires: expirationDate });
  };

  return (
    <Disclosure as="nav" className="gradient-bg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-[#9041bb] hover:bg-[#672f85] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
                <Link to="/">
                  <div className="flex flex-shrink-0 items-center me-20 ms-20 sm:ms-0">
                    {" "}
                    <img
                      className="h-8 w-auto"
                      src="images/logo.png"
                      alt="Art Gallery"
                    />{" "}
                    <h1 className="ms-3 text-2xl">ArtFolio-Your Art World</h1>
                  </div>
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {pages.map((item, index) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "bg-[#2b9b65] text-[#ffffff]"
                            : "text-black hover:bg-[#a9cb4a] hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                        onClick={() => handlePageClick(index)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {isLoggedIn ? (
                        <>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={"https://artfolio-y03z.onrender.com/images/avtar/" + isLoggedIn.image}
                            alt="Art Gallery"
                          />
                        </>
                      ) : (
                        <>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={"images/alternate.jpg"}
                            alt="Art Gallery"
                          />
                        </>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/userprofile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      {isLoggedIn ? (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={handleLogout}
                                href="/"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/signup"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign Up
                            </a>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {pages.map((item) => (
                <Link
                  key={item.name}
                  as="a"
                  to={item.to}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Header;
