import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_image_endpoint(client):
    # Test with the first product ID from the products endpoint
    response = client.get('/products')
    first_product_id = response.get_json()['items'][0]['id']
    
    # Request the image for this product
    image_response = client.get(f'/images/{first_product_id}')
    
    # Check the response
    assert image_response.status_code == 200
    assert image_response.content_type.startswith('image/')
    assert len(image_response.data) > 0  # Check we got some binary data 
