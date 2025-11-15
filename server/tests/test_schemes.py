from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

# ---------------------------------------------------------
# TEST: GET /view_schemes
# ---------------------------------------------------------
def test_view_schemes():
    response = client.get("/view_schemes")
    assert response.status_code == 200
    
    data = response.json()
    assert isinstance(data, list)

    # Check first object structure (if list not empty)
    if len(data) > 0:
        scheme = data[0]
        assert "Title" in scheme
        assert "Description" in scheme
        assert "Eligibility" in scheme
        assert "Benefits" in scheme
        assert "SchemeID" in scheme


# ---------------------------------------------------------
# TEST: GET /search_schemes
# ---------------------------------------------------------
def test_search_schemes():
    response = client.get("/search_schemes?query=yojana")
    assert response.status_code == 200

    data = response.json()
    assert isinstance(data, list)

    if len(data) > 0:
        scheme = data[0]
        assert "Title" in scheme
        assert "Description" in scheme
        assert "Eligibility" in scheme
        assert "Benefits" in scheme
        assert "SchemeID" in scheme


# ---------------------------------------------------------
# TEST: POST /manage_scheme
# ---------------------------------------------------------
def test_post_manage_scheme():
    payload = {
        "Title": "Test Scheme",
        "Description": "Test Description",
        "Eligibility": "Anyone",
        "Benefits": "Test Benefits"
    }

    response = client.post("/manage_scheme", json=payload)

    assert response.status_code == 200 or response.status_code == 201

    data = response.json()

    # Validate response fields
    assert data["Title"] == payload["Title"]
    assert data["Description"] == payload["Description"]
    assert data["Eligibility"] == payload["Eligibility"]
    assert data["Benefits"] == payload["Benefits"]
    assert "SchemeID" in data  # server should generate ID


# ---------------------------------------------------------
# TEST: DELETE /manage_scheme/{scheme_id}
# ---------------------------------------------------------
def test_delete_manage_scheme():
    # STEP 1: Create a scheme to delete
    payload = {
        "Title": "Temp Scheme",
        "Description": "Delete Test",
        "Eligibility": "Test",
        "Benefits": "None"
    }

    create_res = client.post("/manage_scheme", json=payload)
    assert create_res.status_code in [200, 201]

    created = create_res.json()
    scheme_id = created["SchemeID"]

    # STEP 2: Delete the created scheme
    delete_res = client.delete(f"/manage_scheme/{scheme_id}")
    assert delete_res.status_code == 200

    delete_data = delete_res.json()
    assert "message" in delete_data
    assert delete_data["message"].lower().startswith("scheme")
