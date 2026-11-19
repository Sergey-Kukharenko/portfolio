import { StrictMode } from "react";
import { LazyMotion } from "framer-motion";
import App from "./App";

const loadFeatures = () => import("./lib/motionFeatures").then((mod) => mod.default);

/** The app tree shared by the browser entry and the build-time prerender. */
export default function Root() {
  return (
    <StrictMode>
      {/* components use the lightweight `m.*` instead of `motion.*`; `strict`
          throws if a heavy `motion.*` sneaks back in and defeats the split */}
      <LazyMotion features={loadFeatures} strict>
        <App />
      </LazyMotion>
    </StrictMode>
  );
}
