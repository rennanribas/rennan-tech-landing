import { motion } from 'motion/react'
import { MdEmail, MdSend } from 'react-icons/md'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useState } from 'react'
import Navigation from '../components/Navigation'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }
  }

  const contactMethods = [
    {
      icon: MdEmail,
      title: 'Email',
      value: 'rennanrr@gmail.com',
      href: 'mailto:rennanrr@gmail.com',
      description: 'Best way to reach me for professional inquiries',
    },
    {
      icon: FaGithub,
      title: 'GitHub',
      value: 'github.com/rennanribas',
      href: 'https://github.com/rennanribas',
      description: 'Check out my open source projects and contributions',
    },
    {
      icon: FaLinkedin,
      title: 'LinkedIn',
      value: 'linkedin.com/in/rennan-ribas',
      href: 'https://linkedin.com/in/rennan-ribas',
      description: 'Connect with me professionally',
    },
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-mocha-50 to-lavender-50'>
      <Navigation currentPage='contact' />

      <main className='pt-24 pb-16'>
        <div className='max-w-6xl mx-auto px-6'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'
          >
            <h1 className='text-5xl md:text-6xl font-bold mb-6 text-mocha-900'>
              Get In Touch
            </h1>
            <p className='text-xl text-mocha-600 max-w-2xl mx-auto leading-relaxed'>
              Ready to discuss your next project? I'd love to hear from you.
              Let's build something amazing together.
            </p>
          </motion.div>

          <div className='grid lg:grid-cols-2 gap-12'>
            {/* Contact Form */}
            <motion.section
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='bg-white rounded-2xl p-8 shadow-sm border border-mocha-200'
            >
              <h2 className='text-2xl font-bold text-mocha-900 mb-6'>
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-mocha-700 mb-2'
                    >
                      Name *
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-mocha-200 rounded-xl focus:ring-2 focus:ring-dusk-500 focus:border-transparent transition-colors'
                      placeholder='Your name'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-mocha-700 mb-2'
                    >
                      Email *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-mocha-200 rounded-xl focus:ring-2 focus:ring-dusk-500 focus:border-transparent transition-colors'
                      placeholder='your.email@example.com'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='subject'
                    className='block text-sm font-medium text-mocha-700 mb-2'
                  >
                    Subject *
                  </label>
                  <input
                    type='text'
                    id='subject'
                    name='subject'
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-3 border border-mocha-200 rounded-xl focus:ring-2 focus:ring-dusk-500 focus:border-transparent transition-colors'
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-mocha-700 mb-2'
                  >
                    Message *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className='w-full px-4 py-3 border border-mocha-200 rounded-xl focus:ring-2 focus:ring-dusk-500 focus:border-transparent transition-colors resize-none'
                    placeholder='Tell me about your project or inquiry...'
                  />
                </div>

                <motion.button
                  type='submit'
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ${
                    isSubmitting
                      ? 'bg-mocha-300 text-mocha-600 cursor-not-allowed'
                      : submitStatus === 'success'
                      ? 'bg-green-500 text-white'
                      : submitStatus === 'error'
                      ? 'bg-red-500 text-white'
                      : 'bg-dusk-600 hover:bg-dusk-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : submitStatus === 'success' ? (
                    'Message Sent!'
                  ) : submitStatus === 'error' ? (
                    'Error - Try Again'
                  ) : (
                    <>
                      Send Message <MdSend size={20} />
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <p className='text-green-600 text-sm text-center'>
                    Thank you for your message! I'll get back to you soon.
                  </p>
                )}
              </form>
            </motion.section>

            {/* Contact Information */}
            <motion.section
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='space-y-8'
            >
              <div className='bg-white rounded-2xl p-8 shadow-sm border border-mocha-200'>
                <h2 className='text-2xl font-bold text-mocha-900 mb-6'>
                  Contact Information
                </h2>

                <div className='space-y-6'>
                  {contactMethods.map((method, index) => {
                    const IconComponent = method.icon
                    return (
                      <motion.a
                        key={index}
                        href={method.href}
                        target={
                          method.href.startsWith('http') ? '_blank' : undefined
                        }
                        rel={
                          method.href.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        className='flex items-start gap-4 p-4 rounded-xl hover:bg-mocha-50 transition-colors group'
                      >
                        <div className='p-3 bg-dusk-50 rounded-xl border border-dusk-200 group-hover:bg-dusk-100 transition-colors'>
                          <IconComponent className='text-dusk-600' size={24} />
                        </div>
                        <div className='flex-1'>
                          <h3 className='font-semibold text-mocha-900 mb-1'>
                            {method.title}
                          </h3>
                          <p className='text-dusk-600 font-medium mb-1'>
                            {method.value}
                          </p>
                          <p className='text-sm text-mocha-600'>
                            {method.description}
                          </p>
                        </div>
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              <div className='bg-white rounded-2xl p-8 shadow-sm border border-mocha-200'>
                <h3 className='text-xl font-bold text-mocha-900 mb-4'>
                  Let's Collaborate
                </h3>
                <p className='text-mocha-600 leading-relaxed mb-4'>
                  I'm always interested in discussing new opportunities, whether
                  it's a full-time position, consulting work, or an exciting
                  project collaboration.
                </p>
                <p className='text-mocha-600 leading-relaxed'>
                  Feel free to reach out if you'd like to discuss how we can
                  work together to bring your ideas to life.
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  )
}
