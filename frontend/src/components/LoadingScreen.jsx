import { motion } from "framer-motion";
import { IconChartBarPopular } from "@tabler/icons-react";

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="text-center"
      >

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear",
          }}
          className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-2xl"
        >
          <IconChartBarPopular
            size={42}
            stroke={2}
            className="text-white"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{
            delay: 0.2,
          }}
          className="mt-8 text-4xl font-bold text-white"
        >
          Bincom Election Portal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.4,
          }}
          className="mt-3 text-slate-400"
        >
          Preparing Election Results...
        </motion.p>

        <div className="mt-8 flex justify-center gap-2">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: item * 0.15,
              }}
              className="w-3 h-3 rounded-full bg-blue-500"
            />
          ))}
        </div>

      </motion.div>

    </div>
  );
}

export default LoadingScreen;