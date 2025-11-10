import { useEffect, useState } from "react";
import { testConnection } from "./app/api/testApi";

function App() {
  const [message, setMessage] = useState<string>(
    "Testing backend connection..."
  );

  useEffect(() => {
    const checkBackend = async () => {
      const result = await testConnection();
      if (result)
        setMessage(`✅ Connected to backend: ${JSON.stringify(result)}`);
      else setMessage(" Could not connect to backend");
    };
    checkBackend();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Backend Connection Test</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
