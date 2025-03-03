// 5️⃣ Server Errors (500–599)
// 👉 Server side problem hai.

// Status Code	Meaning
// 500	Internal Server Error (Kuch bhi ho sakta hai, server crash ya bug)
// 502	Bad Gateway (Backend server down hai ya galat response de raha hai)
// 503	Service Unavailable (Server overload ya maintenance me hai)
// 504	Gateway Timeout (Server dusre server se response nahi le pa raha)




// 4️⃣ Client Errors (400–499)
// 👉 Client (browser ya frontend) ne galat request bheji hai.

// Status Code	Meaning
// 400	Bad Request (Request galat hai ya missing fields hain)
// 401	Unauthorized (Authentication chahiye, jaise JWT token)
// 403	Forbidden (User ke paas access nahi hai)
// 404	Not Found (Resource nahi mila)
// 405	Method Not Allowed (Galat HTTP method use ho rahi hai, jaise POST ki jagah GET)
// 409	Conflict (Data conflict hai, jaise duplicate email)
// 422	Unprocessable Entity (Validation errors, jaise email format galat)



// 3️⃣ Redirection (300–399)
// 👉 Client ko dusre location par redirect kiya ja raha hai.

// Status Code	Meaning
// 301	Moved Permanently (URL permanently change ho gayi)
// 302	Found / Moved Temporarily (Temporary redirect)
// 304	Not Modified (Server keh raha hai ki content change nahi hua, cache use karo)





// 2️⃣ Success (200–299)
// 👉 Request successful rahi, response mil gaya.

// Status Code	Meaning
// 200	OK (Sab sahi hai, response mil gaya)
// 201	Created (Resource create ho gaya, jaise naya user register)
// 202	Accepted (Request accept ho gayi, lekin abhi process ho rahi hai)
// 204	No Content (Request successful, lekin response body nahi bhej raha)


// 1️⃣ Informational (100–199)
// 👉 Request receive ho gayi hai, process ho rahi hai.

// Status Code	Meaning
// 100	Continue (Server request accept kar raha hai)
// 101	Switching Protocols (Protocol upgrade ho raha hai, jaise HTTP → WebSocket)
// 102	Processing (Request process ho rahi hai, response aayega)


