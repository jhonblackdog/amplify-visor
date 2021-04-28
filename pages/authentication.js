import { RadioGroup, Switch } from "@headlessui/react";
import React, { useState } from "react";
import Image from "next/image";

const providers = [
  { name: "Google", svg: "google-icon.svg" },
  { name: "Facebook", svg: "facebook-icon.svg" },
  { name: "Login With Amazon", svg: "amazon-icon.svg" },
];

const attributeSupports = {
  notSupportedGoogleAmazon:
    "This attribute is not supported by Google, Login With Amazon.",
  notSupportedGoogleFacebookAmazon:
    "This attribute is not supported by Facebook, Google, Login With Amazon.",
  notSupportedAmazon: "This attribute is not supported by Login With Amazon.",
  notSupportedGoogleAmazon:
    "This attribute is not supported by Google, Login With Amazon.",
  notSupportedFacebookGoogle:
    "This attribute is not supported by Facebook, Google.",
  notSupportedFacebookAmazon:
    "This attribute is not supported by Facebook, Login With Amazon.",
};

const attributeOptions = [
  {
    name: "Address",
    description: attributeSupports.notSupportedGoogleFacebookAmazon,
    enabled: false,
  },
  {
    name: "Birthdate",
    description: attributeSupports.notSupportedAmazon,
    enabled: false,
  },
  {
    name: "Email",
    description: "",
    enabled: false,
  },
  {
    name: "Family Name",
    description: attributeSupports.notSupportedAmazon,
    enabled: false,
  },
  {
    name: "Middle Name",
    description: attributeSupports.notSupportedGoogleAmazon,
    enabled: false,
  },
  {
    name: "Gender",
    description: attributeSupports.notSupportedAmazon,
    enabled: false,
  },
  {
    name: "Locale",
    description: attributeSupports.notSupportedFacebookGoogle,
    enabled: false,
  },
  {
    name: "Given Name",
    description: attributeSupports.notSupportedAmazon,
    enabled: false,
  },
  {
    name: "Name",
    description: "",
    enabled: false,
  },
  {
    name: "Nickname",
    description: attributeSupports.notSupportedGoogleFacebookAmazon,
    enabled: false,
  },
  {
    name: "Phone Number",
    description: attributeSupports.notSupportedFacebookAmazon,
    enabled: false,
  },
  {
    name: "Preferred Username",
    description: attributeSupports.notSupportedGoogleFacebookAmazon,
    enabled: false,
  },
  {
    name: "Picture",
    description: attributeSupports.notSupportedAmazon,
    enabled: false,
  },
  {
    name: "Profile",
    description: attributeSupports.notSupportedGoogleFacebookAmazon,
    enabled: false,
  },
  {
    name: "Updated At",
    description: attributeSupports.notSupportedGoogleFacebookAmazon,
    enabled: false,
  },
  {
    name: "Website",
    description: attributeSupports.notSupportedGoogleFacebookAmazon,
    enabled: false,
  },
  {
    name: "Zone Info",
    description: attributeSupports.notSupportedGoogleFacebookAmazon,
    enabled: false,
  },
];

const userOptions = [
  {
    name: "Username",
    description: "Sign-up end users using a Username",
  },
  {
    name: "Email",
    description: "Sign-up end users using an email",
  },
  {
    name: "Phone Number",
    description: "Sign-up end users using a phone number ",
  },
  {
    name: "Email or Phone Number",
    description: "Sign-up end users using either a phone number or email",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Authentication() {
  const [selectedUserOption, setUserOption] = useState(userOptions[1]);
  return (
    <>
      <section aria-labelledby="option_heading">
        <form action="#" method="POST">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-6 space-y-6 bg-white sm:p-6">
              <div>
                <h2
                  id="option_heading"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  How do you want users to sign in?
                </h2>
              </div>

              <RadioGroup value={selectedUserOption} onChange={setUserOption}>
                <RadioGroup.Label className="sr-only">
                  User Sign In Options
                </RadioGroup.Label>
                <div className="relative -space-y-px bg-white rounded-md">
                  {userOptions.map((option, optionIdx) => (
                    <RadioGroup.Option
                      key={option.name}
                      value={option}
                      className={({ checked }) =>
                        classNames(
                          optionIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                          optionIdx === userOptions.length - 1
                            ? "rounded-bl-md rounded-br-md"
                            : "",
                          checked
                            ? "bg-orange-50 border-orange-200 z-10"
                            : "border-gray-200",
                          "relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-2 focus:outline-none"
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <div className="flex items-center text-sm">
                            <span
                              className={classNames(
                                checked
                                  ? "bg-orange-500 border-transparent"
                                  : "bg-white border-gray-300",
                                active
                                  ? "ring-2 ring-offset-2 ring-gray-900"
                                  : "",
                                "h-4 w-4 rounded-full border flex items-center justify-center"
                              )}
                              aria-hidden="true"
                            >
                              <span className="rounded-full bg-white w-1.5 h-1.5" />
                            </span>
                            <RadioGroup.Label
                              as="span"
                              className="ml-3 font-medium text-gray-900"
                            >
                              {option.name}
                            </RadioGroup.Label>
                          </div>
                          <RadioGroup.Description
                            className={classNames(
                              checked ? "text-orange-700" : "text-gray-500",
                              "ml-6 pl-1 text-sm md:ml-10 md:pl-0 md:text-left"
                            )}
                          >
                            {option.description}
                          </RadioGroup.Description>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
            {/* <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Save
              </button>
            </div> */}
          </div>
        </form>
      </section>
      <Authentication.SocialProviders />
      <Authentication.Attributes />
    </>
  );
}

Authentication.SocialProviders = () => {
  const [socialProvidersEnabled, setSocialProvidersEnabled] = useState(true);
  const [enabledList, setEnabledList] = useState(providers);
  return (
    <section aria-labelledby="option_heading">
      <form action="#" method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-6 space-y-6 bg-white sm:p-6">
            <div>
              <h2
                id="social_provider_heading"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Would you like to add social providers?
              </h2>
            </div>
            <Switch.Group as="div" className="flex items-center">
              <Switch
                checked={socialProvidersEnabled}
                onChange={setSocialProvidersEnabled}
                className={classNames(
                  socialProvidersEnabled ? "bg-orange-500" : "bg-gray-200",
                  "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors ease-in-out duration-200"
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    socialProvidersEnabled ? "translate-x-5" : "translate-x-0",
                    "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  )}
                />
              </Switch>
              <Switch.Label as="span" className="ml-3">
                <span className="text-sm font-medium text-gray-900">
                  Enable Social Providers{" "}
                </span>
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="relative  bg-white rounded-md p-4">
            <div className="relative -space-y-px bg-white rounded-md">
              {providers.map((option, optionIdx) => (
                <React.Fragment key={option.name}>
                  <div
                    className={classNames(
                      optionIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                      optionIdx === providers.length - 1
                        ? "rounded-bl-md rounded-br-md"
                        : "",
                      "relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-2 focus:outline-none"
                    )}
                  >
                    <TableWrapper
                      enabledList={enabledList}
                      setEnabledList={setEnabledList}
                      option={option}
                      optionIdx={optionIdx}
                    >
                      <div
                        className={classNames(
                          "text-gray-500",
                          "ml-6 pl-1 text-sm md:ml-10 md:pl-0 md:text-left"
                        )}
                      >
                        <Image
                          src={`/${option.svg}`}
                          alt="me"
                          width="64"
                          height="64"
                        />
                      </div>
                    </TableWrapper>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-6 mt-12">
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="signin_URI"
                  className="block text-sm font-medium text-gray-700"
                >
                  Redirect signin URI
                </label>
                <input
                  type="text"
                  name="signin_URI"
                  id="signin_URI"
                  autoComplete="sign-in-uri"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="redirect_URI"
                  className="block text-sm font-medium text-gray-700"
                >
                  Redirect signout URI
                </label>
                <input
                  type="text"
                  name="redirect_URI"
                  id="redirect_URI"
                  autoComplete=""
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              {/* <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="email_address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="text"
                  name="email_address"
                  id="email_address"
                  autoComplete="email"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div> */}
            </div>

            {/* Google */}

            <div className="grid grid-cols-4 gap-6 mt-12">
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="google_client_ID"
                  className="block text-sm font-medium text-gray-700"
                >
                  Google Web Client ID for your OAuth flow
                </label>
                <input
                  type="text"
                  name="google_client_ID"
                  id="google_client_ID"
                  autoComplete="google-client-id"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="google_Web_Secret"
                  className="block text-sm font-medium text-gray-700"
                >
                  Google Web Client Secret for your OAuth flow
                </label>
                <input
                  type="text"
                  name="google_Web_Secret"
                  id="google_Web_Secret"
                  autoComplete="google-web-secret"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>
            </div>

            {/* Facebook */}
            <div className="grid grid-cols-4 gap-6 mt-12">
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="facebook_app_ID"
                  className="block text-sm font-medium text-gray-700"
                >
                  Facebook App ID for your OAuth flow
                </label>
                <input
                  type="text"
                  name="facebook_app_ID"
                  id="facebook_app_ID"
                  autoComplete="facebook-app-id"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="facebook_App_Secret"
                  className="block text-sm font-medium text-gray-700"
                >
                  Facebook App Secret for your OAuth flow
                </label>
                <input
                  type="text"
                  name="facebook_App_Secret"
                  id="facebook_App_Secret"
                  autoComplete="facebook-app-secret"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>
            </div>

            {/* Login With Amazon */}
            <div className="grid grid-cols-4 gap-6 mt-12">
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="amazon_App_ID"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amazon App ID for your OAuth flow
                </label>
                <input
                  type="text"
                  name="amazon_App_ID"
                  id="amazon_App_ID"
                  autoComplete="amazon-app-id"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="amazon_App_Secret"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amazon App Secret for your OAuth flow
                </label>
                <input
                  type="text"
                  name="amazon_App_Secret"
                  id="amazon_App_Secret"
                  autoComplete="amazon-app-secret"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>
            </div>
          </div>
          {/* <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Save
            </button>
          </div> */}
        </div>
      </form>
    </section>
  );
};

Authentication.Attributes = () => {
  const [attributesEnabled, setAttributesEnabled] = useState(true);
  const [enabledList, setEnabledList] = useState(attributeOptions);

  return (
    <section aria-labelledby="option_heading">
      <form action="#" method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-6 space-y-6 bg-white sm:p-6">
            <div>
              <h2
                id="attribute_heading"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                What attributes are required for signing up?
              </h2>
            </div>
            <Switch.Group as="div" className="flex items-center">
              <Switch
                id="attributesSwitch"
                checked={attributesEnabled}
                onChange={setAttributesEnabled}
                className={classNames(
                  attributesEnabled ? "bg-orange-500" : "bg-gray-200",
                  "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors ease-in-out duration-200"
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    attributesEnabled ? "translate-x-5" : "translate-x-0",
                    "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  )}
                />
              </Switch>
              <Switch.Label as="span" className="ml-3">
                <span className="text-sm font-medium text-gray-900">
                  Enable Attributes{" "}
                </span>
              </Switch.Label>
            </Switch.Group>
            <div className="relative -space-y-px bg-white rounded-md">
              {attributeOptions.map((option, optionIdx) => (
                <React.Fragment key={option.name}>
                  <div
                    className={classNames(
                      optionIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                      optionIdx === attributeOptions.length - 1
                        ? "rounded-bl-md rounded-br-md"
                        : "",
                      "relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-2 focus:outline-none"
                    )}
                  >
                    <TableWrapper
                      enabledList={enabledList}
                      setEnabledList={setEnabledList}
                      option={option}
                      optionIdx={optionIdx}
                    >
                      <div
                        className={classNames(
                          "text-gray-500",
                          "ml-6 pl-1 text-sm md:ml-10 md:pl-0 md:text-left"
                        )}
                      >
                        {option.description}
                      </div>
                    </TableWrapper>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Save
            </button>
          </div> */}
        </div>
      </form>
    </section>
  );
};

function TableWrapper({
  enabledList,
  setEnabledList,
  option,
  optionIdx,
  children,
}) {
  return (
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch
          checked={enabledList[optionIdx].enabled}
          onChange={(event) => {
            enabledList[optionIdx].enabled = event;
            setEnabledList([...enabledList]);
          }}
          className={classNames(
            enabledList[optionIdx].enabled ? "bg-indigo-600" : "bg-gray-200",
            "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          )}
        >
          <span className="sr-only"></span>
          <span
            className={classNames(
              enabledList[optionIdx].enabled
                ? "translate-x-5"
                : "translate-x-0",
              "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
            )}
          >
            <span
              className={classNames(
                enabledList[optionIdx].enabled
                  ? "opacity-0 ease-out duration-100"
                  : "opacity-100 ease-in duration-200",
                "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
              )}
              aria-hidden="true"
            >
              <svg
                className="bg-white h-3 w-3 text-gray-400"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path
                  d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              className={classNames(
                enabledList[optionIdx].enabled
                  ? "opacity-100 ease-in duration-200"
                  : "opacity-0 ease-out duration-100",
                "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
              )}
              aria-hidden="true"
            >
              <svg
                className="bg-white h-3 w-3 text-indigo-600"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
              </svg>
            </span>
          </span>
        </Switch>
        <Switch.Label as="span" className="ml-3">
          <span className="text-sm font-medium text-gray-900">
            {option.name}
          </span>
        </Switch.Label>
      </Switch.Group>
      {children}
    </>
  );
}
