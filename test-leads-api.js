/**
 * Test Suite for Leads API
 *
 * This script tests the /api/leads endpoint both locally and on production
 * Run with: node test-leads-api.js
 */

const PRODUCTION_URL = 'https://nam.xyz';
const LOCAL_URL = 'http://localhost:3000';

// Change this to test against production or local
const BASE_URL = process.argv[2] === 'prod' ? PRODUCTION_URL : LOCAL_URL;

console.log(`\n🧪 Testing Leads API at: ${BASE_URL}\n`);

// Test counter
let passed = 0;
let failed = 0;

// Helper function to make API calls
async function apiCall(method, path, body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${path}`, options);
  const data = await response.json();

  return { response, data };
}

// Helper function for assertions
function assert(condition, testName, message) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passed++;
  } else {
    console.log(`❌ FAIL: ${testName}`);
    console.log(`   Expected: ${message}`);
    failed++;
  }
}

// Test Suite
async function runTests() {
  console.log('📋 Starting Test Suite...\n');

  // Test 1: GET /api/leads - Should return initial state
  console.log('Test 1: GET /api/leads (initial state)');
  try {
    const { response, data } = await apiCall('GET', '/api/leads');
    assert(response.status === 200, 'Status code is 200', '200');
    assert(data.success === true, 'Response has success: true', 'success: true');
    assert(Array.isArray(data.leads), 'Response has leads array', 'Array');
    assert(typeof data.count === 'number', 'Response has count number', 'number');
    console.log(`   Current leads count: ${data.count}\n`);
  } catch (error) {
    console.log(`❌ FAIL: ${error.message}\n`);
    failed++;
  }

  // Test 2: POST /api/leads - Valid lead (App Store)
  console.log('Test 2: POST /api/leads (valid App Store lead)');
  try {
    const testEmail = `test-appstore-${Date.now()}@example.com`;
    const { response, data } = await apiCall('POST', '/api/leads', {
      email: testEmail,
      platform: 'app-store',
    });

    assert(response.status === 200, 'Status code is 200', '200');
    assert(data.success === true, 'Response has success: true', 'success: true');
    assert(data.message === 'Lead stored successfully', 'Success message correct', 'Lead stored successfully');
    assert(typeof data.totalLeads === 'number', 'Response has totalLeads', 'number');
    assert(typeof data.blobUrl === 'string', 'Response has blobUrl', 'string');
    console.log(`   Total leads after insert: ${data.totalLeads}`);
    console.log(`   Blob URL: ${data.blobUrl}\n`);
  } catch (error) {
    console.log(`❌ FAIL: ${error.message}\n`);
    failed++;
  }

  // Test 3: POST /api/leads - Valid lead (Google Play)
  console.log('Test 3: POST /api/leads (valid Google Play lead)');
  try {
    const testEmail = `test-googleplay-${Date.now()}@example.com`;
    const { response, data } = await apiCall('POST', '/api/leads', {
      email: testEmail,
      platform: 'google-play',
    });

    assert(response.status === 200, 'Status code is 200', '200');
    assert(data.success === true, 'Response has success: true', 'success: true');
    assert(data.totalLeads > 0, 'Total leads increased', '> 0');
    console.log(`   Total leads after insert: ${data.totalLeads}\n`);
  } catch (error) {
    console.log(`❌ FAIL: ${error.message}\n`);
    failed++;
  }

  // Test 4: POST /api/leads - Missing email
  console.log('Test 4: POST /api/leads (missing email)');
  try {
    const { response, data } = await apiCall('POST', '/api/leads', {
      platform: 'app-store',
    });

    assert(response.status === 400, 'Status code is 400', '400');
    assert(data.error === 'Email and platform are required', 'Error message correct', 'Email and platform are required');
    console.log(`   Error: ${data.error}\n`);
  } catch (error) {
    console.log(`❌ FAIL: ${error.message}\n`);
    failed++;
  }

  // Test 5: POST /api/leads - Missing platform
  console.log('Test 5: POST /api/leads (missing platform)');
  try {
    const { response, data } = await apiCall('POST', '/api/leads', {
      email: 'test@example.com',
    });

    assert(response.status === 400, 'Status code is 400', '400');
    assert(data.error === 'Email and platform are required', 'Error message correct', 'Email and platform are required');
    console.log(`   Error: ${data.error}\n`);
  } catch (error) {
    console.log(`❌ FAIL: ${error.message}\n`);
    failed++;
  }

  // Test 6: POST /api/leads - Invalid email format
  console.log('Test 6: POST /api/leads (invalid email format)');
  try {
    const { response, data } = await apiCall('POST', '/api/leads', {
      email: 'not-an-email',
      platform: 'app-store',
    });

    assert(response.status === 400, 'Status code is 400', '400');
    assert(data.error === 'Invalid email format', 'Error message correct', 'Invalid email format');
    console.log(`   Error: ${data.error}\n`);
  } catch (error) {
    console.log(`❌ FAIL: ${error.message}\n`);
    failed++;
  }

  // Test 7: POST /api/leads - Invalid platform
  console.log('Test 7: POST /api/leads (invalid platform)');
  try {
    const { response, data } = await apiCall('POST', '/api/leads', {
      email: 'test@example.com',
      platform: 'invalid-platform',
    });

    assert(response.status === 400, 'Status code is 400', '400');
    assert(data.error === 'Invalid platform', 'Error message correct', 'Invalid platform');
    console.log(`   Error: ${data.error}\n`);
  } catch (error) {
    console.log(`❌ FAIL: ${error.message}\n`);
    failed++;
  }

  // Test 8: POST /api/leads - Multiple submissions (test accumulation)
  console.log('Test 8: POST /api/leads (multiple submissions)');
  try {
    const { data: before } = await apiCall('GET', '/api/leads');
    const beforeCount = before.count;

    // Submit 3 leads
    for (let i = 0; i < 3; i++) {
      await apiCall('POST', '/api/leads', {
        email: `test-multi-${Date.now()}-${i}@example.com`,
        platform: i % 2 === 0 ? 'app-store' : 'google-play',
      });
      // Small delay to ensure unique timestamps
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const { data: after } = await apiCall('GET', '/api/leads');
    const afterCount = after.count;

    assert(afterCount === beforeCount + 3, 'Lead count increased by 3', `${beforeCount} + 3 = ${afterCount}`);
    console.log(`   Leads before: ${beforeCount}, after: ${afterCount}\n`);
  } catch (error) {
    console.log(`❌ FAIL: ${error.message}\n`);
    failed++;
  }

  // Test 9: GET /api/leads - Verify data structure
  console.log('Test 9: GET /api/leads (verify data structure)');
  try {
    const { response, data } = await apiCall('GET', '/api/leads');

    assert(response.status === 200, 'Status code is 200', '200');
    assert(data.success === true, 'Has success field', 'true');
    assert(Array.isArray(data.leads), 'Leads is an array', 'Array');

    if (data.leads.length > 0) {
      const lead = data.leads[0];
      assert(typeof lead.email === 'string', 'Lead has email string', 'string');
      assert(['app-store', 'google-play'].includes(lead.platform), 'Lead has valid platform', 'app-store or google-play');
      assert(typeof lead.timestamp === 'string', 'Lead has timestamp string', 'string');

      // Verify timestamp is valid ISO format
      const date = new Date(lead.timestamp);
      assert(!isNaN(date.getTime()), 'Timestamp is valid date', 'valid ISO date');

      console.log(`   Sample lead: ${lead.email} (${lead.platform})`);
      console.log(`   Timestamp: ${lead.timestamp}\n`);
    } else {
      console.log(`   No leads found to verify structure\n`);
    }
  } catch (error) {
    console.log(`❌ FAIL: ${error.message}\n`);
    failed++;
  }

  // Test 10: POST /api/leads - Special characters in email
  console.log('Test 10: POST /api/leads (special characters in email)');
  try {
    const testEmail = `test+special.chars-${Date.now()}@example.com`;
    const { response, data } = await apiCall('POST', '/api/leads', {
      email: testEmail,
      platform: 'app-store',
    });

    assert(response.status === 200, 'Status code is 200', '200');
    assert(data.success === true, 'Response has success: true', 'success: true');
    console.log(`   Email accepted: ${testEmail}\n`);
  } catch (error) {
    console.log(`❌ FAIL: ${error.message}\n`);
    failed++;
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Test Summary');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  console.log('='.repeat(60) + '\n');

  if (failed === 0) {
    console.log('🎉 All tests passed! The API is working correctly.\n');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed. Please review the output above.\n');
    process.exit(1);
  }
}

// Run the tests
console.log('💡 Usage: node test-leads-api.js [prod|local]');
console.log('   - No argument: tests local (http://localhost:3000)');
console.log('   - "prod": tests production (https://nam.xyz)');
console.log('');

runTests().catch(error => {
  console.error('\n💥 Test suite crashed:', error);
  process.exit(1);
});
