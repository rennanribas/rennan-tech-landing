import { ContactHeader } from '../components/contact/ContactHeader'
import { ContactDetails } from '../components/contact/ContactDetails'
import { ContactForm } from '../components/contact/ContactForm'

export default function Contact() {
  return (
    <div className='space-y-8 sm:space-y-12'>
      <ContactHeader />
      <div className='flex justify-center'>
        <div className='w-full max-w-2xl'>
          <ContactDetails />
        </div>
      </div>
      {/* Contact form is temporarily disabled */}
      <ContactForm />
    </div>
  )
}
