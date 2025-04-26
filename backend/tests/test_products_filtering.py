import pytest
import csv
import os
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def count_matching_rows_in_csv(property_name, value):
    """Helper function to count rows in CSV that match a given property value"""
    count = 0
    csv_path = os.path.join(os.path.dirname(__file__), '..', 'styles.csv')
    
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row[property_name] == value:
                count += 1
            if count >= 20:  # We only care about the first 20 rows
                break
    return count

def test_filter_by_category(client):
    # Get all unique categories from the first 20 rows
    categories = set()
    csv_path = os.path.join(os.path.dirname(__file__), '..', 'styles.csv')
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            if i >= 20:
                break
            categories.add(row['articleType'])
    
    # Test filtering for each category
    for category in categories:
        expected_count = count_matching_rows_in_csv('articleType', category)
        
        response = client.get(f'/products?articleType={category}')
        assert response.status_code == 200
        
        data = response.get_json()
        assert len(data['items']) == expected_count
        
        # Verify all returned items match the filter
        for item in data['items']:
            assert item['articleType'] == category

def test_filter_by_season(client):
    # Get all unique seasons from the first 20 rows
    seasons = set()
    csv_path = os.path.join(os.path.dirname(__file__), '..', 'styles.csv')
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            if i >= 20:
                break
            seasons.add(row['season'])
    
    # Test filtering for each season
    for season in seasons:
        expected_count = count_matching_rows_in_csv('season', season)
        
        response = client.get(f'/products?season={season}')
        assert response.status_code == 200
        
        data = response.get_json()
        assert len(data['items']) == expected_count
        
        # Verify all returned items match the filter
        for item in data['items']:
            assert item['season'] == season

def test_multiple_filters(client):
    # Test combining multiple filters
    csv_path = os.path.join(os.path.dirname(__file__), '..', 'styles.csv')
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        first_row = next(reader)
        category = first_row['articleType']
        season = first_row['season']
    
    # Count matching rows in CSV
    expected_count = 0
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            if i >= 20:
                break
            if row['articleType'] == category and row['season'] == season:
                expected_count += 1
    
    # Test the API
    response = client.get(f'/products?articleType={category}&season={season}')
    assert response.status_code == 200
    
    data = response.get_json()
    assert len(data['items']) == expected_count
    
    # Verify all returned items match both filters
    for item in data['items']:
        assert item['articleType'] == category
        assert item['season'] == season 
