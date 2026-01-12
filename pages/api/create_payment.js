export default async function handler(req, res) {

  const response = await fetch(
    "https://sandbox.minepi.com/v2/payments",
    {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.PI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 0.01,
        memo: "Souqmarine Sandbox Test"
      })
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
