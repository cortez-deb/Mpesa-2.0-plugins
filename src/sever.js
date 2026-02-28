import app from "./index.js";

const port = process.env.PORT || 4000;

app.get("/api/v1/health", (req, res) => {
    res.send("Mpesa 2.0 Plugin Service is running");
  });
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });