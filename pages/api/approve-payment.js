export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { paymentId } = req.body;

    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Key ${process.env.PI_API_KEY}`
        }
      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    console.error("Approve Error:", error);
    return res.status(500).json({ error: "Approval failed" });
  }
}
