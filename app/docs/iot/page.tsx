export default function IoTDocs() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">IoT API Dokumentasjon</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">POST /api/ingest</h2>
          <p className="text-gray-600 mb-6">
            Send sensordata til AquaEnergy AI-plattformen. Dette endepunktet aksepterer JSON-data fra IoT-gateways.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Request Headers</h3>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <pre className="text-sm text-gray-800">
{`Content-Type: application/json
X-API-Key: your-api-key-here (placeholder)`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Request Body</h3>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <pre className="text-sm text-gray-800 overflow-x-auto">
{`{
  "gateway_id": "gateway-001",
  "timestamp": 1234567890,
  "sensors": [
    {
      "id": "sensor-energy-001",
      "type": "energy",
      "value": 123.45,
      "unit": "kWh"
    },
    {
      "id": "sensor-flow-001",
      "type": "flow",
      "value": 25.5,
      "unit": "m3/h"
    },
    {
      "id": "sensor-o2-001",
      "type": "oxygen",
      "value": 95.2,
      "unit": "%"
    },
    {
      "id": "sensor-temp-001",
      "type": "temperature",
      "value": 10.5,
      "unit": "°C"
    }
  ]
}`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Response</h3>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <pre className="text-sm text-gray-800">
{`{
  "status": "ok",
  "message": "Data ingested successfully",
  "gateway_id": "gateway-001",
  "timestamp": 1234567890,
  "sensors_received": 4
}`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Sensor Types</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <ul className="space-y-2 text-gray-700">
              <li><strong>energy</strong> - Energiforbruk (kWh)</li>
              <li><strong>flow</strong> - Vannstrøm (m³/h eller L/min)</li>
              <li><strong>oxygen</strong> - Oksygennivå (mg/L eller %)</li>
              <li><strong>temperature</strong> - Temperatur (°C)</li>
              <li><strong>vibration</strong> - Vibrasjon (g eller m/s²)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Eksempel med cURL</h3>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <pre className="text-sm text-gray-800 overflow-x-auto">
{`curl -X POST https://your-domain.com/api/ingest \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your-api-key" \\
  -d '{
    "gateway_id": "gateway-001",
    "timestamp": 1234567890,
    "sensors": [
      {
        "id": "sensor-energy-001",
        "type": "energy",
        "value": 123.45,
        "unit": "kWh"
      }
    ]
  }'`}
            </pre>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Merk:</strong> API-nøkkel-autentisering er for øyeblikket en placeholder. 
              I produksjon vil dette kreve ekte autentisering og validering.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}



