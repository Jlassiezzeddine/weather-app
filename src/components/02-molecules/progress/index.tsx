import { motion } from "framer-motion";
import React from "react";

function Progress({ value }: { value: number }) {
  const MAX = 15;

  const percentage = value / MAX;
  return (
    <div className="flex justify-center">
      <div className="relative max-w-56">
        <svg
          className="absolute left-0 top-0 "
          width="100%"
          viewBox="0 0 106 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ pathLength: 1 }}
            whileInView={{ pathLength: 1 - percentage }}
            transition={{ type: "spring" }}
            d="M103 53C103 25.3858 80.6142 3 53 3C25.3858 3 3 25.3858 3 53"
            stroke="#C2C2C2"
            stroke-width="6"
          />
        </svg>
        <svg
          width="100%"
          viewBox="0 0 106 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M103 53C103 25.3858 80.6142 3 53 3C25.3858 3 3 25.3858 3 53"
            stroke="url(#paint0_linear_104_2)"
            stroke-width="6"
          />
          <defs>
            <linearGradient
              id="paint0_linear_104_2"
              x1="3"
              y1="53"
              x2="103"
              y2="53"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFE037" />
              <stop offset="1" stop-color="#FB8921" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default Progress;
