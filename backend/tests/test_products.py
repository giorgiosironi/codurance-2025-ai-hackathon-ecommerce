import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_products_endpoint(client):
    response = client.get('/products')
    assert response.status_code == 200
    
    data = response.get_json()
    assert 'items' in data
    assert len(data['items']) == 20
    
    # Check the structure of the first item
    first_item = data['items'][0]
    assert 'id' in first_item
    assert 'productDisplayName' in first_item
    assert isinstance(first_item['id'], (int, str))
    assert isinstance(first_item['productDisplayName'], str) 
