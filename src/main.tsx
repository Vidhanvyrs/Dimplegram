import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import PlayerContextProvider from "./context/PlayerContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <PlayerContextProvider>
          <App />
        </PlayerContextProvider>
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
