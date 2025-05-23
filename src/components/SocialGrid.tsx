import type React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Social {
  name: string;
  icon: string;
  url: string;
}


const iconLibrary: Record<string, React.ReactNode> = {
  github: <i className="fa-brands fa-github fa-lg" />,
  linkedin: <i className="fa-brands fa-linkedin fa-lg" />,
  instagram: <i className="fa-brands fa-instagram fa-lg" />,
  "stack-overflow": <i className="fa-brands fa-stack-overflow fa-lg" />,
  briefcase: <i className="fa fa-briefcase fa-lg" />,
  code: <i className="fa-brands fa-hackerrank"></i>,
  "list-check": <i className="fa-solid fa-code" />,
  "list-checks": <i className="fa-solid fa-square-binary" />,
  twitter: <i className="fa-brands fa-twitter fa-lg" />,
  youtube: <i className="fa-brands fa-youtube fa-lg" />,
  mail: <i className="fa fa-envelope fa-lg" />,
  facebook: <i className="fa-brands fa-facebook fa-lg" />,
  send: <i className="fa fa-paper-plane fa-lg" />,
  "dev-to": <i className="fa-brands fa-dev fa-lg" />,
  monitor: <i className="fa-solid fa-globe"></i>
};

const SocialGrid = ({ open }: { open: boolean }) => {
  const [socials, setSocials] = useState<Social[]>([]);
  useEffect(() => {
    fetch("/src/data/social_links.json").then(res => res.json()).then(setSocials);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -30 }}
          transition={{ duration: 0.18 }}
          className="absolute right-2 top-16 bg-[#222328] rounded-xl shadow-2xl grid grid-cols-3 gap-4 p-4 border border-gray-700 z-50"
        >
          {socials.map((soc) => (
            <a key={soc.name} href={soc.url} title={soc.name} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center group text-[#A3B18A] hover:text-green-400 transition">
              <span className="text-2xl mb-1">
                {iconLibrary[soc.icon] || <i className="fa fa-link fa-lg" />}
              </span>
              <span className="text-xs group-hover:underline">{soc.name}</span>
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialGrid;
