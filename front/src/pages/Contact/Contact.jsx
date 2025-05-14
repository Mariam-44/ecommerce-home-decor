import React from 'react';

export default function Contact() {
  return (
    <section className="mt-24">
      <h1 className="text-center text-5xl">Contact Us</h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-4 mt-10">
          {/* Left Column - Contact Form */}
          <div className="col-span-8">
            <div className="border">
              <h2 className="border py-2 bg-gray-100 font-bold pl-4">
                Send Us a Message
              </h2>
              <div className="p-5">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      placeholder="Subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      placeholder="Your Message"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="col-span-4">
            <div className="border">
              <h2 className="border py-2 bg-gray-100 font-bold pl-4">
                Contact Information
              </h2>
              <div className="p-5 space-y-6">
                <div className="flex items-start">
                  <div className="bg-gray-200 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-700 font-medium">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-200 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-700 font-medium">Email</h3>
                    <p className="text-gray-600">hello@homedecor.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-200 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-700 font-medium">Address</h3>
                    <p className="text-gray-600">123 Decor Lane, Design City, DC 12345</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-gray-700 font-medium mb-3">Follow Us</h3>
                  <div className="flex space-x-3">
                    {['facebook', 'instagram', 'pinterest', 'twitter'].map((social) => (
                      <a 
                        key={social} 
                        href="#" 
                        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-colors"
                        aria-label={social}
                      >
                        <i className={`fa-brands fa-${social} text-gray-700`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}