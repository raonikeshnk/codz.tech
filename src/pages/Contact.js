import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Contact = () => {
  const form = useRef();


  const sendEmail = (e) => {
    e.preventDefault();

    // const formData = new FormData(form.current);
    // const userEmail = formData.get('user_email');
    // const userName = formData.get('user_name');
    // const whatsappNumber = formData.get('whatsapp_number');
    

    emailjs
      .sendForm('service_8jd56j5', 'template_feftoje', form.current, 'McBbE20cLknBM7DnT')
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          toast.success('Message sent successfully! We will get back to you soon.');
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error('Failed to send message. Please try again later.');
        }
      );

    e.target.reset();
  };



  return (
    <div className="contact section-title">
      <ToastContainer /> 
      <div className="container text-white">
        <div className="row align-items-center">
          <div className="col-md-7 mx-auto">
            <div className="contact-title mb-5 mt-5">
              <h1 className="title-font title-font-size">Contact</h1>
              <p className="mt-4 mb-4 title-font-2">
                Say Hello. If you want to extend some info, do not hesitate to
                fill this form, we love to say ‘Hello Mate’.
              </p>
            </div>
          </div>

          <div className="col-lg-8 mx-auto text-white">
            <div className="contact-form mb-5 mt-5">
              <form ref={form} onSubmit={sendEmail}>
                <div className="form-group">
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="user_name"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      name="subject"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="user_email"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-12">
                    <div className="input-group">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="WhatsApp Number"
                        name="whatsapp_number"
                        pattern="^\+[1-9]\d{1,14}$"
                        title="Please enter a valid phone number including country code (+)"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-12">
                    <textarea
                      className="form-control"
                      placeholder="Message"
                      name="message"
                      rows="4"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="btn mt-5">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
