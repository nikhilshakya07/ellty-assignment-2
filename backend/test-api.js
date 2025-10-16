// Comprehensive test script for the Number Discussion API
const testAPI = async () => {
  const baseURL = 'http://localhost:5000';
  
  try {
    console.log('🚀 Starting Number Discussion API Tests...\n');
    
    // Test 1: Health Check
    console.log('1️⃣ Testing health endpoint...');
    const healthResponse = await fetch(`${baseURL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
    
    // Test 2: Get initial discussions (should be empty)
    console.log('\n2️⃣ Testing initial discussions endpoint...');
    const initialDiscussionsResponse = await fetch(`${baseURL}/api/discussions`);
    const initialDiscussionsData = await initialDiscussionsResponse.json();
    console.log('✅ Initial discussions:', initialDiscussionsData);
    
    // Test 3: User Registration
    console.log('\n3️⃣ Testing user registration...');
    const registerResponse = await fetch(`${baseURL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'alex',
        password: 'password123'
      })
    });
    const registerData = await registerResponse.json();
    console.log('✅ Registration:', registerData);
    
    // Test 4: User Login
    console.log('\n4️⃣ Testing user login...');
    const loginResponse = await fetch(`${baseURL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'alex',
        password: 'password123'
      })
    });
    const loginData = await loginResponse.json();
    console.log('✅ Login:', loginData);
    
    if (!loginData.token) {
      throw new Error('No JWT token received');
    }
    
    const token = loginData.token;
    
    // Test 5: Create Discussion
    console.log('\n5️⃣ Testing discussion creation...');
    const discussionResponse = await fetch(`${baseURL}/api/discussions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        startingNumber: 10
      })
    });
    const discussionData = await discussionResponse.json();
    console.log('✅ Discussion created:', discussionData);
    
    if (!discussionData.id) {
      throw new Error('No discussion ID received');
    }
    
    const discussionId = discussionData.id;
    
    // Test 6: Add First Operation (Reply to Starting Number)
    console.log('\n6️⃣ Testing first operation (10 + 5 = 15)...');
    const operation1Response = await fetch(`${baseURL}/api/operations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        discussionId: discussionId,
        parentId: null,
        operationType: 'add',
        rightNumber: 5
      })
    });
    const operation1Data = await operation1Response.json();
    console.log('✅ First operation:', operation1Data);
    
    if (!operation1Data.id) {
      throw new Error('No operation ID received');
    }
    
    const operation1Id = operation1Data.id;
    
    // Test 7: Add Second Operation (Reply to First Operation)
    console.log('\n7️⃣ Testing second operation (15 × 2 = 30)...');
    const operation2Response = await fetch(`${baseURL}/api/operations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        discussionId: discussionId,
        parentId: operation1Id,
        operationType: 'multiply',
        rightNumber: 2
      })
    });
    const operation2Data = await operation2Response.json();
    console.log('✅ Second operation:', operation2Data);
    
    // Test 8: Add Third Operation (Parallel Branch: 10 ÷ 2 = 5)
    console.log('\n8️⃣ Testing third operation (10 ÷ 2 = 5)...');
    const operation3Response = await fetch(`${baseURL}/api/operations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        discussionId: discussionId,
        parentId: null,
        operationType: 'divide',
        rightNumber: 2
      })
    });
    const operation3Data = await operation3Response.json();
    console.log('✅ Third operation:', operation3Data);
    
    // Test 9: Get All Discussions (Check Tree Structure)
    console.log('\n9️⃣ Testing discussions with tree structure...');
    const finalDiscussionsResponse = await fetch(`${baseURL}/api/discussions`);
    const finalDiscussionsData = await finalDiscussionsResponse.json();
    console.log('✅ Final discussions tree:');
    console.log(JSON.stringify(finalDiscussionsData, null, 2));
    
    // Test 10: Test JWT Authentication (Valid Token)
    console.log('\n🔟 Testing JWT authentication with valid token...');
    const authTestResponse = await fetch(`${baseURL}/api/discussions`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Authenticated request status:', authTestResponse.status);
    
    // Test 11: Test JWT Authentication (Invalid Token)
    console.log('\n1️⃣1️⃣ Testing JWT authentication with invalid token...');
    const invalidAuthResponse = await fetch(`${baseURL}/api/discussions`, {
      headers: {
        'Authorization': 'Bearer invalid-token'
      }
    });
    console.log('✅ Invalid token request status:', invalidAuthResponse.status);
    
    // Test 12: Test Error Handling (Division by Zero)
    console.log('\n1️⃣2️⃣ Testing error handling (division by zero)...');
    const errorResponse = await fetch(`${baseURL}/api/operations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        discussionId: discussionId,
        parentId: null,
        operationType: 'divide',
        rightNumber: 0
      })
    });
    const errorData = await errorResponse.json();
    console.log('✅ Error handling test:', errorData);
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📊 Expected Tree Structure:');
    console.log('10 (starting number)');
    console.log('├── 10 + 5 = 15');
    console.log('│   └── 15 × 2 = 30');
    console.log('└── 10 ÷ 2 = 5');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
};

// Run the test
console.log('Starting API tests... Make sure the server is running on http://localhost:5000');
testAPI();
