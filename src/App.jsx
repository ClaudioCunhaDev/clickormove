import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [coordenadas, setCoordenadas] = useState([]);
  const [coordenadasRemovidas, setCoordenadasRemovidas] = useState([]);
  const [drag, setDrag] = useState(false);
  const cores = ["red", "green"];
  const [start, setStart] = useState(false);

  const handleClick = (e) => {
    if (start) {
      const newCoord = {
        x: e.clientX || e.touches[0].clientX,
        y: e.clientY || e.touches[0].clientY,
      };

      setCoordenadas((prv) => [...prv, newCoord]);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    const lastPos = coordenadas[coordenadas.length - 1];
    setCoordenadas((prv) => prv.filter((ele) => ele !== lastPos));
    if (lastPos) {
      setCoordenadasRemovidas((prv) => [...prv, lastPos]);
    }
  };
  const handleAdd = (e) => {
    e.stopPropagation();
    const lastPos = coordenadasRemovidas[coordenadasRemovidas.length - 1];
    setCoordenadasRemovidas((prv) => prv.filter((ele) => ele !== lastPos));
    if (coordenadasRemovidas.length !== 0) {
      setCoordenadas((prv) => [...prv, lastPos]);
    }
  };

  const handleStart = (e) => {
    e.stopPropagation();
    setCoordenadas([]);
    setCoordenadasRemovidas([]);
    setStart(false);
  };

  const handleDrag = (e) => {
    e.stopPropagation();
    setDrag((prv) => !prv);
  };

  if (window.innerWidth < 768) {
    return (
      <>
        {!drag ? (
          <div onTouchStart={handleClick} className="bg-gray-800 h-screen">
            {start ? (
              <div className="flex flex-wrap md:flex gap-3 justify-center">
                <button
                  onTouchStart={handleRemove}
                  type="button"
                  className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
                >
                  REMOVE LAST
                </button>
                <button
                  onTouchStart={handleAdd}
                  type="button"
                  className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
                >
                  ADD LAST
                </button>
                <button
                  onTouchStart={handleDrag}
                  type="button"
                  className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
                >
                  {drag ? "CLICK GAME" : "DRAG GAME"}
                </button>
                <button
                  onTouchStart={() => setCoordenadas([])}
                  className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
                >
                  CLEAN BOARD
                </button>
                <button
                  onTouchStart={handleStart}
                  type="button"
                  className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
                >
                  {coordenadas.length === 0 ? "CANCEL GAME" : "EXIT GAME"}
                </button>
              </div>
            ) : (
              <div className="flex gap-3 justify-center items-center h-screen">
                <button
                  onTouchStart={() => setStart(true)}
                  className={`flex justify-center items-center w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
                >
                  START
                </button>
              </div>
            )}

            {coordenadas?.map((ele, idx) => (
              <button
                key={idx}
                style={{
                  top: ele.y + "px",
                  left: ele.x + "px",
                  position: "absolute",
                }}
                className={`flex justify-center items-center bg-gradient-to-r from-${
                  cores[Math.floor(Math.random() * cores.length)]
                }-400 via-${
                  cores[Math.floor(Math.random() * cores.length)]
                }-500 to-${
                  cores[Math.floor(Math.random() * cores.length)]
                }-600 w-5 h-5 border-2 rounded-full`}
              ></button>
            ))}
          </div>
        ) : (
          <div
            onTouchMoveCapture={handleClick}
            className="bg-gray-800 h-screen"
          >
            {start ? (
              <div className="flex flex-wrap md:flex gap-3 justify-center">
                <button
                  onTouchStart={handleRemove}
                  type="button"
                  className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
                >
                  REMOVE LAST
                </button>
                <button
                  onTouchStart={handleAdd}
                  type="button"
                  className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
                >
                  ADD LAST
                </button>
                <button
                  onTouchStart={handleDrag}
                  type="button"
                  className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
                >
                  {drag ? "CLICK GAME" : "DRAG GAME"}
                </button>

                <button
                  onTouchStart={() => setCoordenadas([])}
                  className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
                >
                  CLEAN BOARD
                </button>
                <button
                  onTouchStart={handleStart}
                  type="button"
                  className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
                >
                  {coordenadas.length === 0 ? "CANCEL GAME" : "EXIT GAME"}
                </button>
              </div>
            ) : (
              <div className="flex gap-3 justify-center items-center h-screen">
                <button
                  onTouchStart={() => setStart(true)}
                  className={`flex justify-center items-center w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
                >
                  START
                </button>
              </div>
            )}

            {coordenadas?.map((ele, idx) => (
              <button
                key={idx}
                style={{
                  top: ele.y + "px",
                  left: ele.x + "px",
                  position: "absolute",
                }}
                className={`bg-gradient-to-r from-${
                  cores[Math.floor(Math.random() * cores.length)]
                }-400 via-${
                  cores[Math.floor(Math.random() * cores.length)]
                }-500 to-${
                  cores[Math.floor(Math.random() * cores.length)]
                }-600 w-5 h-5 border-2 rounded-full`}
              ></button>
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {!drag ? (
        <div onClick={handleClick} className="bg-gray-800 h-screen">
          {start ? (
            <div className="flex flex-wrap md:flex gap-3 justify-center">
              <button
                onClick={handleRemove}
                type="button"
                className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
              >
                REMOVE LAST
              </button>
              <button
                onClick={handleAdd}
                type="button"
                className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
              >
                ADD LAST
              </button>
              <button
                onClick={handleDrag}
                type="button"
                className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
              >
                {drag ? "CLICK GAME" : "DRAG GAME"}
              </button>
              <button
                onClick={() => setCoordenadas([])}
                className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
              >
                CLEAN BOARD
              </button>
              <button
                onClick={handleStart}
                type="button"
                className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
              >
                {coordenadas.length === 0 ? "CANCEL GAME" : "EXIT GAME"}
              </button>
            </div>
          ) : (
            <div className="flex gap-3 justify-center items-center h-screen">
              <button
                onClick={() => setStart(true)}
                className={`flex justify-center items-center w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
              >
                START
              </button>
            </div>
          )}

          {coordenadas?.map((ele, idx) => (
            <button
              key={idx}
              style={{
                top: ele.y + "px",
                left: ele.x + "px",
                position: "absolute",
              }}
              className={`flex justify-center items-center bg-gradient-to-r from-${
                cores[Math.floor(Math.random() * cores.length)]
              }-400 via-${
                cores[Math.floor(Math.random() * cores.length)]
              }-500 to-${
                cores[Math.floor(Math.random() * cores.length)]
              }-600 w-5 h-5 border-2 rounded-full`}
            ></button>
          ))}
        </div>
      ) : (
        <div onMouseMove={handleClick} className="bg-gray-800 h-screen">
          {start ? (
            <div className="flex flex-wrap md:flex gap-3 justify-center">
              <button
                onMouseMove={handleRemove}
                type="button"
                className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
              >
                REMOVE LAST
              </button>
              <button
                onClick={handleAdd}
                type="button"
                className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
              >
                ADD LAST
              </button>
              <button
                onClick={handleDrag}
                type="button"
                className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
              >
                {drag ? "CLICK GAME" : "DRAG GAME"}
              </button>

              <button
                onClick={() => setCoordenadas([])}
                className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
              >
                CLEAN BOARD
              </button>
              <button
                onClick={handleStart}
                type="button"
                className={`flex justify-center items-center z-20 w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
              >
                {coordenadas.length === 0 ? "CANCEL GAME" : "EXIT GAME"}
              </button>
            </div>
          ) : (
            <div className="flex gap-3 justify-center items-center h-screen">
              <button
                onClick={() => setStart(true)}
                className={`flex justify-center items-center w-[5rem] md:w-[10rem] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-green-300 dark:hover:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300`}
              >
                START
              </button>
            </div>
          )}

          {coordenadas?.map((ele, idx) => (
            <button
              key={idx}
              style={{
                top: ele.y + "px",
                left: ele.x + "px",
                position: "absolute",
              }}
              className={`bg-gradient-to-r from-${
                cores[Math.floor(Math.random() * cores.length)]
              }-400 via-${
                cores[Math.floor(Math.random() * cores.length)]
              }-500 to-${
                cores[Math.floor(Math.random() * cores.length)]
              }-600 w-5 h-5 border-2 rounded-full`}
            ></button>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
