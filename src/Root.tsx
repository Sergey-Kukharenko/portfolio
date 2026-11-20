import { StrictMode } from "react";
import { LazyMotion, MotionConfig } from "framer-motion";
import App from "./App";
import { LocaleProvider, type Locale } from "./i18n";

const loadFeatures = () => import("./lib/motionFeatures").then((mod) => mod.default);

/** The app tree shared by the browser entry and the build-time prerender. */
export default function Root({ locale }: { locale: Locale }) {
  return (
    <StrictMode>
      {/* components use the lightweight `m.*` instead of `motion.*`; `strict`
          throws if a heavy `motion.*` sneaks back in and defeats the split */}
      <LazyMotion features={loadFeatures} strict>
        {/* honor the OS "reduce motion" setting everywhere: transform and
            layout animations are skipped, fades still play */}
        <MotionConfig reducedMotion="user">
          <LocaleProvider locale={locale}>
            <App />
          </LocaleProvider>
        </MotionConfig>
      </LazyMotion>
    </StrictMode>
  );
}
