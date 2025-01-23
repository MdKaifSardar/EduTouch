import React from "react";
import Link from "next/link";

const WhatsAppButton: React.FC = () => {
  const whatsappNumber = "9123648141"; // Your WhatsApp number
  const whatsappMessage = "Hello, I'm interested in your services!";

  return (
    <Link
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`}
      passHref
      legacyBehavior
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="z-[500] fixed bottom-4 right-4 bg-green-500 text-white rounded-full shadow-lg p-4 hover:bg-green-600 transition-transform transform hover:scale-110"
        aria-label="Chat with us on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path d="M12 0C5.371 0 0 5.373 0 12c0 2.123.552 4.16 1.602 5.973L0 24l6.237-1.568C8.003 23.45 9.99 24 12 24c6.629 0 12-5.373 12-12S18.629 0 12 0zm6.563 17.146c-.257.721-1.494 1.366-2.045 1.448-.523.077-1.197.143-3.905-1.248-3.3-1.619-5.44-5.616-5.61-5.88-.176-.257-1.343-1.778-1.343-3.396s.847-2.423 1.146-2.751c.263-.281.705-.351.941-.351.234 0 .468.002.669.012.212.01.503-.082.79.605.286.689.975 2.374 1.063 2.546.087.175.146.377.029.606-.117.229-.176.37-.35.563-.175.193-.371.429-.529.576-.175.165-.358.343-.156.677.199.334.883 1.453 1.896 2.352 1.303 1.156 2.402 1.516 2.734 1.675.332.158.521.131.716-.078.195-.209.82-.956 1.039-1.286.22-.33.441-.271.733-.165.292.107 1.846.87 2.156 1.027.312.158.523.236.605.367.086.133.086.768-.172 1.49z" />
        </svg>
      </a>
    </Link>
  );
};

export default WhatsAppButton;
