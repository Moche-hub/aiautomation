import requests

try:
    res = requests.post(
        "http://localhost:8000/api/generate-brand",
        json={
            "business_name": "TestCorp",
            "industry": "Software",
            "target_audience": "Developers",
            "style": "Minimalist"
        }
    )
    print("Status:", res.status_code)
    print("Response:", res.text)
except Exception as e:
    print("Exception request:", e)
