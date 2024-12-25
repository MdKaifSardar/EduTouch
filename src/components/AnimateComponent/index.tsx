"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  delay?: number; // Optional delay for the animation
  duration?: number; // Optional duration for the animation
}

const AnimateComponent: React.FC<AnimatedContainerProps> = ({
  children,
  delay = 0, // Default delay is 0
  duration = 1, // Default duration is 1 second
}) => {
  const ref = useRef<HTMLDivElement>(null); // Explicitly set the type
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: false,
    amount: 0.1,
  });

  const variants = {
    hidden: {
      opacity: 0,
      translateY: 60,
    },
    visible: {
      opacity: 1,
      translateY: 0,
      transition: {
        delay, // Use delay from props
        duration, // Use duration from props
      },
    },
  };

  return (
    <div ref={ref} className="w-full h-full">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"} // Trigger animation based on viewport
        variants={variants}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimateComponent;
