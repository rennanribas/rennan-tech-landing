import { ContactHeader } from '../components/contact/ContactHeader'
import { ContactDetails } from '../components/contact/ContactDetails'
import { ContactForm } from '../components/contact/ContactForm'

export default function Contact() {
  return (
    <div className='min-h-screen'>
      <div className='space-y-12'>
        <ContactHeader />
        <div className='grid lg:grid-cols-5 gap-12'>
          <ContactForm />
          <ContactDetails />
        </div>
      </div>
    </div>
  )
}
