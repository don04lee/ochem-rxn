import ReactDOM from "react-dom/client";
import "./index.css";
import OChemRouter from "./components/nav/OChemRouter.tsx";
import { RDKitModule } from "@rdkit/rdkit";

declare global {
  interface Window {
    RDKit: RDKitModule;
  }
}

window
  .initRDKitModule()
  .then((instance: RDKitModule) => {
    // window.RDKit is loaded and will be typed as RDKitModule
    window.RDKit = instance;
    return instance;
  })
  .catch(() => {
    // handle loading errors here...
  });

ReactDOM.createRoot(document.getElementById("root")!).render(<OChemRouter />);
