import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-rose-50">
      <title>Privacy Policy | Milk pukki</title>

      <section className="relative h-64 flex items-center justify-center bg-gradient-to-r from-rose-100 to-amber-100">
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl font-bold text-rose-800 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-rose-700">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
          <div className="prose prose-lg max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-rose-800 mb-6">
              Your Privacy Matters
            </h2>
            <p>
              At Milk pukki, we&apos;re committed to protecting your personal
              information. This policy explains how we collect, use, and
              safeguard your data when you visit our website or purchase our
              products.
            </p>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              1. Information We Collect
            </h3>
            <p>We may collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> Name, email, phone
                number, shipping address when you place an order
              </li>
              <li>
                <strong>Payment Information:</strong> Processed securely through
                our payment providers (we don&apos;t store credit card details)
              </li>
              <li>
                <strong>Usage Data:</strong> How you interact with our website
                (pages visited, device information)
              </li>
              <li>
                <strong>Cookies:</strong> To improve your browsing experience
                (you can manage preferences in your browser)
              </li>
            </ul>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              2. How We Use Your Information
            </h3>
            <p>Your data helps us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and deliver your orders</li>
              <li>Provide customer support</li>
              <li>Improve our products and services</li>
              <li>Send relevant offers (only with your consent)</li>
              <li>Comply with legal requirements</li>
            </ul>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              3. Data Sharing
            </h3>
            <p>
              We <strong>never</strong> sell your information. We may share
              with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Shipping carriers to deliver your orders</li>
              <li>Payment processors to complete transactions</li>
              <li>
                Service providers who assist our business (under strict
                confidentiality)
              </li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              4. Data Security
            </h3>
            <p>We implement:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SSL encryption for all data transfers</li>
              <li>Secure storage with limited access</li>
              <li>Regular security audits</li>
            </ul>
            <p className="mt-4">
              While we take reasonable precautions, no internet transmission is
              100% secure. We cannot guarantee absolute security.
            </p>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              5. Your Rights
            </h3>
            <p>You may:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, update, or delete your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request details about data we hold</li>
              <li>Withdraw consent (where applicable)</li>
            </ul>
            <p className="mt-4">
              Contact us at{" "}
              <a
                href="mailto:privacy@milkpukki.com"
                className="text-rose-600 hover:underline"
              >
                privacy@milkpukki.com
              </a>{" "}
              to exercise these rights.
            </p>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              6. Children&apos;s Privacy
            </h3>
            <p>
              Our services are not directed to children under 13. We do not
              knowingly collect personal information from children. If we become
              aware of such collection, we&apos;ll take steps to delete it.
            </p>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              7. Policy Changes
            </h3>
            <p>
              We may update this policy periodically. The updated version will
              be posted here with a new &quot;Last Updated&quot; date.
              Significant changes will be communicated via email (if we have
              your contact information).
            </p>

            <h3 className="text-xl font-bold text-rose-800 mt-8 mb-4">
              8. Contact Us
            </h3>
            <p>
              For privacy-related questions or concerns:
              <br />
              <strong>Email:</strong>{" "}
              <a
                href="mailto:privacy@milkpukki.com"
                className="text-rose-600 hover:underline"
              >
                privacy@milkpukki.com
              </a>
              <br />
              <strong>Mail:</strong> Milk pukki Privacy Officer, Akaki kality
        
              <br />
              <strong>Phone:</strong> +251 1234567 (Mon-Fri, 9am-5pm PST)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
