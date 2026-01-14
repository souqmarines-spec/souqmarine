import Head from "next/head";
import Script from "next/script";

export default function Home() {

  async function startPayment() {
    Pi.init({ version: "2.0", sandbox: true });

    try {
      const auth = await Pi.authenticate(["payments"]);
      console.log("Auth OK:", auth);

      Pi.createPayment(
        {
          amount: 0.01,
          memo: "Souqmarine Test Payment",
          metadata: { orderId: "souqmarine-test-001" }
        },
        {
          onReadyForServerApproval: async function (paymentId) {
            await fetch("/api/approve-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId })
            });
          },

          onReadyForServerCompletion: function (paymentId, txid) {
            alert("✅ Payment Successful!");
          },

          onCancel: function () {
            alert("❌ Payment Cancelled");
          },

          onError: function (err) {
            console.error(err);
            alert("❌ Error: " + err.message);
          }
        }
      );

    } catch (e) {
      alert("Authentication failed");
    }
  }

  return (
    <>
      <Head>
        <title>Souqmarine Pi Sandbox</title>
      </Head>

      <Script 
        src="https://sdk.minepi.com/pi-sdk.js" 
        strategy="beforeInteractive" 
      />

      <h2>Souqmarine Pi Sandbox</h2>
      <button onClick={startPayment}>
        Pay 0.01 Test Pi
      </button>
    </>
  );
}
