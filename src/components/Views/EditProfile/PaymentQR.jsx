// components/PaymentQR.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQrcode, FaCreditCard, FaMobileAlt, FaMoneyBillWave, FaShieldAlt, FaCheckCircle, FaArrowRight, FaCopy, FaWallet, FaUniversity, FaPaypal, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';
import QRCode from 'react-qr-code';

const PaymentQR = ({darkMode}) => {
  const [amount, setAmount] = useState('100.00');
  const [upiId, setUpiId] = useState('yourupi@upi');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleUpiIdChange = (e) => {
    setUpiId(e.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulatePayment = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const generateUpiString = () => {
    return `upi://pay?pa=${upiId}&pn=John%20Doe&am=${amount}&cu=INR`;
  };

  const faqs = [
    {
      question: "Is this payment secure?",
      answer: "Yes, all payments are processed through secure channels with 256-bit SSL encryption."
    },
    {
      question: "How long does payment confirmation take?",
      answer: "UPI payments are usually confirmed instantly. Other methods may take 1-3 business days."
    },
    {
      question: "Can I get a refund?",
      answer: "Refunds are processed according to our refund policy. Please contact support for assistance."
    },
    {
      question: "Are there any transaction fees?",
      answer: "No, we don't charge any additional transaction fees for payments."
    }
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <section id="payment-qr" className="py-16 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900 dark:to-blue-900 relative overflow-hidden">
        {/* Geometric Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern" style={{ backgroundImage: 'radial-gradient(circle, #0d9488 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-2 font-playfair text-gray-900 dark:text-white"
            >
              Quick Payment
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '80px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto"
            ></motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-poppins"
            >
              Make secure payments quickly using your preferred method. All transactions are encrypted and protected.
            </motion.p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-5 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <FaQrcode className="text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-playfair">Secure Payment</h3>
                      <p className="text-xs text-teal-100 font-poppins">Multiple payment options available</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaShieldAlt className="mr-2" />
                    <span className="text-sm font-poppins">256-bit SSL</span>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {showSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mx-auto mb-4">
                      <FaCheckCircle className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 font-playfair text-gray-900 dark:text-white">Payment Successful!</h3>
                    <p className="text-teal-600 dark:text-teal-400 mb-6 font-poppins">
                      Thank you for your payment. A confirmation has been sent to your email.
                    </p>
                    <button 
                      onClick={() => setShowSuccess(false)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg font-medium font-poppins"
                    >
                      Make Another Payment
                    </button>
                  </motion.div>
                ) : (
                  <>
                    {/* Amount Input */}
                    <div className="mb-6">
                      <label className="block text-sm text-teal-600 dark:text-teal-400 mb-2 font-poppins">
                        Payment Amount (₹)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 dark:text-gray-400 font-poppins">₹</span>
                        </div>
                        <input
                          type="number"
                          value={amount}
                          //onChange={handleAmountChange}
                          min="1"
                          step="0.01"
                          className="w-full pl-8 pr-4 py-3 border border-teal-300 dark:border-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 font-poppins text-gray-900 dark:text-white"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    
                    {/* UPI ID Input */}
                    <div className="mb-6">
                      <label className="block text-sm text-teal-600 dark:text-teal-400 mb-2 font-poppins">
                        UPI ID
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value={upiId}
                          onChange={handleUpiIdChange}
                          className="flex-1 px-4 py-3 border border-teal-300 dark:border-teal-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 font-poppins text-gray-900 dark:text-white"
                          placeholder="yourupi@upi"
                        />
                        <button
                          onClick={copyToClipboard}
                          className="px-4 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600 transition-colors flex items-center font-poppins"
                        >
                          <FaCopy className="mr-2" />
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* QR Code Section */}
                      <div className="md:w-2/5 flex flex-col items-center">
                        <div className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 p-5 rounded-2xl border border-teal-200 dark:border-teal-700 mb-5 w-full">
                          <div className="flex justify-center mb-4">
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                              <QRCode 
                                value={generateUpiString()} 
                                size={140}
                              />
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-teal-700 dark:text-teal-300 font-poppins mb-1">Scan with UPI App</p>
                            <div className="flex items-center justify-center text-xs text-teal-600 dark:text-teal-400">
                              <FaMobileAlt className="mr-1" />
                              <span>Google Pay, PhonePe, Paytm</span>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={simulatePayment}
                          className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg font-medium flex items-center justify-center font-poppins hover:shadow-md transition-all"
                        >
                          Simulate Payment
                        </button>
                        
                        <div className="flex items-center justify-center w-full py-2 px-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-700 mt-4">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm font-poppins text-gray-700 dark:text-gray-300">Instant confirmation</span>
                        </div>
                      </div>
                      
                      {/* Payment Methods Section */}
                      <div className="md:w-3/5">
                        <h3 className="text-lg font-bold mb-4 font-playfair text-gray-900 dark:text-white">Other Payment Options</h3>
                        
                        <div className="space-y-4 mb-6">
                          {/* Card Payment */}
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="group"
                          >
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700 h-full transition-all duration-300 hover:shadow-md cursor-pointer"
                                 onClick={() => setPaymentMethod('card')}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center mr-4 shadow-sm">
                                    <FaCreditCard className="text-blue-500 text-xl" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold font-poppins text-gray-900 dark:text-white">Card Payment</h4>
                                    <p className="text-sm text-blue-600 dark:text-blue-400 font-poppins">Credit/Debit cards</p>
                                  </div>
                                </div>
                                <FaArrowRight className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </motion.div>
                          
                          {/* Bank Transfer */}
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="group"
                          >
                            <div className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-xl p-4 border border-teal-200 dark:border-teal-700 h-full transition-all duration-300 hover:shadow-md cursor-pointer"
                                 onClick={() => setPaymentMethod('bank')}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center mr-4 shadow-sm">
                                    <FaUniversity className="text-teal-500 text-xl" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold font-poppins text-gray-900 dark:text-white">Bank Transfer</h4>
                                    <p className="text-sm text-teal-600 dark:text-teal-400 font-poppins">Direct bank payment</p>
                                  </div>
                                </div>
                                <FaArrowRight className="text-teal-500 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </motion.div>
                          
                          {/* Wallet Payment */}
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="group"
                          >
                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700 h-full transition-all duration-300 hover:shadow-md cursor-pointer"
                                 onClick={() => setPaymentMethod('wallet')}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center mr-4 shadow-sm">
                                    <FaWallet className="text-purple-500 text-xl" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold font-poppins text-gray-900 dark:text-white">E-Wallets</h4>
                                    <p className="text-sm text-purple-600 dark:text-purple-400 font-poppins">Paytm, Mobikwik, etc.</p>
                                  </div>
                                </div>
                                <FaArrowRight className="text-purple-500 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </motion.div>
                          
                          {/* PayPal */}
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="group"
                          >
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700 h-full transition-all duration-300 hover:shadow-md cursor-pointer"
                                 onClick={() => setPaymentMethod('paypal')}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center mr-4 shadow-sm">
                                    <FaPaypal className="text-yellow-500 text-xl" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold font-poppins text-gray-900 dark:text-white">PayPal</h4>
                                    <p className="text-sm text-yellow-600 dark:text-yellow-400 font-poppins">International payments</p>
                                  </div>
                                </div>
                                <FaArrowRight className="text-yellow-500 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </motion.div>
                        </div>
                        
                        {/* Security Badge */}
                        <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl p-4 text-white">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                              <FaShieldAlt className="text-xl" />
                            </div>
                            <div>
                              <h4 className="font-bold font-poppins">Secure Transaction</h4>
                              <p className="text-xs text-teal-100 font-poppins">Your payment information is encrypted and secure</p>
                            </div>
                            <div className="ml-auto">
                              <FaCheckCircle className="text-2xl" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
            
            {/* FAQ Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-teal-100 dark:border-teal-800"
            >
              <div className="p-5 bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowFAQ(!showFAQ)}>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <FaQuestionCircle className="text-lg" />
                    </div>
                    <h3 className="text-lg font-bold font-playfair">Payment FAQs</h3>
                  </div>
                  <div className={`transform transition-transform ${showFAQ ? 'rotate-180' : ''}`}>
                    <FaArrowRight />
                  </div>
                </div>
              </div>
              
              {showFAQ && (
                <div className="p-6">
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                        <h4 className="font-bold font-poppins text-teal-700 dark:text-teal-300 flex items-center">
                          <FaInfoCircle className="mr-2" />
                          {faq.question}
                        </h4>
                        <p className="mt-2 text-gray-600 dark:text-gray-300 font-poppins">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-6"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-teal-100 dark:border-teal-800">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-teal-700 dark:text-teal-300 font-poppins">Payment confirmation sent to your email</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PaymentQR;