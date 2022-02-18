const path = require('path');
require("dotenv").config();
//const cors = require('cors');
const express = require("express");
const server = express();
const pool = require("./dbConfig.mysql");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MemoryStore = require('memorystore')(session);
const passport = require("passport");
const saltRounds = 10;

const PORT = process.env.PORT || 4000;

server.set("view engine", "ejs");

// var whitelist = [
//   'http://localhost:3002', 
//   'http://localhost:3000']; //white list consumers
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(null, false);
//     }
//   },
//   methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
// };

// server.use(cors(corsOptions)); //add cors middleware to express with above configuration

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(
  session({
    secret: `${process.env.secret}`,
    resave: false,
    saveUninitialized: false,
    sameSite: "none",
    cookie: { httpOnly: false, maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
  })
);

server.use(passport.initialize());
server.use(passport.session());
require(`./passportConfig.mysql`)(passport);

var router = express.Router({mergeParams: true});

server.use(router);

console.log(`process.env.NODE_ENV: `,process.env.NODE_ENV);

if(process.env.NODE_ENV === 'dev') {
  router.use(express.static(path.join(__dirname, '/dashboard/build')));
} else {
  router.use(express.static(path.join(__dirname, '/public')));
}

server.get("/api", (req, res) => {
  return res.status;
});

router.get("/api/login", checkAuthenticated, (req, res) => {
  return res.status;
});

// passport login
router.post("/api/login", passport.authenticate("local"), function (req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  let msg = {
    custid: req.user.custid,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email,
    cell: req.user.cell,
    addr1: req.user.addr1,
    addr2: req.user.addr2,
    city: req.user.city,
    st: req.user.st,
    zip: req.user.zip,
    usertype: req.user.usertype
  };
  console.error(`\n\nreq.session.passport.user: `, req.session.passport.user);
  return res.status(200).json({ msg });
});

// passport if authenticated return customer object
router.get("/api/isAuthenticated", checkAuthenticated, (req, res) => {
  let msg = {
    custid: req.user.custid,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email,
    cell: req.user.cell,
    addr1: req.user.addr1,
    addr2: req.user.addr2,
    city: req.user.city,
    st: req.user.st,
    zip: req.user.zip,
    usertype: req.user.usertype
  };
  console.error(`\n\nisAuthenticated req.session.passport.user: `, req.session.passport.user);
  console.error(`\n\nisAuthenticated msg: `, msg);
  return res.status(200).json({ msg });
  //return res.status(200).send("Ok");
});

// passport logout
router.get('/api/logout', function (req, res) {
  console.error(`\n logout: `, req);
  req.logout();
  res.status(200).clearCookie('connect.sid', { path: '/' }).json({ status: "Success" });
  req.session.destroy(function (err) {
    // if (!err)
    // {
      // res.status(200).clearCookie('connect.sid', { path: '/' }).json({ status: "Success" });
      //res.redirect('/');
    // } else
    // {
    //   // handle error case...
    //   console.error(`err: `, err);
    // }
  });
  return;
});

// add new customer
router.post("/api/addcustomer", async (req, res) => {
  try
  {
    let {
      firstname,
      lastname,
      email,
      cell,
      addr1,
      addr2,
      city,
      st,
      zip,
      pwd,
      usertype,
    } = req.body;

    let hashedpwd = await bcrypt.hash(pwd, saltRounds);
    usertype = "customer";

    //insert new Customer
    let sql = 'INSERT INTO customer (firstname, lastname, email, cell, addr1, addr2, city, st, zip, pwd, usertype) VALUES (?,?,?,?,?,?,?,?,?,?,?)';

    pool.execute(sql, [firstname, lastname, email, cell, addr1, addr2, city, st, zip, hashedpwd, usertype], (error, results) => {
      if (error) throw error;
      res.status(200).json(results);
    });
  } catch (error) {
      return (error);
    }
  });

// change password
router.post("/api/changepassword", async function (req, res) {
  try {
    const {
      custid,
      pwd,
    } = req.body;

    const hashedPwd = await bcrypt.hash(pwd, saltRounds);
    
    let sql = 'UPDATE customer SET pwd=? WHERE custid = ?';

    pool.execute(sql, [hashedPwd, custid], (error, results) => {
      if (error) throw error;
      return res.status(200).json(results);
    });
  } catch (error) {
    return error;
  }
});

// update customer
router.post("/api/updatecustomer", async function (req, res) {
  try {
    const {
      custid,
      firstname,
      lastname,
      email,
      cell,
      addr1,
      addr2,
      city,
      st,
      zip,
      pwd,
      usertype,
    } = req.body;

    if (pwd) {
      const hashedPwd = await bcrypt.hash(pwd, saltRounds);
      //update existing Customer with NEW password
      console.error(`\nUpdate with new password. req.body: `, req.body);

      let sql = 'UPDATE customer SET firstname = ?, lastname = ?, email = ?, cell = ?, addr1 = ?, addr2 = ?, city = ?, st = ?, zip = ?, usertype = ?, pwd = ? WHERE custid = ?';

      pool.execute(sql, [firstname,
      lastname,
      email,
      cell,
      addr1,
      addr2,
      city,
      st,
      zip,
      usertype,
      hashedPwd,
      custid], (error, results) => {
        if (error) throw error;
        return res.status(200).json(results);
      })
    } else {
      //update customer with existing password

      let sql = 'UPDATE customer SET firstname = ?, lastname = ?, email = ?, cell = ?, addr1 = ?, addr2 = ?, city = ?, st = ?, zip = ?, usertype = ? WHERE custid = ?';

      pool.execute(sql, [firstname,
        lastname,
        email,
        cell,
        addr1,
        addr2,
        city,
        st,
        zip,
        usertype,
        custid], (error, results) => {
          if (error) throw error;
          return res.status(200).json(results);
        })
    };
  } catch(error) {
    return res.status(500).json(error);
  };
});

// get customer by custid
router.get("/api/getcustomerbycustid/:custid", async (req, res) => {
  let custid = req.params.custid;
  try
  {
    let sql = 'SELECT custid, firstname, lastname, email, cell, addr1, addr2, city, st, zip, usertype, username, createdate FROM customer WHERE custid = ?';
    
    pool.execute(sql, [custid], (error, results) => {
      if(error) throw error;
      if(results.length > 0) {
        return res.status(200).json(results);
      }
      return res.status(404).json(error);
    })
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

router.get("/api/listcustomers", async (req, res) => {
  try {
    let sql = 'SELECT custid, firstname, lastname, email, cell, addr1, addr2, city, st, zip, usertype, createdate, lastupdate FROM customer';
    
      pool.execute(sql, (error, results) => {
        if(error) throw error;
        return res.status(200).json(results);
      });
  } catch(error) {
    console.error(`error: `, error.name, error.message);
    return (error);
  }  
});

// delete customer by custid
router.delete("/api/deletecustomer/:custid", async function (req, res) {
  try
  {
    let custid = req.params.custid;
    
    let sql = 'DELETE FROM customer WHERE custid = ?';

    pool.execute(sql, [custid], (error, results) => {
      if(error) throw error;
      return res.status(200).json(results);
    });
    
  } catch (err) {
    console.error(`delete customer err: `, err);
    return res.status(500).json(err);
  }
});

// look for a duplicate subscription
router.post("/api/findduplicatesubscription", async (req, res) => {
  try
  {
    const {custid, cell, nickname, weatheralert, virusalert, airalert, zip} = req.body;

    let sql = 'SELECT * from subscriber WHERE custid = ? AND zip = ?';
    
    pool.execute(sql, [custid, zip], (error, results) => {
      if (error) throw error;
      console.log(`lookup results:`, results);
      if (results.length > 0) {
        return res.status(409).send(results);
      }
      return res.status(404).send('not found');
    });
  } catch(error) {
    console.error(`lookup subscription error: `, error.name, error.message);
    return res.status(500).json(error.name, error.message);
  }
})

// add new subscription for custid and zip
router.post("/api/addsubscription", async (req, res) => {
  try {
    const {
      custid, cell, nickname, weatheralert, virusalert, airalert, zip
    } = req.body;

    let sql = 'INSERT INTO subscriber (custid, cell, zip, nickname, weatheralert, virusalert, airalert) VALUES (?,?,?,?,?,?,?)';

    pool.execute(sql, [custid, cell, zip, nickname, weatheralert, virusalert, airalert], (error, results) => {
      if (error)
        throw error;
      
      if (results.insertId > 0) {
        return res.status(200).send(results);
      }
    });
  } catch (error) {
    console.error(`failed to add subscription: `, error.name, error.message);
    return res.status(500).json({name: error.name, message: error.message});
  }
});
  
// update existing subscription for custid & zip
router.post("/api/updatesubscription", async (req, res) => {
  try
  {
    const {
      custid,
      id,
      cell,
      zip,
      nickname,
      weatheralert,
      virusalert,
      airalert,
    } = req.body;

    let sql = 'SELECT * from subscriber WHERE subscriber.custid = ? AND subscriber.id = ?';

    pool.execute(sql, [custid, id], (error, results) => {
      if(error) {
        return(error.message);
      }
      if(results.length > 0) {
        let sql2 = 'UPDATE subscriber SET cell = ?, zip = ?, nickname = ?, weatheralert = ?, virusalert = ?, airalert = ? WHERE subscriber.custid = ? AND subscriber.id = ?';

        pool.execute(sql2, [cell, zip, nickname, weatheralert, virusalert, airalert, custid, id], (error, results) => {
          if(error) {
            return(error.message);
          }
          return res.status(200).json(results);
        })
      }
    })
  } catch(error) {
    console.error(`error: `,error.message);
    return(error);
  }
});  

// delete subscription by subscriber.id
router.delete("/api/deletesubscription/:id", async function (req, res) {
  try
  {
    let id = req.params.id;
    
    let sql = 'DELETE FROM subscriber WHERE subscriber.id = ?';

    pool.execute(sql, [id], (error, results) => {
      if(error) throw error;
      return res.status(200).json(results);
    });
    
  } catch (err) {
    console.error(`delete subscription err: `, err);
    return res.status(500).json(err);
  }
});

// getLocationsByCustid
router.get("/api/getlocationsbycustid/:custid", async (req, res) => {
  let custid = req.params.custid;

  try
  {
    let sql =`SELECT subscriber.id, subscriber.zip, cell, custid, nickname, weatheralert, virusalert, airalert, stateid, city FROM subscriber INNER JOIN zipdata ON zipdata.zip = subscriber.zip WHERE subscriber.custid = ?`;

    pool.execute(sql, [custid], (error, results) => {
      if(error) throw error;
      if(results.length > 0) {
        return res.status(200).send(results);
      }
      return res.status(404).send('No records found');
    })
  } catch(error) {
    console.error(`error: `, error.message);
    return (error);
  }  
});

// getLocationById
router.get("/api/getlocationbyid/:id", async (req, res) => {
  let id = req.params.id;

  try
  {
    let sql =`SELECT subscriber.id, subscriber.zip, cell, custid, nickname, weatheralert, virusalert, airalert, stateid, city FROM subscriber INNER JOIN zipdata ON zipdata.zip = subscriber.zip WHERE subscriber.id = ?`;

    pool.execute(sql, [id], (error, results) => {
      if(error) throw error;
      if(results.length > 0) {
        return res.status(200).send(results);
      }
      return res.status(404).send('No records found');
    })
  } catch(error) {
    console.error(`error: `, error.message);
    return (error);
  }  
});


// list subscriptions for custid
router.post("/api/listsubscriptions", async (req, res) => {
  try
  {
    const {custid} = req.body;

    let sql = 'SELECT subscriber.id, subscriber.zip, cell, custid, nickname, weatheralert, virusalert, airalert, stateid, city FROM subscriber INNER JOIN zipdata ON zipdata.zip = subscriber.zip WHERE subscriber.custid = ?';
    
    pool.execute(sql, [custid], (error, results) => {
      if(error) throw error;

      if(results.length > 0) {
        return res.status(200).send(results);
      }
      return res.status(404).send('No records found');
    })
  } catch(error) {
    console.error(`error: `, error.message);
    return (error);
  }  
});
  
// look for a duplicate friend
router.post("/api/findduplicatefriend", async (req, res) => {
  try
  {
    const {custid, firstname, zip, cell } = req.body;

    let sql = 'SELECT * from friends WHERE custid = ? AND cell = ?';
    
    pool.execute(sql, [custid, cell], (error, results) => {
      if (error) throw error;
      console.log(`lookup friend results:`, results);
      if (results.length > 0) {
        return res.status(409).send(results);
      }
      return res.status(404).send('not found');
    });
  } catch(error) {
    console.error(`lookup friend error: `, error.name, error.message);
    return res.status(500).json(error.name, error.message);
  }
})

// add new friend for custid
router.post("/api/addfriend", async (req, res) => {
  try {
    const {custid, firstname, zip, cell } = req.body;

    let sql = 'INSERT INTO friends (custid, firstname, zip, cell, active) VALUES (?,?,?,?,?)';

    pool.execute(sql, [custid, firstname, zip, cell, "1"], (error, results) => {
      if (error) throw error;

      if(results.insertId > 0) {
        return res.status(200).send(results);;
      }
    });
  } catch (error) {
    console.error(`failed to add friend: `, error.name, error.message);
    return res.status(500).json({name: error.name, message: error.message});
  }
});

// update existing friend for custid & id
router.post("/api/updatefriend", async function (req, res) {
  try
  {
    const {
      custid,
      firstname,
      zip,
      cell,
      id,
    } = req.body;

    let sql = 'SELECT * from friends WHERE custid = ? AND id = ?';
    
    pool.execute(sql, [custid, id], (error, results) => {
      if(error) {
        return(error.message);
      }
      if(results.length > 0) {
        let sql2 = 'UPDATE friends SET cell = ?, zip = ?, firstname = ? WHERE custid = ? AND id = ?';

        pool.execute(sql2, [cell, zip, firstname, custid, id], (error, results) => {
          if(error) {
            return(error.message);
          }
          return res.status(200).json(results);
        })
      }
    })
  } catch(error) {
    console.error(`error: `,error.message);
    return(error);
  }
});  


// delete friend 
router.delete("/api/deletefriend/:id", async function (req, res) {
  try
  {
    let id = req.params.id;

    let sql = 'DELETE FROM friends WHERE id = ?';

    pool.execute(sql, [id], (error, results) => {
      if(error) {
        return error.message;
      }
      return res.status(200).json(results);
    });
    
  } catch (err) {
    console.error(`delete friends err: `, err);
    return res.status(500).json(err);
  }
});

// getFriendsByCustid
router.get("/api/getfriendsbycustid/:custid", async (req, res) => {
  let custid = req.params.custid;

  try
  {
    let sql = 'SELECT friends.id, friends.zip, cell, custid, firstname, stateid, city FROM friends INNER JOIN zipdata ON zipdata.zip = friends.zip WHERE friends.custid = ?';

    pool.execute(sql, [custid], (error, results) => {
      if(error) throw error;
      if(results.length > 0) {
        return res.status(200).send(results);
      }
      return res.status(404).send('No records found');
    })
  } catch(error) {
    console.error(`error: `, error.message);
    return (error);
  }  
});

//getfriendbyid
router.get("/api/getfriendbyid/:id", async (req, res) => {
  let id = req.params.id;

  try
  {
    let sql = 'SELECT friends.id, friends.zip, cell, custid, firstname, stateid, city FROM friends INNER JOIN zipdata ON zipdata.zip = friends.zip WHERE friends.id = ?';
    
    pool.execute(sql, [id], (error, results) => {
      if(error) throw error;
      if(results.length > 0) {
        return res.status(200).send(results);
      }
      return res.status(404).send('No records found');
    })
  } catch(error) {
    console.error(`error: `, error.message);
    return (error);
  }  
});

// get list of friends for custid
router.post("/api/listfriends", async function (req, res) {
  try
  {
    const {custid} = req.body;

    let sql = 'SELECT friends.id, friends.zip, cell, custid, stateid, city FROM friends INNER JOIN zipdata ON zipdata.zip = friends.zip WHERE friends.custid = ?';
    
    pool.execute(sql, [custid], (error, results) => {
      if(error) throw error;
      
      if(results.length > 0) {
        return res.status(200).send(results);
      }
      return res.status(404).send('No records found');
    })
  } catch(error) {
    console.error(`error: `, error.message);
    return (error);
  }  
});

// verify zip
router.post("/api/verifyzip", async (req, res) => {
  try
  {
    const {
      zip,
    } = req.body;
    const foundZip = await pool.execute(`SELECT zipdata.zip FROM zipdata WHERE zipdata.zip = ${zip}`);
    if (foundZip)
    {
      return res.status(200).send(foundZip);
    }
    return res.status(404).json({ msg: `zip code ${req.body.zip} not found` });
  } catch (err)
  {
    return (err);
  }
});

// POST get zip with highest pop for city/st
router.post("/api/findzip", async (req, res) => {
  try
  {
    const {
      city,
      st,
    } = req.body;
    let sql = 'SELECT zip FROM zipdata WHERE city = ? AND stateid = ? ORDER BY pop DESC LIMIT 1';
    
    pool.execute(sql, [city, st], (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        return res.status(200).json(results[0].zip);
      }
      return res.status(404).json("Zip code not found");
    })
  } catch(error) {
    console.error(`error is: `, error.message);
    return res.status(500).json(error);
  }
});
      
// get zip with highest pop for city/st 
router.get("/api/getzip", async (req, res) => {
  try
  {
    let city = req.params.city;
    let stateid = req.params.st;

    let sql = 'SELECT zip FROM zipdata WHERE city = ? AND stateid = ? ORDER BY pop DESC LIMIT 1';
    await pool.execute(sql, [city, stateid], (error, results) => {
      if(error) throw error;
      if(results.length > 0) {
        return res.status(200).json(results);
      }
      return res.status(404);
    })
  } catch (err) {
    console.error(`getzip err: `, err.name, err.message);
    return res.status(500).json(err);
  }
});

// get city/st for zip
router.get("/api/getcityst/:zip", async (req, res) => {
  let zip = req.params.zip;
  try
  {
    const response = await pool.execute(`SELECT zipdata.city, zipdata.stateid FROM zipdata WHERE zipdata.zip = ${zip}`);
    return res.status(200).json(response);
  } catch (err)
  {
    return res.status(err.status).json(err.message);
  }
});

// check for duplicate customer email
router.get("/api/checkemail", async (req, res) => {
  let custid = req.params.custid;
  let email = req.params.email;
  try
  {
    const foundEmail = await pool.execute(`SELECT customer.custid, customer.email FROM customer WHERE customer.email = ${email} AND customer.custid != ${custid}`);
    if (foundEmail)
    {
      return res.status(418).json(`Duplicate email found. `, foundEmail);
    }
    return res.status(200).json(`Email ${email} for custid ${custid} not a duplicate `);
  } catch (err)
  {
    return (err);
  }
});

//check for duplicate customer cell
router.get("/api/checkcell", async (req, res) => {
  let custid = req.params.custid;
  let cell = req.params.cell;
  try
  {
    const foundCell = await pool.execute(`SELECT customer.custid, customer.cell FROM customer WHERE customer.cell = ${cell} AND customer.custid != ${custid}`);

    return res.status(200).json(`Cell ${cell} for custid ${custid} not a duplicate `)
  } catch (err)
  {
    return res.status().json(err.name, err.message);
  }
});

// check for duplicate email in customer table
router.post("/api/checkemail", async (req, res) => {
  try
  {
    const {
      email,
      custid
    } = req.body;

    const foundEmail = await pool.execute(`SELECT customer.custid, customer.email FROM customer WHERE customer.email = ${email} AND customer.custid != ${custid}`);
    if (foundEmail)
    {
      return res.status(418).json(`Duplicate email found. `, foundEmail);
    }
    return res.status(200).json(`Email ${email} for custid ${custid} not a duplicate `);
  } catch (err)
  {
    return (err);
  }
});

// check for duplicate cell in customer table
router.post("/api/checkcell", async (req, res) => {
  try
  {
    const {
      cell,
      custid
    } = req.body;

    const foundCell = await pool.execute(`SELECT customer.custid, customer.cell FROM customer WHERE customer.cell = ${cell} AND customer.custid != ${custid}`);
    if (foundCell)
    {
      return res.status(418).json(`Duplicate cell found. `, foundCell);
    }
    return res.status(200).json(`Cell ${cell} for custid ${custid} not a duplicate `);
  } catch (err)
  {
    return (err);
  }
});

function checkAuthenticated (req, res, next) {
  if (req.isAuthenticated())
  {
    console.error(`\ncheckAuthenticated res: `, res);
    console.error(`\n\nreq.session.passport.user: `, req.session.passport.user);
    return next();
  }
  res.status(401).json("not authenticated");
};

server.get('/*', (req, res) => {
  if(process.env.NODE_ENV === 'dev') {
    res.sendFile(path.join(__dirname, '/dashboard/build', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
  }
  
});

server.listen(PORT, () => {
  //console.error(`CORS enabled Server with whitelist is running on port ${PORT}\n`);
  console.error(`CORS disabled. Running mySQL on port ${PORT} NODE_ENV = ${process.env.NODE_ENV}\n`);
});

