import { useState } from "react";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [notes, setNotes] = useState([]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  if (theme === "dark") {
    document.body.classList.add("dark");
  }

  theme === "light"
    ? document.body.classList.remove("dark")
    : document.body.classList.add("dark");

  return (
    <>
      <div className="flex justify-around items-center max-sm:flex-col">
        <div className="w-1/3 max-sm:w-full p-8 ">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold font-serif max-sm:text-6xl">
              No<span className="text-special">tesAp</span>p
            </h1>
            <button
              onClick={toggleTheme}
              className="button fixed right-0 rounded-md bg-special"
            >
              {theme === "light" ? "DARK" : "LIGHT"}
            </button>
          </div>
          <div className="flex flex-col gap-4 mt-8 border p-4 rounded-md shadow-md">
            <input
              type="text"
              placeholder="Title"
              className="border-none outline-none focus:none font-extrabold"
            />
            <input
              type="text"
              placeholder="Content"
              className="border-none outline-none focus:none"
            />
            <button className="button bg-special w-1/3 self-end rounded-md">
              Save
            </button>
          </div>
        </div>
        <div className="w-1/3 max-sm:w-full p-8">
          <div className="flex flex-row justify-between w-2/3 gap-4">
            <input type="text" placeholder="Title..." className="inputSearch" />
            <button className="button bg-special w-1/3 self-end rounded-md">
              Search
            </button>
            {/* <label htmlFor="sort">Sort</label> */}
            <select name="sort" id="sort" className="inputSearch">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="a-z">A-Z</option>
            </select>
          </div>

          <div className="flex flex-wrap flex-row justify-center items-center mt-5 overflow-scroll w-1/3 max-sm:w-full p-8 max-sm:max-h-lvh overflow-y-auto">
            <div className="flex flex-col justify-between max-sm:w-full border rounded-md shadow-md m-4">
              <div className="p-8 ">
                <h1 className="text-3xl font-bold font-serif max-sm:text-6xl">
                  Title
                </h1>
                <p className="mt-4">Content</p>
              </div>
              <div className="align-baseline p-4 border-t flex justify-end items-center">
                <p>date</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
