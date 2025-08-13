import Head from "next/head";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-rose-50">
      <title>Terms of Service | Milk pukki</title>
      <section className="relative h-64 flex items-center justify-center bg-gradient-to-r from-rose-100 to-amber-100">
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl font-bold text-rose-800 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-rose-700">
            Effective: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
          <div className="prose prose-lg max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-rose-800 mb-6">
              Welcome to Milk pukki
            </h2>
            <p>
              By accessing our website or purchasing our products, you agree to
              these Terms of Service. Please read them carefully.
            </p>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              1. General Terms
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 18 years old to place orders</li>
              <li>Accounts are personal and non-transferable</li>
              <li>We reserve the right to refuse service to anyone</li>
              <li>Prices are subject to change without notice</li>
            </ul>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              2. Product Information
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                We make every effort to display product colors and images
                accurately
              </li>
              <li>
                All dairy products are perishable and require refrigeration
              </li>
              <li>Product availability may vary by season</li>
              <li>
                We cannot guarantee allergen-free environments (contains milk)
              </li>
            </ul>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              3. Ordering & Payment
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Orders are processed within 24 business hours</li>
              <li>We accept Visa, Mastercard, American Express, and PayPal</li>
              <li>Your order is not confirmed until payment is processed</li>
              <li>Sales tax will be added where applicable</li>
            </ul>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              4. Delivery & Returns
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Delivery areas are limited to our service regions</li>
              <li>
                Perishable items cannot be returned (see our{" "}
                <a href="/faq" className="text-rose-600 hover:underline">
                  FAQ
                </a>{" "}
                for refund policy)
              </li>
              <li>
                You&apos;re responsible for providing accurate delivery
                information
              </li>
              <li>Risk of loss transfers to you upon delivery</li>
            </ul>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              5. Account Responsibilities
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must keep login credentials secure</li>
              <li>Notify us immediately of unauthorized account access</li>
              <li>Accounts may be terminated for violations of these terms</li>
            </ul>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              6. Intellectual Property
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>All website content is owned by Milk pukki</li>
              <li>
                &quot;Milk pukki&quot; and our logo are registered trademarks
              </li>
              <li>No content may be reproduced without permission</li>
            </ul>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              7. Limitation of Liability
            </h3>
            <p>Milk pukki shall not be liable for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Any incidental or consequential damages</li>
              <li>
                Product issues caused after delivery (improper storage, etc.)
              </li>
              <li>Service interruptions beyond our reasonable control</li>
            </ul>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              8. Governing Law
            </h3>
            <p>
              These terms shall be governed by the laws of California. Any
              disputes shall be resolved in the state courts of Farmville
              County.
            </p>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              9. Changes to Terms
            </h3>
            <p>
              We may update these terms periodically. Continued use of our
              services constitutes acceptance of the revised terms.
            </p>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              10. Contact Information
            </h3>
            <p>
              For questions about these terms:
              <br />
              <strong>Email:</strong>{" "}
              <a
                href="mailto:legal@milkpukki.com"
                className="text-rose-600 hover:underline"
              >
                legal@milkpukki.com
              </a>
              <br />
              <strong>Mail:</strong> Milk pukki Legal Department, Akaki kality
             
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
