import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TYPE_SPEED = 55;
const DELETE_SPEED = 28;
const HOLD_TIME = 1700;

type Props = {
  words: string[];
  className?: string;
};

export default function Typewriter({ words, className }: Props) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];

    if (!deleting && subIndex === current.length) {
      const t = window.setTimeout(() => setDeleting(true), HOLD_TIME);
      return () => window.clearTimeout(t);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = window.setTimeout(
      () => setSubIndex((s) => s + (deleting ? -1 : 1)),
      deleting ? DELETE_SPEED : TYPE_SPEED
    );
    return () => window.clearTimeout(t);
  }, [subIndex, deleting, index, words]);

  return (
    <span className={className}>
      {words[index].slice(0, subIndex)}
      <motion.span
        aria-hidden
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-current align-middle"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      />
    </span>
  );
}
