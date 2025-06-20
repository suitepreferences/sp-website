import { ShieldCheck } from "lucide-react";

function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl bg-white shadow-lg rounded-xl my-8 dark:bg-gray-800 dark:shadow-2xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center dark:text-white">
        <span className="inline-block mx-2 align-[-.2em]">
          <ShieldCheck className="h-[1.1em] w-[1.1em] text-green-600 dark:text-green-400" />
        </span>
        Privacy Policy for SuitePreferences
      </h1>
      <div className="prose prose-indigo max-w-none dark:prose-invert">
        <p className="dark:text-gray-300">
          This Privacy Policy describes how SuitePreferences ("we," "us," or "our") collects, uses, and discloses information when you use our Chrome Extension, SuitePreferences (the "Extension").
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">Information We Do Not Collect</h2>
        <p className="dark:text-gray-300">SuitePreferences is designed with your privacy in mind. We do not collect, store, or transmit any personal data from your browsing activity, including:</p>
        <ul className="dark:text-gray-300">
          <li class="pl-6">• Your browsing history.</li>
          <li class="pl-6">• Your search queries.</li>
          <li class="pl-6">• Your personal information (name, email, IP address, etc.).</li>
          <li class="pl-6">• Any data you input into websites.</li>
          <li class="pl-6">• Any data about your usage of other websites or applications.</li>
        </ul>
        <p className="dark:text-gray-300">
          All preferences and customizations you set within the SuitePreferences extension are stored locally on your device and are never sent to our servers or any third-party servers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">Information We May Collect (for Subscription Management)</h2>
        <p className="dark:text-gray-300">
          If you opt to purchase a subscription to SuitePreferences, we will use a secure, third-party payment processor. In this case, the following information related to your subscription may be
          processed by the payment processor and shared with us for billing and account management purposes:
        </p>
        <ul className="dark:text-gray-300">
          <li class="pl-6">• Your email address (for account identification and communication regarding your subscription).</li>
          <li class="pl-6">• Subscription tier and payment status.</li>
        </ul>
        <p className="dark:text-gray-300">
          We do not directly collect or store your credit card details or other sensitive payment information. This is handled entirely by our trusted payment processor.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">Data Security</h2>
        <p className="dark:text-gray-300">
          We take reasonable measures to protect the limited information we do collect (related to subscriptions) from unauthorized access, disclosure, alteration, or destruction.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">Changes to This Privacy Policy</h2>
        <p className="dark:text-gray-300">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy
          periodically for any changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">Contact Us</h2>
        <p className="dark:text-gray-300">If you have any questions about this Privacy Policy, please contact us:</p>
        <p className="dark:text-gray-300">
          By email:{" "}
          <a href="mailto:support@suitepreferences.com" className="text-indigo-600 hover:underline dark:text-indigo-400">
            support@suitepreferences.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default PrivacyPage;
