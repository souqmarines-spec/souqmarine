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
    await window.Pi.authenticate(["payments"]);

    const res = await fetch("/api/create_payment", { method: "POST" });
    const payment = await res.json();

    window.Pi.openPayment(payment, {
      onComplete(paymentId, txid) {
        alert("Payment Successful ✔️");
      },
      onCancel() {
        alert("Payment Cancelled");
      },
      onError(e) {
        alert("Payment Error");
      }
    });
  }

  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>
      <h1>Souqmarine Sandbox</h1>
      <button onClick={startPayment}>
        Test Pi Payment
      </button>
    </div>
  );
}
