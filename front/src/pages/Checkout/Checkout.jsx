// Payment.js
import React, { useState } from 'react';

export default function Payment() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send the data to an API
    console.log('Form Data Submitted:', formData);
  };

  return (
    <section className="my-20">
      <h1 className="text-center text-5xl">Checkout</h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-10 mt-10">
          {/* Order Summary */}
          <div className="col-span-5">
            <h2 className="font-bold text-lg py-2">Your order</h2>
            <div className="border rounded-md text-zinc-500">
              <div className="border-b py-2">
                <div className="mx-5 flex justify-between">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>
              </div>

              {/* Order Item 1 */}
              <div className="border-b py-5">
                <div className="mx-5 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-md overflow-hidden">
                      <img
                        src="https://websitedemos.net/egrow-plants-04/wp-content/uploads/sites/1114/2022/07/flower-02-a-400x550.jpg"
                        alt="Christmas Cactus"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-500 font-semibold">Christmas Cactus</div>
                    </div>
                    <strong className="product-quantity text-gray-500">×1</strong>
                  </div>
                  <div>
                    <span>$70.00</span>
                  </div>
                </div>
              </div>

              {/* Order Item 2 */}
              <div className="border-b py-5">
                <div className="mx-5 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-md overflow-hidden">
                      <img
                        src="https://websitedemos.net/egrow-plants-04/wp-content/uploads/sites/1114/2022/07/flower-008-a-400x550.jpg"
                        alt="Christmas Cactus"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-500 font-semibold">Christmas Cactus</div>
                    </div>
                    <strong className="product-quantity text-gray-500">×1</strong>
                  </div>
                  <div>
                    <span>$50.00</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between mx-5 border-b py-2">
                <span className="text-xl font-semibold">Total</span>
                <span className="text-xl font-semibold">$120.00</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="col-span-7">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-4 border rounded">
              <h2 className="text-2xl mb-4 font-bold text-center">Payment Form</h2>

              {/* Name */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              {/* Card Number */}
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  maxLength="19" // Limit input to 16 digits + dashes
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              {/* Expiry Date */}
              <div className="mb-4">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date (MM/YY)</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  maxLength="5" // Format: MM/YY
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              {/* CVV */}
              <div className="mb-4">
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  maxLength="3" // CVV is usually 3 digits
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              <button
                type="submit"
                className="w-full p-2 bg-black text-white rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
