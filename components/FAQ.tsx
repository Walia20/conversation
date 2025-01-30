"use client";
import { useState } from "react";

export default function FAQSection(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isJSONVisible, setIsJSONVisible] = useState(false);

  const toggleFAQ = (): void => {
    setIsOpen(!isOpen);
  };

  const toggleJSONSection = (): void => {
    setIsJSONVisible(!isJSONVisible);
  };

  const faqItems = [
    {
      question: "I want to know my order status",
    },
    {
      question: "I want to cancel my order",
    },
  ];

  const sampleCustomerData = {
    user_id: "ankit1234",
    contact: 9876543210,
    user_name: "Ankit Sharma",
    location: "Mumbai",
    otp: 234567,
    orders: [
      {
        order_id: "ORD001",
        order_item: "Laptop",
        status: "Delivered",
        order_date: "2024-11-25",
      },
      {
        order_id: "ORD002",
        order_item: "Smartwatch",
        status: "Processing",
        order_date: "2024-12-20",
      },
    ],
  };

  return (
    <>
      {/* FAQ Button */}
      {!isOpen && (
        <button
          onClick={toggleFAQ}
          className="fixed top-4 right-4 p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 z-50 border-2 border-white focus:outline-none focus:ring-4 focus:ring-pink-300"
          aria-label="Open FAQ Section"
        >
          FAQ
        </button>
      )}

      {/* FAQ Section */}
      {isOpen && (
        <div
          className={`fixed top-0 right-0 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 shadow-2xl border-l border-pink-300 transform transition-all duration-300 ease-in-out z-50 max-w-xs w-full ${
            isJSONVisible ? "max-h-[calc(100%-4rem)]" : "max-h-[calc(100%-8rem)]"
          }`}
          aria-labelledby="faq-title"
          role="dialog"
        >
          {/* FAQ Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-300 text-white border-b border-pink-300 shadow-md">
            <h2 id="faq-title" className="text-lg font-bold">
              FAQ
            </h2>
            <button
              onClick={toggleFAQ}
              className="text-white hover:text-gray-200"
              aria-label="Close FAQ Section"
            >
              ✕
            </button>
          </div>

          {/* FAQ Content */}
          <div
            className="p-4 space-y-4 text-gray-800 overflow-y-auto scrollbar-hide"
            style={{ maxHeight: "calc(100vh - 8rem)" }} // Ensures the content area height is less than the viewport
          >
            {faqItems.map((item, index) => (
              <FAQItem key={index} question={item.question} />
            ))}

            {/* JSON Data Section Toggle */}
            <button
              onClick={toggleJSONSection}
              className="mt-4 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 text-white rounded-md p-2 shadow-md hover:scale-105 hover:shadow-lg transition-transform"
            >
              {isJSONVisible ? "Hide Sample Data" : "Show Sample Data"}
            </button>

            {isJSONVisible && (
              <div className="mt-2 p-4 bg-gray-100 rounded-md shadow-inner text-sm text-gray-700">
                <h3 className="font-semibold mb-2">Customer Data:</h3>
                <ul className="space-y-2">
                  <li><strong>User ID:</strong> {sampleCustomerData.user_id}</li>
                  <li><strong>Contact:</strong> {sampleCustomerData.contact}</li>
                  <li><strong>User Name:</strong> {sampleCustomerData.user_name}</li>
                  <li><strong>Location:</strong> {sampleCustomerData.location}</li>
                  <li><strong>OTP:</strong> {sampleCustomerData.otp}</li>
                  <li>
                    <strong>Orders:</strong>
                    <ul className="ml-4 list-disc">
                      {sampleCustomerData.orders.map((order, index) => (
                        <li key={index}>
                          <strong>Order ID:</strong> {order.order_id}, <strong>Item:</strong> {order.order_item}, <strong>Status:</strong> {order.status}, <strong>Date:</strong> {order.order_date}
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Bottom Line / Footer */}
         
        </div>
      )}
    </>
  );
}

// FAQ Item Component
interface FAQItemProps {
  question: string;
}

function FAQItem({ question }: FAQItemProps): JSX.Element {
  return (
    <div
      className="p-3 bg-white rounded-md shadow-md hover:bg-purple-100 transition-transform transform hover:scale-105"
      role="region"
      aria-labelledby={`faq-question-${question}`}
    >
      <h3
        id={`faq-question-${question}`}
        className="text-sm font-semibold text-gray-700"
      >
        {question}
      </h3>
    </div>
  );
}
