import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";

export default function Footer() {
  
  return (
    <div>
      <footer className="bg-emerald-800 text-white pt-12 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Fresh Cart</h3>
              <p className="text-gray-300 leading-relaxed">
                We provide you with the best products at competitive prices with a fast and safe delivery service.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="hover:text-emerald-300 transition-colors">
                    About the company
                  </a>
                </li>
                <li>
                  <a href="/products" className="hover:text-emerald-300 transition-colors">
                    Products
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-emerald-300 transition-colors">
                    Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-emerald-300 transition-colors">
                    Terms and Conditions
                  </a>
                </li>
              </ul>
            </div>

         
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/contact" className="hover:text-emerald-300 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/returns" className="hover:text-emerald-300 transition-colors">
                    Return Policy
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-emerald-300 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/tracking" className="hover:text-emerald-300 transition-colors">
                    Order Tracking
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-emerald-700 rounded-full hover:bg-emerald-600">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="p-2 bg-emerald-700 rounded-full hover:bg-emerald-600">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="p-2 bg-emerald-700 rounded-full hover:bg-emerald-600">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="p-2 bg-emerald-700 rounded-full hover:bg-emerald-600">
                  <FaLinkedin size={20} />
                </a>
              </div>
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4">Payment Methods</h4>
                <div className="flex space-x-4">
                  <FaCcVisa size={30} className="text-gray-300" />
                  <FaCcMastercard size={30} className="text-gray-300" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-emerald-700 mt-8 py-6">
            <div className="text-center text-gray-300">
              <p>© 2025 Fresh Cart. All rights reserved.</p>
              <p className="mt-2">
                Designed and developed by{" "}
                <a href="#" className="text-emerald-300 hover:underline">
                  Fresh Cart Team
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
};
