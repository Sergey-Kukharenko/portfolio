import { useEffect, useLayoutEffect } from "react";

/** useLayoutEffect in the browser, a no-op-safe useEffect during prerendering. */
export const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
