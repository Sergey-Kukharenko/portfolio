import { renderToString } from "react-dom/server";
import Root from "./Root";

/** Build-time only: the app's initial markup, injected into dist/index.html. */
export function render() {
  return renderToString(<Root />);
}
