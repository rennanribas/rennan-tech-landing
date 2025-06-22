import { motion } from 'motion/react'
import { MdEmail } from 'react-icons/md'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useActionState, useEffect, useRef } from 'react'
import { submitContactForm, type FormState } from '../actions/contactActions'
import { SubmitButton } from '../components/SubmitButton'

const initialState: FormState = {
  status: 'idle',
  message: '',
}

export default function Contact() {
  const [state, formAction] = useActionState(submitContactForm, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
    }
  }, [state])

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
    <>
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

              <form ref={formRef} action={formAction} className='space-y-6'>
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
                    required
                    rows={6}
                    className='w-full px-4 py-3 border border-mocha-200 rounded-xl focus:ring-2 focus:ring-dusk-500 focus:border-transparent transition-colors resize-none'
                    placeholder='Tell me about your project or inquiry...'
                  />
                </div>

                <SubmitButton formState={state} />
                {state.message && (
                  <p
                    className={`text-sm mt-2 ${
                      state.status === 'error' ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {state.message}
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
    </>
  )
}
