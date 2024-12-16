import React, { useState, useEffect } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768); // Tailwind's 'md' breakpoint

  // Update state on screen resize
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="bg-darkGray text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center">
            <h1 className="text-xl font-bold">MyApp</h1>
          </div>

          {/* for Large Screens */}
          {isLargeScreen && (
            <div className="flex-1 flex justify-center items-center">
              <div className="flex space-x-8">
                <a href="#" className="hover:bg-darkGray px-3 py-2 rounded-md">Home</a>
                <a href="#" className="hover:bg-darkGray px-3 py-2 rounded-md">My Songs</a>
                <a href="#" className="hover:bg-darkGray px-3 py-2 rounded-md">Ranking</a>
              </div>
            </div>
          )}
            
          {isLargeScreen && (
            <div className='flex flex-row gap-7'>
              <a href="#" ><button className='block px-4 py-2 bg-gradient-to-r from-pink-400 to-pink-800 rounded  '>Create Account</button></a>
              <button>Sign Up</button>
            </div>
          )}

          {/* For small screens */}
          {!isLargeScreen && (
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                  ></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

       {/* Display of Small Screens */}
      {isOpen && !isLargeScreen && (
        <div className="bg-darkGray text-center ">
          <a href="#" className="block px-4 py-2 hover:bg-hoverDarkGray">Home</a>
          <a href="#" className="block px-4 py-2 hover:bg-hoverDarkGray">My Songs</a>
          <a href="#" className="block px-4 py-2 hover:bg-hoverDarkGray ">Ranking</a>
          <div className='flex flex-col justify-center items-center gap-2'>
          <a href="#" ><button className='block px-4 py-2 bg-gradient-to-r from-pink-400 to-pink-800 rounded  '>Create Account</button></a>
          <button>Sign Up</button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
