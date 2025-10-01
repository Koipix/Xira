const features = [14,8,5,9,0];

async function handlePredict() {
  const res = await fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features }),
  });
  const data = await res.json();
  // console.log("Prediction:", data.prediction);
  console.log(data);
}

handlePredict().catch(console.error);

