import React from "react";
import ReactDOM from "react-dom/client";
import { LazyMotion } from "framer-motion";
import App from "./App";
import "./index.css";

const loadFeatures = () => import("./lib/motionFeatures").then((mod) => mod.default);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* components use the lightweight `m.*` instead of `motion.*`; `strict`
        throws if a heavy `motion.*` sneaks back in and defeats the split */}
    <LazyMotion features={loadFeatures} strict>
      <App />
    </LazyMotion>
  </React.StrictMode>
);
