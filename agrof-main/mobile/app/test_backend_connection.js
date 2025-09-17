// Test script to verify backend connection
const API_URL = 'https://loyal-wholeness-production.up.railway.app';

console.log('Testing backend connection...');
console.log('API URL:', API_URL);

// Test health endpoint
fetch(`${API_URL}/health`)
  .then(response => {
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    return response.json();
  })
  .then(data => {
    console.log('✅ Backend is working!');
    console.log('Response data:', data);
  })
  .catch(error => {
    console.error('❌ Backend connection failed:');
    console.error('Error:', error.message);
    console.error('Full error:', error);
  });

// Test analyze endpoint
fetch(`${API_URL}/api/test`)
  .then(response => response.json())
  .then(data => {
    console.log('✅ Test endpoint working!');
    console.log('Test response:', data);
  })
  .catch(error => {
    console.error('❌ Test endpoint failed:', error.message);
  });
