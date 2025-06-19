import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Help & Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Partner with us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Ride with us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Refund & Cancellation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow us</h3>
            <p className="text-gray-300 mb-4">Receive exclusive offers in your mailbox</p>
            <div className="flex">
              <Input type="email" placeholder="Enter your email" className="email-input rounded-r-none" />
              <Button className="bg-orange-500 hover:bg-orange-600 rounded-l-none">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            All rights Reserved © Your Company, 2023. Made with ❤️ by{" "}
            <a href="#" className="text-orange-500 hover:text-orange-400">
              Designmodo
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
