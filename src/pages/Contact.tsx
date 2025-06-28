import { ContactHeader } from '../components/contact/ContactHeader'
import { ContactDetails } from '../components/contact/ContactDetails'
import { ContactForm } from '../components/contact/ContactForm'

export default function Contact() {
  return (
    <div className='space-y-8 sm:space-y-12'>
      <ContactHeader />
      <div className='grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12'>
        <ContactForm />
        <ContactDetails />
      </div>
    </div>
  )
}
