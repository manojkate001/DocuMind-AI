import { useEffect, useState } from "react";

import Upload from "./components/Upload";
import Chat from "./components/Chat";
import Login from "./pages/Login";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {

      setUser(
        JSON.parse(savedUser)
      );
    }

  }, []);

  const logout = () => {

    localStorage.removeItem("user");

    setUser(null);
  };

  if (!user) {

    return (
      <Login
        onLogin={setUser}
      />
    );
  }

  return (

    <div className="flex h-screen bg-[#181818] text-white overflow-hidden">

      {/* Sidebar */}

      <div className="w-[320px] bg-black border-r border-gray-900 flex flex-col p-6">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            DocuMind AI
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome, {user.name}
          </p>

        </div>

        <div className="flex items-center gap-3 mb-6">

          <img
            src={user.picture}
            alt=""
            className="w-12 h-12 rounded-full"
          />

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-xl"
          >
            Logout
          </button>

        </div>

        <button
          onClick={() =>
            window.location.reload()
          }
          className="
          bg-[#1e2b44]
          hover:bg-[#263756]
          transition-all
          p-5
          rounded-3xl
          text-left
          text-xl
          font-medium
          mb-8"
        >
          + New Chat
        </button>

        <p className="text-gray-400 text-lg mb-5">
          Knowledge Base
        </p>

        <div className="flex-1 overflow-y-auto">

          <Upload />

        </div>

      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        <Chat />

      </div>

    </div>
  );
}

export default App;