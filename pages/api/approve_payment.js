export default async function handler(req, res) {
  const { paymentId } = req.body;

  const response = await fetch(
    `https://sandbox.minepi.com/v2/payments/${paymentId}/approve`,
    {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.PI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
