import { MdEmail, MdArrowForward } from 'react-icons/md'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { motion } from 'motion/react'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mocha-50 to-lavender-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight text-mocha-900">
            Rennan Ribas
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-mocha-700 font-medium">
            Senior Software Engineer
          </p>
          <p className="text-lg mb-8 text-mocha-600 max-w-2xl mx-auto leading-relaxed">
            10+ years delivering scalable, cloud-native applications with expertise in 
            TypeScript, React, NestJS, and modern cloud architectures
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="inline-flex items-center gap-2 bg-dusk-600 hover:bg-dusk-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
            >
              Let's Talk <MdArrowForward size={20} />
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/about"
              className="inline-flex items-center gap-2 bg-white hover:bg-mocha-50 text-dusk-700 px-8 py-4 rounded-xl font-semibold transition-colors border border-mocha-200 shadow-sm"
            >
              Learn More
            </motion.a>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-6"
          >
            <a
              href="mailto:rennanrr@gmail.com"
              className="p-3 text-mocha-600 hover:text-dusk-600 hover:bg-white rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Email"
            >
              <MdEmail size={24} />
            </a>
            <a
              href="https://github.com/rennanribas"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-mocha-600 hover:text-dusk-600 hover:bg-white rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://linkedin.com/in/rennan-ribas"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-mocha-600 hover:text-dusk-600 hover:bg-white rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
