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

router.use(express.static(path.join(__dirname, '/public')));

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

    console.error(`POST addcustomer req.body: `, req.body);
    //insert new Customer
    var sql = 'INSERT INTO customer (firstname, lastname, email, cell, addr1, addr2, city, st, zip, pwd, usertype) VALUES (?,?,?,?,?,?,?,?,?,?,?)';

    pool.execute(sql, [firstname, lastname, email, cell, addr1, addr2, city, st, zip, hashedpwd, usertype], (error, results) => {
      if (error) throw error;
      res.status(200).json(results);
    });
  } catch (err) {
      throw err;
    }
  });

// change password
router.post("/api/changepassword", async function (req, res) {
  try {
    console.error(`POST /changepassword req.body: `, req.body);
    const {
      custid,
      pwd,
    } = req.body;

    const hashedPwd = await bcrypt.hash(pwd, saltRounds);
    
    console.error(`Update existing Customer with new password. req.body: `, req.body);

    var sql = 'UPDATE customer SET pwd=? WHERE custid = ?';

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
    console.error(`\nPOST /updatecustomer req.body: `, req.body);
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

    if (pwd)
    {
      const hashedPwd = await bcrypt.hash(pwd, saltRounds);
      //update existing Customer with NEW password
      console.error(`\nUpdate with new password. req.body: `, req.body);

      var sql = `UPDATE customer SET firstname = ${firstname}, lastname = ${lastname}, email = ${email}, cell = ${cell}, addr1 = ${addr1}, addr2 = ${addr2}, city = ${city}, st = ${st}, zip = ${zip}, usertype = ${usertype}, pwd = ${hashedPwd} WHERE customer.custid = ${custid}`;

      await pool.execute(
        sql, (err, results) => {
          //Update failed
          if (err)
          {
            console.error(`\nupdatecustomer failed. error: `, err.message);
            let msg = err.message;
            return res.status(409).send({ msg });

            //Update succeeded
          } else
          {
            console.error(`\nupdatecustomer success: `, results);
            let msg = results;
            return res.status(200).send({ msg });
          }
        }
      );
    } else
    {
      //update customer with existing password
      console.error(`\nUpdate with existing password. req.body: `, req.body);
      console.error(`\nUpdate with existing password. custid: `, custid);

      var sql = `UPDATE customer SET firstname = "${firstname}", lastname = "${lastname}", email = "${email}", cell = "${cell}", addr1 = "${addr1}", addr2 = "${addr2}", city = "${city}", st = "${st}", zip = "${zip}", usertype = "${usertype}" WHERE customer.custid = "${custid}"`;

      await pool.execute(
        sql, (err, results) => {
          //Update failed
          if (err)
          {
            console.error(`\nUpdate failed. error: `, err.message);
            let msg = err.message;
            return res.status(409).send(msg);

            //Update succeeded
          } else
          {
            console.error(`\nUpdate success: `, results);
            let msg = results;
            return res.status(200).send(msg);
          }
        }
      );
    };
  } catch(err) { throw(err)};
});

// get customer by custid
router.get("/api/getcustomerbycustid/:custid", async (req, res) => {
  let custid = req.params.custid;
  try
  {
    let sql = 'SELECT custid, firstname, lastname, email, cell, addr1, addr2, city, st, zip, usertype, username, createdate FROM customer WHERE custid = ?';
    
    await pool.execute(sql, [custid], (error, results) => {
      if(error) {
        return(error);
      }
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
    var sql = 'SELECT custid, firstname, lastname, email, cell, addr1, addr2, city, st, zip, usertype,  createdate, lastupdate FROM customer';
    
      await (await pool.execute(sql, (error, results) => {
        if(error) {
          return console.error(error.message);
        }
        return res.status(200).json(results);
      }));
  } catch(error) {
    console.error(`error: `, error.message);
    return (error);
  }  
});

// delete customer by custid
router.delete("/api/deletecustomer/:custid", async function (req, res) {
  try {
  let custid = req.params.custid;
  
  const response = await pool.execute(
    `DELETE from customer WHERE customer.custid = ${custid}`);

    if (response) {
      console.error(`\n\ndeletecustomer response: `, response);
      return res.status(200).send(response);
    }
  } catch (err) {
    console.error(`\n\ndelete customer err: `, err);
    return res.status(404).send(err);
  }
});

// add new subscription for custid and zip
router.post("/api/addsubscription", async (req, res) => {
  try
  {
    let sql = 'SELECT * from subscriber WHERE subscriber.custid = ? AND subscriber.zip = ?';
    
    await pool.execute(sql, [req.body.custid, req.body.zip], (error, results) => {
      if(error) {
        return (error);
      }
      if (results.length > 0) {
        return res.status(409).send('error: duplicate subscription found');
      }
      const {
        custid,
        cell,
        zip,
        nickname,
        weatheralert,
        virusalert,
        airalert,
      } = req.body;

      let sql2 = 'INSERT INTO subscriber (custid, cell, zip, nickname, weatheralert, virusalert, airalert) VALUES (?,?,?,?,?,?,?)';

      pool.execute(sql2, [custid, cell, zip, nickname, weatheralert, virusalert, airalert], (error, rresults) => {
        if(error) {
          return(error.message);
        }
        if(results.length > 0) {
          return res.status(200).json(results);
        }
      });
    })
  } catch(error) {
    console.error(error.message);
    return(error);
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
    console.error(`\n\ndeletesubscription id: `, id);

    let sql = 'DELETE FROM subscriber WHERE subscriber.id = ?';
    await pool.execute(sql, [id], (error, results) => {
      if(error) {
        return error.message;
      }
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

    await pool.execute(sql, [custid], (error, results) => {
      if(error) {
        return console.error(error.message);
      }
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

    await pool.execute(sql, [id], (error, results) => {
      if(error) {
        return console.error(error.message);
      }
      return res.status(200).send(results);
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
    const {
      custid
    } = req.body;

    let sql = 'SELECT subscriber.id, subscriber.zip, cell, custid, nickname, weatheralert, virusalert, airalert, stateid, city FROM subscriber INNER JOIN zipdata ON zipdata.zip = subscriber.zip WHERE subscriber.custid = ?';
    
    await pool.execute(sql, [custid], (error, results) => {
      if(error) {
        return console.error(error.message);
      }
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
  

// add new friend for custid
router.post("/api/addfriend", async (req, res) => {
  try
  {
    const {
      custid,
      firstname,
      zip,
      cell
    } = req.body;
    let sql = 'SELECT * from friends WHERE friends.custid = ? AND friends.cell = ? ';

    await pool.execute(sql, [custid, cell], (error, results) => {
      if (error) {
        return res.status(500).json(error.message);
      }
      if(results.length > 0) {
        return res.status(418).json('error: friend with duplicate cell found');
      }
    })
    let moresql = 'INSERT INTO friends (custid, zip, cell, active, firstname) VALUES (?,?,?,?,?)';
    pool.execute(sql, [custid, zip, cell, 1, firstname], (err, results) => {
      if (err) {
        console.error(`Friend INSERT failed. error: `, err.message);
        let msg = err.message;
        return res.status(409).json( msg );
      } else {
        console.error(`Friend INSERT success: `, results);
        return res.status(200).json(results);
      }
    })
  } catch (err) {
    return (err);
  };
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

    const foundFriend = await pool.execute(`SELECT * from friend WHERE friend.custid = ${custid} and friend.id = ${id}`);

    if (foundFriend)
    {
      await pool.execute(`UPDATE friends SET firstname = ${firstname}, zip = ${zip}, cell = ${cell} WHERE friends.custid = ${custid} AND friends.id = ${id}`),
      
        (err, results) => {
          if (results)
          {
            console.error(`\n\nupdatefriend success results: `, results)
            return res.status(200).send(results);
          }
          return res.status(404).send(err);
        }
      
    };
    return res;
  } catch (err)
  {
    console.error(`\n\nupdatefriend error: `, err.name, err.message);
    return (err)
  }
});


// delete friend 
router.delete("/api/deletefriend/:id", async function (req, res) {
  try
  {
    let id = req.params.id;
    const response = await pool.execute(
      `DELETE from friends WHERE friends.id = ${id}`);
    if (response)
    {
      console.error(`\n\ndeletefriend response: `, response);
      return res.status(200).send(response);
    }
  } catch (err)
  {
    console.error(`\n\ndelete friend err: `, err);
    return res.status(404).send(err);
  }
});

//getfriendsbycustid
router.get("/api/getfriendsbycustid/:custid", async (req, res) => {
  let custid = req.params.custid;

  try
  {
    let sql = 'SELECT friends.id, friends.zip, cell, custid, firstname, stateid, city FROM friends INNER JOIN zipdata ON zipdata.zip = friends.zip WHERE friends.custid = ?';
    await pool.execute(sql, [custid], (error, results) => {
      if(error) {
        return console.error(error.message);
      }
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
  let {
    custid
  } = req.body;

  const friendcount = await pool.execute(`SELECT COUNT(*) as num FROM friends WHERE friends.custid = ${custid}`);
  console.error(`friendcount: `, friendcount);
  if (friendcount.num === '0')
  {
    return res.status(204).json('No friends found');
  }
  let list;
  if (friendcount.num > 0)
  {
    list = await pool.execute(`SELECT * from friends WHERE friends.custid = ${custid}`);
    return res.status(200).json({ list });
  }
  return res.status(200).json({ list });
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
    
    await pool.execute(sql, [city, st], (error, results) => {
      if (error){
        return console.error(error.message);
      }
      if(results.length > 0) {
        return res.status(200).json(results[0].zip);
      } 
      return res.status(404).json("Zip code not found");
    })
  } catch(error) {
    console.error(`error is: `, error.message);
    return (error);
  }
});
      
// get zip with highest pop for city/st 
router.get("/api/getzip", async (req, res) => {
  try
  {
    let city = req.params.city;
    let stateid = req.params.st;

    const foundZip = await pool.execute(`SELECT zipdata.zip FROM zipdata WHERE zipdata.city = ${city} AND zipdata.stateid = ${stateid} ORDER BY zipdata.pop DESC LIMIT 1`);
    console.error(`\n\nZip found `, foundZip, city, stateid);
    return res.status(200).json(foundZip);

  } catch (err)
  {
    console.error(`\n\nerr: `, err);
    return (err);
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
  //res.sendFile(path.join(__dirname, 'build', 'index.html'));
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

server.listen(PORT, () => {
  //console.error(`CORS enabled Server with whitelist is running on port ${PORT}\n`);
  console.error(`CORS disabled. Running mySQL on port ${PORT}
  \n`);
});

