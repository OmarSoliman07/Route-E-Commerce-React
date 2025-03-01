import { Link } from "react-router-dom";
import amazonpay from "../../assets/images/Footer Imgs/amazonpay.svg";
import americanexp from "../../assets/images/Footer Imgs/american-express.svg";
import mastercard from "../../assets/images/Footer Imgs/mastercard.svg";
import paypal from "../../assets/images/Footer Imgs/paypal.svg";
import visa from "../../assets/images/Footer Imgs/visa.svg";
import googleplay from "../../assets/images/Footer Imgs/googleplay-btn.svg";
import appstore from "../../assets/images/Footer Imgs/appstore-btn.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm py-8 px-6 md:px-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Categories */}
        <div className="cursor-default">
          <h3 className="font-bold mb-3">Categories</h3>
          <ul className="space-y-2">
            <li>Vegetables & Fruits</li>
            <li>Breakfast & instant food</li>
            <li>Bakery & Biscuits</li>
            <li>Atta, rice & dal</li>
            <li>Sauces & spreads</li>
            <li>Organic & gourmet</li>
          </ul>
        </div>

        {/* Get to know us */}
        <div className="cursor-default">
          <h3 className="font-bold mb-3">Get to know us</h3>
          <ul className="space-y-2">
            <li>Company</li>
            <li>About</li>
            <li>Blog</li>
            <li>Help Center</li>
            <li>Our Value</li>
          </ul>
        </div>

        {/* For Consumers */}
        <div className="cursor-default">
          <h3 className="font-bold mb-3">For Consumers</h3>
          <ul className="space-y-2">
            <li>Payments</li>
            <li>Shipping</li>
            <li>Product Returns</li>
            <li>FAQ</li>
            <li>Shop Checkout</li>
          </ul>
        </div>

        {/* Become a Shopper */}
        <div className="cursor-default">
          <h3 className="font-bold mb-3">Become a Shopper</h3>
          <ul className="space-y-2">
            <li>Shopper Opportunities</li>
            <li>Become a Shopper</li>
            <li>Earnings</li>
            <li>Ideas & Guides</li>
            <li>New Retailers</li>
          </ul>
        </div>
      </div>

      <hr className="mt-8 bg-[#dfe2e1]" />

      {/* Payment Partners & App Downloads */}
      <div className="flex flex-wrap justify-between items-center mt-4 gap-7 md:flex-nowrap md:gap-7">
        {/* Payment Partners */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-7">
          <p className="font-semibold text-center w-full md:w-auto">Payment Partners</p>
          <img className="h-6 md:h-8" src={amazonpay} alt="Amazon Pay" />
          <img className="h-6 md:h-8" src={americanexp} alt="American Express" />
          <img className="h-6 md:h-8" src={mastercard} alt="MasterCard" />
          <img className="h-6 md:h-8" src={paypal} alt="PayPal" />
          <img className="h-6 md:h-8" src={visa} alt="Visa" />
        </div>

        {/* Get deliveries */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-7">
          <p className="font-semibold text-center w-full md:w-auto">Get deliveries with FreshCart</p>
          <img className="w-28 md:w-36" src={googleplay} alt="Google Play" />
          <img className="w-28 md:w-36" src={appstore} alt="App Store" />
        </div>
      </div>

      <hr className="mt-8 bg-[#dfe2e1]" />

      <div className="flex justify-between items-center mt-4 font-semibold">
        <p className="text-center mt-4">
          © 2025 FreshCart. by <span className="text-main">Omar Soliman</span>
        </p>

        <div className="flex items-center gap-3">
          <p>Follow us on:</p>
          <a className=""
            href="https://www.linkedin.com/in/omar-soliman-profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/OmarSoliman07"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
