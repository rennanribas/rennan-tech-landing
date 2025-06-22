import { ContactHeader } from '../components/contact/ContactHeader'
import { ContactForm } from '../components/contact/ContactForm'
import { ContactDetails } from '../components/contact/ContactDetails'

export default function Contact() {
  return (
    <>
      <ContactHeader />
      <div className='grid lg:grid-cols-5 gap-12'>
        <ContactForm />
        <ContactDetails />
      </div>
    </>
  )
}
