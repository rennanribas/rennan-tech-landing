export type FormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Simulate form submission
  try {
    // Basic validation
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    if (!name || !email || !subject || !message) {
      return {
        status: 'error',
        message: 'Please fill out all fields.',
      };
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate a random error
    if (Math.random() > 0.8) {
      throw new Error('Failed to send message.');
    }

    console.log('Form submitted:', {
      name,
      email,
      subject,
      message,
    });

    return {
      status: 'success',
      message: 'Message sent successfully!',
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      status: 'error',
      message: 'An error occurred. Please try again.',
    };
  }
}