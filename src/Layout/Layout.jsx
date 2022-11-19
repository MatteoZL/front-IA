import React, { useEffect, useState } from "react";
import Icon from "./resources/mario.png";
import mario from "./resources/mariogalaxy.png";

import camino from "./resources/camino.png";
import iconMario from "./resources/iconomario.ico";
import ladrillo from "./resources/ladrillo.png";
import estrella from "./resources/estrella.png";
import flor from "./resources/flor.png";
import koppa from "./resources/koppa.png";
import peach from "./resources/peach.png";

import "./Layout.css";
import axios from "axios";
import "animate.css";

const Layout = () => {
  const URI = "http://localhost:4000/";
  const [file, setFile] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const [parts, setParts] = useState({
    firstPart: true,
    secondPart: false,
    thirdPart: false,
    fourthPart: false,
  });
  const [fileContent, setFileContent] = useState("");
  const [response, setResponse] = useState("");

  const [incremental, setIncremental] = useState(0);

  const [world, setWorld] = useState([]);
  const uploadFile = () => {
    document.getElementById("selectFile").click();
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const searchMario = () => {
    for (let i = 0; i < world.length; i++) {
      for (let j = 0; j < world[0].length; j++) {
        if (world[i][j] == 2) {
          return {
            y: i,
            x: j,
          };
        }
      }
    }
  };

  useEffect(() => {
    if (file !== "") {
      setParts({
        ...parts,
        firstPart: false,
        secondPart: true,
      });
    }
  }, [file]);

  useEffect(() => {
    const sendFile = async () => {
      if (algorithm !== "") {
        const formData = new FormData();

        formData.append("textfile", file);

        const path = await axios.post(URI + algorithm, formData);

        const reader = new FileReader();

        reader.readAsText(file);
        reader.onload = () => {
          setFileContent(reader.result);
        };
        setResponse(path.data);

        setParts({
          ...parts,
          secondPart: false,
          thirdPart: true,
        });
      }
    };
    sendFile();
  }, [algorithm]);

  useEffect(() => {
    if (fileContent !== "") {
      const worldConstruct = [];

      const columns = fileContent.split("\r\n", 10);

      columns.forEach((column) => {
        worldConstruct.push(column.split(" "));
      });

      setWorld(worldConstruct);
    }
  }, [fileContent]);

  useEffect(() => {
    if (parts.thirdPart === true) {
      setTimeout(() => {
        const location = searchMario();
        let { x, y } = location;

        switch (response.path[incremental]) {
          case "L":
            world[y][x] = 0;
            world[y][x - 1] = 2;
            setWorld(world);
            break;
          case "R":
            world[y][x] = 0;
            world[y][x + 1] = 2;
            x = x + 1;
            setWorld(world);
            break;
          case "U":
            world[y][x] = 0;
            world[y - 1][x] = 2;
            setWorld(world);
            break;
          case "D":
            world[y][x] = 0;
            world[y + 1][x] = 2;
            setWorld(world);
            break;

          default:
            break;
        }
        setIncremental(incremental + 1);
      }, 1000);
    }
  });

  const toPath = (path) => {
    const letters = path.split("");

    var fullPath = "";

    letters.map((leter) => {
      if (leter == "L") {
        fullPath = fullPath + " Izquierda ";
      } else if (leter == "R") {
        fullPath = fullPath + " Derecha";
      } else if (leter == "U") {
        fullPath = fullPath + " Arriba ";
      } else if (leter == "D") {
        fullPath = fullPath + " Abajo";
      }
    });

    return fullPath;
  };
  return (
    <div className="container" id="hero">
      {parts.firstPart ? (
        <div className="firstPart">
          <div className="text">
            <h1>
              <img
                src="https://fontmeme.com/permalink/221117/3313ea15b7c4414a90f60b420980d4b9.png"
                alt="super-mario-font"
                border="0"
              />
              <span></span>
              <img
                src="https://fontmeme.com/permalink/221117/8041b6c5cf5a866085b117f258401502.png"
                alt="super-mario-font"
                border="0"
              />
            </h1>
            <h2>
              Elige un mundo y lo solucionaremos por ti
              <span></span>
            </h2>
            <div className="customInput">
              <button onClick={() => uploadFile()}>
                <img src={Icon} alt="select-word" className="input_img" />
                <br />
                <i>CARGA TU MUNDO</i>
              </button>
              <input
                type="file"
                className="customFile"
                id="selectFile"
                onChange={(e) => handleFile(e)}
              />
            </div>
          </div>

          <div>
            <img src={mario} alt="mario with star" className="header_img" />
          </div>
        </div>
      ) : parts.secondPart ? (
        <div className="section_algorithm">
          <div>
            <h1>
              <a href="https://fontmeme.com/super-mario-font/">
                <img
                  src="https://fontmeme.com/permalink/221117/7ebf832b862ea52ecadaf782d8709436.png"
                  alt="super-mario-font"
                  border="0"
                />
              </a>
            </h1>
            <button onClick={() => setAlgorithm("informed/bfs")}>
              <img
                src="https://fontmeme.com/permalink/221117/6d2b8bd89f7707dcb4554fe8b637492d.png"
                alt="super-mario-font"
                border="0"
              />
            </button>

            <button onClick={() => setAlgorithm("informed/dfs")}>
              <img
                src="https://fontmeme.com/permalink/221117/8e8103b6da0476bab8359dc125cb89b3.png"
                alt="super-mario-font"
                border="0"
              />
            </button>
            <button onClick={() => setAlgorithm("informed/ucs")}>
              <img
                src="https://fontmeme.com/permalink/221117/183b80be5287ae6872c2d64a0bacd9b6.png"
                alt="super-mario-font"
                border="0"
              />
            </button>
          </div>
          <div>
            <h1>
              <a href="https://fontmeme.com/super-mario-font/">
                <img
                  src="https://fontmeme.com/permalink/221117/9b0d9bff4bab85592308fdfa1f1a8c4f.png"
                  alt="super-mario-font"
                  border="0"
                />
              </a>
            </h1>
            <button onClick={() => setAlgorithm("uninformed/Astar")}>
              <img
                src="https://fontmeme.com/permalink/221117/91be44b830eb636d2fb699e9d58bece9.png"
                alt="super-mario-font"
                border="0"
              />
            </button>
            <button onClick={() => setAlgorithm("uninformed/greedy")}>
              <img
                src="https://fontmeme.com/permalink/221117/67f763c4feb00b6ac8f4f5d34f4e07f1.png"
                alt="super-mario-font"
                border="0"
              />
            </button>
          </div>
        </div>
      ) : parts.thirdPart ? (
        <div class="final">
          <div className="matrix-container">
            <div className="matrix-board">
              {world.map((column, indexY) => {
                return (
                  <div className="matrix_separator">
                    {column.map((position, indexX) => {
                      return (
                        <div className="matrix-box">
                          {position == 0 ? (
                            <img src={camino} alt="camino" />
                          ) : position == 1 ? (
                            <img src={ladrillo} alt="mario" />
                          ) : position == 2 ? (
                            <img src={iconMario} alt="ladrillo" />
                          ) : position == 3 ? (
                            <img src={estrella} alt="estrella" />
                          ) : position == 4 ? (
                            <img src={flor} alt="flor" />
                          ) : position == 5 ? (
                            <img src={koppa} alt="koppa" />
                          ) : position == 6 ? (
                            <img src={peach} alt="princesa" />
                          ) : undefined}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="info">
            <h3>
              El camino a tomar fue: <p>{toPath(response.path)}</p>
            </h3>
            <h3>
              Se resolvio el problema en:{" "}
              <p>{response.executionTime} milisegundos</p>
            </h3>
            <h3>
              Se expandieron {response.expandedNodes} nodos
            </h3>
            <h3>Se creo un arbol de profundidad {response.depth}</h3>
          </div>
        </div>
      ) : parts.fourthPart ? (
        <h1>fin</h1>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Layout;
