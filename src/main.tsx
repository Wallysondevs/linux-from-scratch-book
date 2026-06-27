import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Garante que a rota raiz case no primeiro acesso (hash routing).
// Sem isso, abrir o site sem "#" deixa a Home em branco.
if (!window.location.hash) {
  window.location.hash = "#/";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
