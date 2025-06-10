// NavBar.tsx
import { service } from "@/Service/service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";

const Header = () => {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const [display, setDisplay] = useState("hidden");

  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (user?.role === "manager") {
      setDisplay("");
    } else {
      setDisplay("hidden");
    }
  }, [user]);

  const userLogout = async () => {
    const result = await service.logout();
    setUser(null);
    if (result) {
      navigate("/");
    }
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await service.getCurrentUser();
        setUser(userData.data);
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <nav className="w-full bg-[#1A2633] py-4 shadow-md fixed top-0 left-0 z-50">
      <div className=" justify-center gap-6  md:flex hidden">
        <button
          onClick={() => navigate("/home")}
          className="bg-[#334D66] px-6 py-2 rounded-3xl hover:bg-[#4a6177]"
        >
          <h3 className="text-gray-300 font-semibold text-lg">Home</h3>
        </button>
        {/* <button onClick={() => navigate("/project")} className="bg-[#334D66] px-6 py-2 rounded-3xl">
          <h3 className="text-gray-300 font-semibold text-lg">Projects</h3>
        </button> */}
        <button
          onClick={() => navigate("/teams")}
          className={`bg-[#334D66] px-6 py-2 rounded-3xl hover:bg-[#4a6177] ${display}`}
        >
          <h3 className="text-gray-300 font-semibold text-lg ">Teams</h3>
        </button>
        <button
          onClick={() => navigate("/assignment-table")}
          className={`bg-[#334D66] px-6 py-2 rounded-3xl hover:bg-[#4a6177] ${display}`}
        >
          <h3 className="text-gray-300 font-semibold text-lg">Assignments</h3>
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="bg-[#334D66] px-6 py-2 rounded-3xl hover:bg-[#4a6177]"
        >
          <h3 className="text-gray-300 font-semibold text-lg">Profile</h3>
        </button>
        <button
          onClick={userLogout}
          className="bg-[#334D66] px-6 py-2 rounded-3xl hover:bg-[#4a6177]"
        >
          <h3 className="text-gray-300 font-semibold text-lg">Logout</h3>
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden ">
        <button
          onClick={toggleMenu}
          className="text-white hover:text-blue-600 focus:outline-none focus:text-blue-600 transition duration-300 ease-in-out"
          aria-label="Toggle navigation"
        >
          {/* Hamburger icon for closed state, X icon for open state */}
          {isOpen ? (
            <svg
              className="h-10 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-10 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex mt-4  px-2 pb-3 pt-2 text-white bg-[#1A2633] flex-col gap-2 w-[50%]">
          <button
            onClick={() => navigate("/home")}
            className="bg-[#334D66] md:px-6 md:py-2 px-3 py-1 rounded-3xl hover:bg-[#4a6177]"
          >
            <h3 className="text-gray-300 font-semibold md:text-lg text-md ">Home</h3>
          </button>
          {/* <button onClick={() => navigate("/project")} className="bg-[#334D66] px-6 py-2 rounded-3xl">
          <h3 className="text-gray-300 font-semibold text-lg">Projects</h3>
        </button> */}
          <button
            onClick={() => navigate("/teams")}
            className={`bg-[#334D66] md:px-6 md:py-2 px-3 py-1 rounded-3xl hover:bg-[#4a6177] ${display}`}
          >
            <h3 className="text-gray-300 font-semibold text-lg ">Teams</h3>
          </button>
          <button
            onClick={() => navigate("/assignment-table")}
            className={`bg-[#334D66] md:px-6 md:py-2 px-3 py-1 rounded-3xl hover:bg-[#4a6177] ${display}`}
          >
            <h3 className="text-gray-300 font-semibold text-lg">Assignments</h3>
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="bg-[#334D66] md:px-6 md:py-2 px-3 py-1 rounded-3xl hover:bg-[#4a6177]"
          >
            <h3 className="text-gray-300 font-semibold text-lg">Profile</h3>
          </button>
          <button
            onClick={userLogout}
            className="bg-[#334D66] md:px-6 md:py-2 px-3 py-1 rounded-3xl hover:bg-[#4a6177]"
          >
            <h3 className="text-gray-300 font-semibold text-lg">Logout</h3>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
