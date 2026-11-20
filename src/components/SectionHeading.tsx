import { m } from "framer-motion";

type Props = {
  title: string;
  description?: string;
};

export default function SectionHeading({ title, description }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center"
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="text-sm text-gray-400 sm:text-base">{description}</p>}
    </m.div>
  );
}
