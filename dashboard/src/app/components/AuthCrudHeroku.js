//import React, {useState} from 'react';
//import { baseUrl } from 'app/baseUrl';

export const LOGIN_URL = `/api/login`;
export const ISAUTHENTICATED_URL = `/api/isAuthenticated`;
export const LOGOUT_URL = `/api/logout`;

export const ADDCUSTOMER_URL = `/api/addcustomer`;
export const UPDATECUSTOMER_URL = `/api/updatecustomer`;
export const GETCUSTOMERBYID_URL = `/api/getcustomerbyid`;
export const LISTCUSTOMERS_URL = `/api/listcustomers`;
export const DELETECUSTOMER_URL = `/api/deletecustomer`;
 
export const ADDSUBSCRIPTION_URL = `/api/addsubscription`;
export const UPDATESUBSCRIPTION_URL = `/api/updatesubscription`;
export const DELETESUBSCRIPTION_URL = `/api/deletesubscription`;
export const LISTSUBSCRIPTIONS_URL = `/api/listsubscriptions`;

export const ADDFRIEND_URL = `/api/addfriend`;
export const UPDATEFRIEND_URL = `/api/updatefriend`;
export const DELETEFRIEND_URL = `/api/deletefriend`;
export const LISTFRIENDS_URL = `/api/listfriends`;

export const VERIFYZIP_URL = `/api/verifyzip`;
export const FINDZIP_URL = `/api/findzip`;
export const CHECKEMAIL_URL = `/api/checkemail`;
export const CHECKCELL_URL = `/api/checkcell`;
export const CHANGEPASSWORD_URL = `/api/changepassword`;

//const Origin = 'http://localhost:3002';
//const Origin = 'http://localhost:4000';
// POST /login
// loginObj = email, pwd
export async function DoLogin(loginObj) {
  let data = await PostLogin(loginObj);
  console.log(`AuthCrud DoLogin returning data: `, data);
  return data;
}

export async function PostLogin(inObj) {
  try {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
      body: JSON.stringify(inObj),
    });
    if (response.status !== 200) {
      const message = response;
      //console.log(`message: `, message);
      return message.status;
    }
    //console.log(`response.status: `, response.status);
    let data = await response.json();
    data.msg.status = response.status;
    return data.msg;
  } catch (error) {
    //console.log(`Error: `, error.message);
  }
}

// GET /isAuthenticated
export async function isAuthenticated() {
  try {
    const response = await fetch(ISAUTHENTICATED_URL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
    });
    if (response.status === 200) {
      console.log(
        `AuthCrud isAuthenticated received response.status:`,
        response.status,
        `text:`,
        response.statusText
      );
      return true;
    }
    console.log(
      `AuthCrud isAuthenticated received response.status:`,
      response.status,
      `text:`,
      response.statusText
    );
    return false;
  } catch (e) {
    //console.log(`e: `, e.message);
    return false;
  }
}

// POST /checkemail (check for duplicate email)
export async function checkEmail(email) {
  try {
    const res = await fetch(CHECKEMAIL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
      body: JSON.stringify(email),
    });

    let data = await res.json();
    data.status = res.status;
    //console.log(`AuthCrud checkEmail returning email: `, data.msg);
    return data;
  } catch (error) {
    //console.log(`Error: `, error.message);
  }
}

// POST /checkcell (check for duplicate cell)
export async function checkCell(cell) {
  try {
    const res = await fetch(CHECKCELL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
      body: JSON.stringify(cell),
    });
    let data = await res.json();
    data.status = res.status;
    //console.log(`AuthCrud checkcell returning: `, data.msg);
    return data;
  } catch (error) {
    //console.log(`Error: `, error.message);
  }
}

// GET /logout
export async function logout() {
  try {
    await fetch(LOGOUT_URL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        credentials: 'same-origin',
        //Origin: Origin,
      },
    });
    console.log(`AuthCrud logout`);
  } catch (error) {
    console.log(`Error: `, error.message);
  }
  return;
}

// POST /changePassword
// inObj = custid, new password
export async function changePassword(inObj) {
  try {
    const response = await fetch(CHANGEPASSWORD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
      body: JSON.stringify(inObj),
    });
    if (response.status !== 200) {
      const message = response;
      //console.log(`AuthCrud changePassword returning message: `, message);
      return message;
    }
    //console.log(`AuthCrud changePassword response.status: `, response.status);
    //let data = response.status;
    await response.json();
    //console.log(`AuthCrud changePassword returning data: `, data);
    //data.status = response.status;
    return response.status;
  } catch (error) {
    //console.log(`Error: `, error.message);
  }
};

// POST /addUser (add customer, return new custid)
export async function addUser(inObj) {
  try {
    const response = await fetch(ADDCUSTOMER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
      body: JSON.stringify(inObj),
    });
    if (response.status !== 200) {
      const message = response;
      //console.log(`AuthCrud addUser returning message: `, message);
      return message;
    }
    //console.log(`AuthCrud addUser response.status: `, response.status);
    let data = await response.json();
    //console.log(`AuthCrud addUser returning data: `, data);
    data.status = response.status;
    return data;
  } catch (error) {
    //console.log(`Error: `, error.message);
  }
}

// POST /updateUser (update for custid)
// inObj = custid, user
export async function updateUser(inObj) {
  try {
    const response = await fetch(UPDATECUSTOMER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,

      },
      body: JSON.stringify(inObj),
    });
    if (response.status !== 200) {
      return response;
    }
    let data = await response.json();
    data.status = response.status;
    //console.log(`AuthCrud updateUser returning data: `, data);
    return data;
  } catch (error) {
    //console.log(`Error: `, error.message);
  }
}

// POST /deleteUser 
// inObj = custid 
export async function deleteUser(inObj) {
  try {
    const response = await fetch(DELETECUSTOMER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
      body: JSON.stringify(inObj),
    });
    if (response.status !== 200) {
      const message = response;
      //console.log(`message: `, message);
      return message.status;
    }
    //console.log(`response.status: `, response.status);
    let data = await response.json();
    //console.log(`AuthCrud deleteUser returning data: `, data);
    data.status = response.status;
    return data;
  } catch (error) {
    //console.log(`Error: `, error.message);
  }
}

export async function listCustomers() {
  try {
    const res = await fetch(LISTCUSTOMERS_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      }
    });
    let data = await res.json();
    data.status = res.status;
    //console.log(`listCustomers returning data: `, data);
    return data;
  } catch (error) {
    //console.log(`listCustomers Error: `, error.message);
  }
}

// Note: subscriptions = locations = subscribers table
// POST /listsubscriptions (get list of subscriptions for custid)
export async function listSubscriptions(custid) {
  try {
    const res = await fetch(LISTSUBSCRIPTIONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
      body: JSON.stringify(custid),
    });
    let data = await res.json();
    data.status = res.status;
    //console.log(`listSubscriptions returning data: `, data);
    return data;
  } catch (error) {
    //console.log(`listSubscriptions Error: `, error.message);
  }
}

// POST /findZip for city/state
export async function findZip(inObj) {
  try {
    const res = await fetch(FINDZIP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
      body: JSON.stringify(inObj),
    });
    let data = await res.json();
    data.status = res.status;
    //console.log(`findZip returning data: `, data);
    return data;
  } catch (error) {
    //console.log(`Zip Error: `, error.message);
  }
}

// POST /verifyZip
export async function verifyZip(inObj) {
  try {
    const res = await fetch(VERIFYZIP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Acept: 'application/json',
      },
      body: JSON.stringify(inObj),
    });
    let data = await res.json;
    //console.log(`AuthCrud verifyZip returning data: `, data);
    data.status = res.status;
    return data;
  } catch (error) {
    //console.log(`Verify Zip error: `, error.message);
  }
}

// POST /addSubscription (add subscription for custid)
// inObj = custid, cell, location
export async function addSubscription(inObj) {
  try {
    const response = await fetch(ADDSUBSCRIPTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
      body: JSON.stringify(inObj),
    });
    if (response.status !== 200) {
      const message = response;
      return message;
    }
    console.log(
      `AuthCrud addSubscription returning response.status: `,
      response.status
    );
    let data = await response.json();
    //console.log(`AuthCrud addSubscription returning data: `, data);
    data.status = response.status;
    return data;
  } catch (error) {
    //console.log(`Error: `, error.message);
  }
}

// POST /updateSubscription (update a subscription for custid)
// inObj = custid, location
export async function updateSubscription(inObj) {
  try {
    const response = await fetch(UPDATESUBSCRIPTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
      body: JSON.stringify(inObj),
    });
    if (response.status !== 200) {
      return response;
    }
    let data = await response.json();
    data.status = response.status;
    //console.log(`AuthCrud updateSubscription returning data: `, data);
    return data;
  } catch (error) {
    //console.log(`Error: `, error.message);
  }
}

// POST /deletesubscription (delete one subscription for custid)
// inObj = custid, location
export async function deleteSubscription(inObj) {
  try {
    const response = await fetch(DELETESUBSCRIPTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
      body: JSON.stringify(inObj),
    });
    if (response.status !== 200) {
      const message = response;
      //console.log(`message: `, message);
      return message.status;
    }
    //console.log(`response.status: `, response.status);
    let data = await response.json();
    //console.log(`AuthCrud deleteSubscription returning data: `, data);
    data.status = response.status;
    return data;
  } catch (error) {
    //console.log(`Error: `, error.message);
  }
}

// POST /listfriends (get list of friends for custid)
// inObj = custid
export async function listFriends(inObj) {
  try {
    const response = await fetch(LISTFRIENDS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
      
      body: JSON.stringify(inObj),
    });
    if (response.status !== 200) {
      const message = response;
      return message;
    }
    let data = await response.json();
    data.status = response.status;
    //console.log(`AuthCrud listFriends returning data: `, data);
    return data;
  } catch (error) {
    //console.log(`Error: `, error.message);
  }
}

// POST /addFriend (add friend for custid)
// inObj = custid, friend
export async function addFriend(inObj) {
  try {
    const response = await fetch(ADDFRIEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
      body: JSON.stringify(inObj),
    });
    if (response.status !== 200) {
      const message = response;
      return message;
    }
    console.log(
      `AuthCrud addFriend returning response.status: `,
      response.status
    );
    let data = await response.json();
    //console.log(`AuthCrud addFriend returning data: `, data);
    data.status = response.status;
    return data;
  } catch (error) {
    //console.log(`Error: `, error.message);
  }
}

// POST /friend (update a friend for custid)
// inObj = custid, friend
export async function updateFriend(inObj) {
  try {
    const response = await fetch(UPDATEFRIEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
      body: JSON.stringify(inObj),
    });
    if (response.status !== 200) {
      const message = response;
      //console.log(`message: `, message);
      return message.status;
    }
    //console.log(`response.status: `, response.status);
    let data = await response.json();
    //console.log(`AuthCrud updateFriend returning data: `, data);
    data.status = response.status;
    return data;
  } catch (error) {
    //console.log(`Error: `, error.message);
  }
}

// POST /deletefriend (delete one friend for custid)
// inObj = custid, friend
export async function deleteFriend(inObj) {
  try {
    const response = await fetch(DELETEFRIEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Origin: Origin,
      },
      body: JSON.stringify(inObj),
    });
    if (response.status !== 200) {
      const message = response;
      //console.log(`message: `, message);
      return message.status;
    }
    //console.log(`response.status: `, response.status);
    let data = await response.json();
    //console.log(`AuthCrud deleteFriend returning data.msg: `, data.msg);
    data.msg.status = response.status;
    return data.msg;
  } catch (error) {
    //console.log(`Error: `, error.message);
  }
}
