import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.onload = () => {
      window.Pi.init({ version: "2.0", sandbox: true });
    };
    document.body.appendChild(script);
  }, []);

  async function startPayment() {
    // مصادقة المستخدم
    await window.Pi.authenticate(["payments"]);

    // طلب إنشاء الدفع من السيرفر
    const res = await fetch("/api/create_payment", { method: "POST" });
    const payment = await res.json();

    // فتح نافذة الدفع
    window.Pi.openPayment(payment, {
      onReadyForServerApproval: async function(paymentId) {
        await fetch("/api/approve_payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId })
        });
      },

      onComplete: function(paymentId, txid) {
        alert("✅ Payment Completed\nTXID: " + txid);
      },

      onCancel: function() {
        alert("Payment Cancelled");
      },

      onError: function(err) {
        console.error(err);
        alert("Payment Error");
      }
    });
  }

  return (
    <div style={{ textAlign:"center", marginTop:"50px" }}>
      <h1>Souqmarine Sandbox</h1>
      <button onClick={startPayment}>
        Test Pi Payment
      </button>
    </div>
  );
}
