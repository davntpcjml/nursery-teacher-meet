// ============================================
// PASTE YOUR DEPLOYED GOOGLE SCRIPT URL HERE
// ============================================
const API_URL = 'https://script.google.com/macros/s/AKfycbwgPmAQHBxjasFiBon_YmJ6coM3VkKEGwaB2p7Jk2j9r8Gg_2fxCqMHMkyMCYSCFVrOOA/exec';

// ============================================
// API FUNCTIONS
// ============================================

async function apiGet(action, params) {
  params = params || {};
  try {
    var url = new URL(API_URL);
    url.searchParams.append('action', action);
    for (var key in params) {
      url.searchParams.append(key, params[key]);
    }
    var response = await fetch(url.toString());
    return await response.json();
  } catch (error) {
    console.error('API GET Error:', error);
    throw error;
  }
}

async function apiPost(action, body) {
  body = body || {};
  try {
    body.action = action;
    var response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
      redirect: 'follow'
    });
    return await response.json();
  } catch (error) {
    console.error('API POST Error:', error);
    throw error;
  }
}

// ============================================
// ADMIN SESSION
// ============================================

function setAdminSession() {
  sessionStorage.setItem('hpzkAdmin', 'true');
  sessionStorage.setItem('hpzkAdminTime', Date.now().toString());
}

function checkAdminSession() {
  var isAdmin = sessionStorage.getItem('hpzkAdmin');
  var loginTime = sessionStorage.getItem('hpzkAdminTime');
  if (!isAdmin || !loginTime) return false;
  if (Date.now() - parseInt(loginTime) > 7200000) {
    clearAdminSession();
    return false;
  }
  return true;
}

function clearAdminSession() {
  sessionStorage.removeItem('hpzkAdmin');
  sessionStorage.removeItem('hpzkAdminTime');
}

// ============================================
// TOAST
// ============================================

function showToast(message, type) {
  type = type || '';
  var toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = 'toast show ' + type;
  setTimeout(function() { toast.className = 'toast'; }, 4000);
}