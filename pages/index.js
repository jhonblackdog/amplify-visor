import { kebabCase } from "lodash";
import { useState, useRef } from "react";

import Modal from "../components/Modal";

const createProjectSteps = [
  {
    url: "/api/create-react-app",
  },
  {
    url: "/api/install-amplify-deps",
  },
];

const defaultValues = {
  project_name: "amplify-visor-test",
};

export default function Project({ cwd = "/tmp" }) {
  const outputRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [output, setOutput] = useState("");
  const [changed, setChanged] = useState(defaultValues);

  function handleChange(event) {
    let { checked, name, type, value } = event.target;

    switch (type) {
      case "checkbox":
        if (!checked) value = undefined;
        break;
      default:
    }

    setChanged((changed) => ({
      ...changed,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setOutput("");
    setIsModalOpen(true);

    const formData = new FormData(event.target);
    const body = JSON.stringify(Object.fromEntries(formData));

    const method = "POST";

    async function submitSteps(step = 0) {
      const res = await fetch(createProjectSteps[step].url, { body, method });
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      reader.read().then(async function processText({ done, value }) {
        console.log({ done, step });
        if (done) {
          console.log({ step });
          if (createProjectSteps[step + 1]) {
            console.log("next step");
            await submitSteps(step + 1);
          }
          return;
        }

        setOutput((prev) => prev + `${decoder.decode(value)}\n`);

        outputRef.current.scroll({
          behavior: "smooth",
          top: outputRef.current.scrollHeight,
        });

        return reader.read().then(await processText);
      });
    }

    submitSteps();
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <section aria-labelledby="payment_details_heading">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        buttons={
          <>
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              onClick={closeModal}
            >
              Close
            </button>
          </>
        }
      >
        <pre
          ref={outputRef}
          className="p-6 overflow-y-auto font-mono text-sm subpixel-antialiased text-white bg-gray-800 rounded-md shadow-inner h-96"
        >
          {output}
        </pre>
      </Modal>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-6 bg-white sm:p-6">
            <div>
              <h2
                id="payment_details_heading"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Project
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage the underlying framework, language, default editor, &amp;
                environments
              </p>
            </div>

            <div className="grid grid-cols-4 gap-6 mt-6">
              <div className="col-span-4 sm:col-span-4">
                <label
                  htmlFor="project_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project name
                </label>
                <input
                  type="text"
                  name="project_name"
                  id="project_name"
                  defaultValue={defaultValues.project_name}
                  placeholder="my-amplify-app"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
                <p
                  className="mt-2 font-mono text-xs text-gray-500"
                  id="email-description"
                >
                  {cwd}/{kebabCase(changed.project_name)}
                </p>
              </div>

              <div className="col-span-4 sm:col-span-2" hidden>
                <label
                  htmlFor="project_location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project location
                </label>
                <input
                  type="hidden"
                  name="project_location"
                  id="project_location"
                  value={cwd}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="environment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Environment
                </label>
                <input
                  type="text"
                  name="environment"
                  id="environment"
                  defaultValue="dev"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="default_editor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Default editor
                </label>
                <select
                  type="text"
                  name="default_editor"
                  id="default_editor"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                >
                  <option value="vscode">Visual Studio Code</option>
                </select>
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="app_type"
                  className="block text-sm font-medium text-gray-700"
                >
                  App type
                </label>
                <select
                  name="app_type"
                  id="app_type"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  defaultValue="javascript"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="ios" disabled>
                    iOS
                  </option>
                  <option value="android" disabled>
                    Android
                  </option>
                </select>
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="framework"
                  className="block text-sm font-medium text-gray-700"
                >
                  Framework
                </label>
                <select
                  id="framework"
                  name="framework"
                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  defaultValue="react"
                >
                  <option value="n/a" disabled>
                    N/A
                  </option>
                  <option value="react">React</option>
                  <option value="angular" disabled>
                    Angular
                  </option>
                  <option value="vue" disabled>
                    Vue
                  </option>
                  <option value="nextjs" disabled>
                    Next.js
                  </option>
                  <option value="react-native" disabled>
                    React Native
                  </option>
                  <option value="ionic" disabled>
                    Ionic
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Create Amplify App
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      cwd: process.cwd(),
    },
  };
}
