import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface AnimatedContainerProps {
  children: ReactNode;
}

const AnimateComponent: React.FC<AnimatedContainerProps> = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Re-trigger animation every time the component is in view
    threshold: 0.1, // Adjust threshold as needed
  });

  const variants = {
    hidden: {
      opacity: 0,
      translateY: 20,
    },
    visible: {
      opacity: 1,
      translateY: 0,
      transition: {
        duration: 1, // Animation duration
      },
    },
  };

  return (
    <div ref={ref} className="overflow-hidden">
      <AnimatePresence>
        {inView && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            // className="w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimateComponent;
