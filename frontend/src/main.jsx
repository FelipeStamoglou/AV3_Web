/**
 * Objetivo:
 *    Arquivo inicial responsável por renderizar a aplicação React
 *    dentro do elemento <div id="root"> do index.html.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Criação do ponto de montagem da aplicação
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
