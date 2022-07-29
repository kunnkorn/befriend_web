require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

// MYSQL SERVER
const mysql = require('mysql');
const config = require('./config/dbconfig');
const { match } = require('assert');
const { user } = require('./config/dbconfig');
const { genSalt } = require('bcrypt');
const con = mysql.createConnection(config);

//Upload Image 
const upload = require('./config/upload_config');
const uploadaccount = require('./config/upload_config_account');
const { add } = require('nodemon/lib/rules');
const { join, parse } = require('path');
const { DATE } = require('mysql/lib/protocol/constants/types');
const e = require('express');

// --------------------------------------------------------------------------------
//  Middle Ware
function checkUser(req, res, next) {
    let token = req.headers['authorization'] || req.header['x-access-token'];
    if (token == undefined || token == null) {
        // No token
        res.status(400).send('No token')
    }
    else {
        // Have Token
        if (req.headers.authorization) {
            const tokenString = token.split(' ');
            if (tokenString[0] == 'Bearer') {
                token = tokenString[1];
            }
        }
        jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
            if (err) {
                res.status(400).send('Incorrect token');
            }
            else {
                req.decoded = decoded;
                next();
            }
        })
    }
}

// JWT Create / Encode
app.get('/jwt', (req, res) => {
    const username = 'admin';
    const payload = { user: username }
    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: '1d' })
    res.send(token);
});

// JWT Decoed
app.post('/jwtdecode', (req, res) => {

    let token = req.headers['authorization'] || req.headers['x-access-token'];
    if (token == undefined || token == null) {
        // No token
        res.status(400).send('No token');
    }
    else {
        // token found
        if (req.headers.authorization) {
            const tokenString = token.split(' ');
            if (tokenString[0] == 'Bearer') {
                token = tokenString[1];
            }
        }
        jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
            if (err) {
                res.status(400).send('Wrong Token');
            }
            else {
                res.send(decoded);
            }
        });
    }
});



//  ----------------------------------- Service with Mobile ---------------------------------------------
app.post('/register', function (req, res) {
    const { username, password, name, email, phonenumber } = req.body

    if (password == undefined || password == null) {
        console.log(password);
        res.status(400).send('Please fill the password')
    }
    else {
        bcrypt.hash(password, 10, (err, pass) => {
            if (err) {
                console.log(err);
                res.status(500).send("Hashing Password Error")
                return;
            }
            else {
                const sql = "INSERT INTO users(users_username, users_password, users_name, users_email, users_phonenumber, users_role , users_money) VALUES (?, ?, ?, ?, ?, 2 , 1000)"
                con.query(sql, [username, pass, name, email, phonenumber], function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Adding Data Error")
                    }
                    else {
                        if (result.affectedRows != 1) {
                            console.log(err);
                            res.status(500).send("DB Error")
                        }
                        else {
                            res.send("Register Complete")
                        }
                    }
                })
            }
        })
    }
})

// Login Service Mobile
app.post('/login', function (req, res) {
    const { username, password } = req.body;
    const sql = 'SELECT users_id, users_username , users_password , users_role , users_name FROM users WHERE users_username = ? AND users_role = 2';
    con.query(sql, [username], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Server Error')
        }
        // Wrong Username
        if (result.length != 1) {
            console.log('Wrong Username');
            return res.status(500).send('Wrong Username')
        }
        // Inactive User
        if (result[0].users_role == 0) {
            console.log('Disable User');
            return res.status(400).send('You do not have Permission to Access')
        }
        // Verify Password
        bcrypt.compare(password, result[0].users_password, (err, same) => {
            if (err) {
                // Server Error
                console.log(err)
                res.status(500).send('Bcrypt Error')
            }
            // Wrong Password
            if (!same) {
                return res.status(400).send('Wrong Password');

            }
            // Correct Password
            const payload = { 'users_username': username, 'user_id': result[0].users_id, 'users_role': result[0].users_role, 'users_name': result[0]['users_name'] }
            const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: '1d' });
            res.json({ token: token });
        })
    });
})


// Upload Project 
app.post('/projectinfo', function (req, res) {
    uploadaccount(req, res, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send('Upload Image Error');
        }
        else {
            const filename = req.files;
            const { agent, personname, addressperson, personphone, emailperson, ownerid } = req.body;
            for (let i = 0; i < filename.length; i++) { }

            const sql = 'INSERT INTO donate (donate.donate_agent , donate.donate_responperson , donate.donate_personaddress , donate.donate_personphone , donate.donate_personemail , donate.donate_personcard , donate.donate_bankaccount ,donate.donate_status , donate.donate_owner , donate.donate_types , donate.donate_payment_status , donate.donate_percen , donate.donate_pricedurring) VALUES (?, ?, ?, ?, ?, ? , ?, 1 ,? , 2, 1 ,0 , 0)';
            con.query(sql, [parseInt(agent), personname, addressperson, personphone, emailperson, filename[0].filename, filename[1].filename, parseInt(ownerid)], function (err, result) {
                if (err) {
                    console.log(err)
                    res.status(500).send('Database Error Cannot Insert ')
                }
                else {
                    console.log('Projectinfo Success')
                    res.send('Projectinfo Success')
                }
            });
        }
    })
})

// Project Detail
app.post('/projectdetail', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send('Upload Project Pic Error');
        }
        else {
            const filename = req.files;
            const { projectname, projectdescript, projectarea, projectreason } = req.body;
            const sql = 'SELECT MAX(donate.donate_id) AS MAXID FROM donate'
            con.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Select MAXID Error')
                }
                else {
                    console.log(result);
                    const sql = 'UPDATE donate SET donate_name = ? , donate_descrict = ? , donate_area = ? , donate_reason = ? WHERE donate_id = ?';
                    con.query(sql, [projectname, projectdescript, projectarea, projectreason, result[0].MAXID], function (err, result) {
                        if (err) {
                            consolr.log(err);
                            res.status(500).send('Database Update Error')
                        }
                        else {
                            const sql = 'SELECT MAX(donate.donate_id) AS MAXID FROM donate;'
                            con.query(sql, function (err, result) {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send('Select MAXID for upload Error')
                                }
                                else {
                                    console.log(result);
                                    let response = result[0].MAXID
                                    for (let n = 0; n < filename.length; n++) {
                                        const sql = 'INSERT INTO picdonate (picdonate_name , picdonate_donateid) VALUES (? , ?)'
                                        con.query(sql, [filename[n].filename, response], function (err) {
                                            if (err) {
                                                console.log(err)
                                                res.status(500).send('Database Error')
                                            }
                                            else {
                                                if (err) {
                                                    console.log(err)
                                                    res.status(500).send('Insert Error')
                                                    n = filename.length;
                                                }
                                                else {
                                                    if (n + 1 == filename.length) {
                                                        res.send('Projectdetail Success')
                                                    }
                                                }
                                            }
                                        });
                                    }
                                }
                            })
                        }
                    })
                }
            });
        }
    })
})

// Money Detail
app.post('/moneydetail', function (req, res) {

    const { dataitem, datestart, dateend, startprice, incomeproject, incomecompany } = req.body;
    const sql = 'SELECT MAX(donate.donate_id) AS MAXID FROM donate';
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            console.log('Database Errro Cannot Get MAXID')
            res.status(500).send('Database Errro Cannot Get MAXID');
        }
        else {
            let response = result[0].MAXID;
            const sql = 'UPDATE donate SET donate_startdate = ? , donate_enddate = ? , donate.donate_startprice = ? , donate.donate_incomeproject = ? , donate.donate_incomecompany = ? WHERE donate_id = ?'
            con.query(sql, [datestart, dateend, startprice, incomeproject, incomecompany, response], function (err, result) {
                if (err) {
                    console.log(err)
                    console.log('Database Errro')
                    res.status(500).send('Database Error')
                }
                else {
                    const sql = 'SELECT MAX(donate.donate_id) AS MAXID FROM donate';
                    con.query(sql, function (err, result) {
                        if (err) {
                            console.log(err)
                            console.log('Database Error Please Try Again')
                            res.status(500).send('Database Error Please Try Again')
                        }
                        else {
                            let idrequest = result[0].MAXID;
                            let detailitem = JSON.parse(dataitem);
                            console.log(detailitem);
                            console.log(detailitem.length);

                            const sql = "INSERT INTO charge_donate (charge_donate.charge_name , charge_donate.charge_amount , charge_donate.charge_money , charge_donate.charge_donateid) VALUES (? , ? , ? , ?)"
                            for (let i = 0; i < detailitem.length; i++) {
                                con.query(sql, [detailitem[i]['itemname'], parseInt(detailitem[i]['itemcount']), parseInt(detailitem[i]['itemprice']), idrequest], function (err, result) {
                                    if (err) {
                                        console.log(err)
                                        console.log('Detail Money Error');
                                        res.status(500).send('Database Error cannot Insert')
                                        i = detailitem.length;
                                    }
                                    else {
                                        if (i + 1 == detailitem.length) {
                                            console.log('Insert Success');
                                            res.send('Progress Success');
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
    })
});


// Project Data
// SELECT DATEDIFF(auction.auction_startdate , DATE(CURRENT_TIMESTAMP) ) FROM auction ไว้สำหรับแสดงข้อมูลของวันที่เหลือในการประมูล(ที่ใช้อยู่ตอนนี้มันผิด)
app.get('/alldataproject', function (req, res) {
    const sql = 'SELECT donate.donate_id , donate.donate_name , donate.donate_area , donate.donate_startprice , DATEDIFF(donate.donate_enddate , donate.donate_startdate) AS timeout FROM donate';
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            res.send(result);
        }
    })
});

// Get Only 1 Picture of Project
app.get('/onlypiconmainproject', (req, res) => {
    const sql = 'SELECT donate.donate_id , donate.donate_name , donate.donate_area , donate.donate_startprice , DATEDIFF(donate.donate_enddate , donate.donate_startdate) AS timeout , MIN(picdonate.picdonate_id) AS "picID" FROM donate JOIN picdonate ON donate.donate_id = picdonate.picdonate_donateid GROUP BY picdonate.picdonate_donateid'
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Database Erroo')
        }
        else {
            for (let i = 0; i < result.length; i++) {
                const sql = 'SELECT picdonate.picdonate_name FROM picdonate WHERE picdonate.picdonate_id = ? GROUP BY picdonate.picdonate_id'
                con.query(sql, result[i]['picID'], function (err, resp) {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Cannot Get Name of pic');
                        i = result.length
                    }
                    else {
                        if (i + 1 == result.length) {
                            res.send(resp)
                        }

                    }
                });
            }


        }
    })
})

app.get('/picalldataproject', function (req, res) {
    const sql = 'SELECT MAX(picdonate.picdonate_id) AS "IDTOPICTURE" FROM picdonate GROUP BY picdonate.picdonate_donateid';
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Database Get Pic Error')
        }
        else {
            const sql = 'SELECT picdonate.picdonate_name FROM picdonate WHERE picdonate.picdonate_id = ?';
            for (let i = 0; i < result.length; i++) {
                con.query(sql, [result[i]['IDTOPICTURE']], function (err, resp) {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Data Picname Error')
                    }
                    else {
                        if (i + 1 == result.length) {
                            res.send(resp);
                        }
                    }
                })
            }
        }
    })
})

// Project Detail Data
app.post('/picdetailprojectmobile', function (req, res) {
    const projectid = req.body.projectid;

    const sql = 'SELECT picdonate.picdonate_name FROM picdonate WHERE picdonate.picdonate_donateid = ?;'

    con.query(sql, [projectid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            res.send(result)
        }
    })
});

app.post('/dataprojectmobile', function (req, res) {
    const projectid = req.body.projectid
    const sql = 'SELECT donate.donate_id , donate.donate_responperson ,donate.donate_name, donate.donate_descrict , donate.donate_area , donate.donate_startprice , donate.donate_pricedurring , donate.donate_startdate , donate.donate_enddate,DATEDIFF(donate.donate_enddate , donate.donate_startdate) AS timeout , 100 / donate.donate_startprice * donate.donate_pricedurring - 100 / donate.donate_startprice * donate.donate_pricedurring % 1 AS "percen"  FROM donate WHERE donate.donate_id = ?'
    con.query(sql, [projectid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            res.send(result)
        }
    })
})

// const sql = 'SELECT donate.donate_id , donate.donate_responperson ,donate.donate_name, donate.donate_descrict , donate.donate_area , donate.donate_startprice , donate.donate_startdate , donate.donate_enddate,DATEDIFF(donate.donate_enddate , donate.donate_startdate) AS timeout , picdonate.picdonate_name FROM donate JOIN picdonate ON donate.donate_id = picdonate.picdonate_donateid WHERE donate.donate_id = ?'


// ========== For Auction ==========

// ดึงข้อมูลสำหรับโชว์การ์ดของการประมูลทั้งหมด
app.get('/allauctionpost', (req, res) => {
    const sql = 'SELECT auction.auction_id , auction.auction_name , auction.auction_endprice , DATEDIFF(auction.auction_enddate , CURRENT_DATE) AS "timeout" , donate.donate_name , donate.donate_id FROM auction JOIN donate ON donate.donate_id = auction.auction_donateID AND auction.auction_status = 2';
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            res.send(result);
        }
    })
});

// ไส้าำหรับโชว์ข้อมูลการประมูลที่ใกล้จะจบแล้ว
app.get('/auctionpostnearend', (req, res) => {
    const sql = 'SELECT auction.auction_id , auction.auction_name , auction.auction_endprice , DATEDIFF(auction.auction_enddate , CURRENT_DATE) AS "timeout" , donate.donate_name , donate.donate_id FROM auction JOIN donate ON donate.donate_id = auction.auction_donateID AND DATEDIFF(auction.auction_enddate , CURRENT_DATE) < 2 AND DATEDIFF(auction.auction_enddate , CURRENT_DATE) > 0 AND auction.auction_status = 2'
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            res.send(result);
        }
    })
})

app.get('/endauctionpost', (req, res) => {

    const sql = 'UPDATE auction SET auction.auction_status = 4 WHERE DATEDIFF(auction.auction_enddate , CURRENT_DATE) = 0'
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Cannot Update')
        }
        else {
            const sql = 'SELECT auction.auction_name , auction.auction_winner , auction.auction_endprice FROM auction WHERE auction.auction_status = 4'
            con.query(sql, function (err, resp) {
                if (err) {
                    console.log(err)
                    res.status(500).send('Cannot Select Winner')
                }
                else {
                    res.send(resp)
                }
            })
        }
    })
})

// ไว้สำหรับแสดงรายละเอียดของการประมูล
// app.post('/detailauction', (req, res) => {
//     const postid = req.body.postid;

//     const sql = 'SELECT auction.auction_id , auction.auction_name , auction.auction_endprice , auction.auction_descript, auction.auction_winner, auction.auction_size , auction.auction_weight  , picauction.picaution_name FROM auction JOIN picauction ON auction.auction_id = picauction.picauction_id AND auction.auction_id = ?';
//     con.query(sql, [postid], function (err, result) {
//         if (err) {
//             console.log(err);
//             res.status(500).send('Database Error')
//         }
//         else {
//             res.send(result);
//         }
//     });
// });

app.post('/pictureauction', (req, res) => {
    const auctionid = req.body.auctionid

    const sql = 'SELECT picauction.picauction_id , picauction.picaution_name FROM picauction WHERE picauction.picauction_auctionid = ?'
    con.query(sql, [auctionid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Cannot Get Picture Auction')
        }
        else {
            res.send(result);
        }
    })
})

app.post('/detailauction', (req, res) => {
    const auctionid = req.body.auctionid;
    const donateid = req.body.donateid;

    const sql = 'SELECT auction.auction_id , auction.auction_name , auction.auction_endprice , auction.auction_descript, auction.auction_winner, auction.auction_size , auction.auction_weight , DATEDIFF(auction.auction_enddate , CURRENT_DATE) AS "timeout" ,donate.donate_name FROM auction JOIN donate ON auction.auction_donateID = donate.donate_id AND auction.auction_id = ? AND donate.donate_id = ?'
    con.query(sql, [auctionid, donateid], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            res.send(result);
        }
    })
})

// แสดงชื่อคนที่ประมูล
app.post('/showallname', (req, res) => {
    const auctionid = req.body.auctionid

    const sql = 'SELECT bidder.bidder_price , users.users_name FROM bidder JOIN users ON users.users_id = bidder.bidder_userid AND bidder.bidder_auctionid = ?'
    con.query(sql, [auctionid], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            res.send(result);
        }
    })
})


// แสดงชื่อคนประมูลและเงินในการประมูล
app.post('/nameandmoney', (req, res) => {
    const auctionid = req.body.auctionid;

    const sql = 'SELECT MAX(bidder.bidder_id) AS MAXBIDDERID FROM bidder WHERE bidder.bidder_auctionid = ?'
    con.query(sql, [auctionid], function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send('Cannot get MAXID')
        }
        else {
            const sql = 'SELECT bidder.bidder_userid AS USERID , bidder.bidder_price FROM bidder WHERE bidder.bidder_id = ?'
            con.query(sql, [result[0].MAXBIDDERID], (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Cannot Get userid and auctionid');
                }
                else {
                    const sql = 'SELECT bidder.bidder_price , users.users_name FROM bidder JOIN users ON users.users_id = bidder.bidder_userid AND bidder.bidder_id = ? AND bidder.bidder_userid = ?'
                    con.query(sql, [result[0].MAXBIDDERID, resp[0].USERID], (err, rdata) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Cannot Get username')
                        }
                        else {
                            res.send(rdata);
                        }
                    });
                }
            })
        }
    })
});

// แสดงโครงการบริจาคที่การประมูลนี้จะบริจาคให้
app.post('/prepostdonate', (req, res) => {
    const donateid = req.body.donateidpost;

    const sql = 'SELECT donate.donate_name , DATEDIFF(donate.donate_enddate , donate.donate_startdate) AS timeday , donate.donate_startprice FROM donate WHERE donate.donate_id = ?'
    con.query(sql, [donateid], (err, result) => {
        if (err) {
            console.log(err)
            res.send('Cannot Get Donate Detail')
        }
        else {
            res.send(result);
        }
    })
})

// All Data Project For Senario
app.get('/alldataprojectforsenario', function (req, res) {

    const sql = 'SELECT donate.donate_id , donate.donate_name , donate.donate_area , donate.donate_pricedurring , DATEDIFF(donate.donate_enddate , donate.donate_startdate) AS timeout , 100 / donate.donate_startprice * donate.donate_pricedurring - 100 / donate.donate_startprice * donate.donate_pricedurring % 1 AS "percen" FROM donate ';
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            res.send(result);
        }
    })
});

app.get('/datarecommend', function (req, res) {

    const sql = 'SELECT donate.donate_id , donate.donate_name , donate.donate_area , donate.donate_pricedurring , DATEDIFF(donate.donate_enddate , CURRENT_DATE) AS timeout , 100 / donate.donate_startprice * donate.donate_pricedurring - 100 / donate.donate_startprice * donate.donate_pricedurring % 1 AS "percen" FROM donate WHERE DATEDIFF(donate.donate_enddate , CURRENT_DATE) < 2'
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send('Cannot Get data recommend');
        }
        else {
            res.send(result);
        }
    })

})

app.get('/countauction', function (req, res) {

    const sql = 'SELECT COUNT(auction.auction_id) AS "auctioncount" , donate.donate_id FROM auction JOIN donate ON auction.auction_donateID = donate.donate_id GROUP BY donate.donate_id'
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send('Cannot get auctioncount')
        }
        else {
            res.send(result)
        }
    })
})

// Auction Project
app.post('/auctiondonate', function (req, res) {
    const donateid = req.body.donateid
    const sql = 'SELECT auction.auction_id , auction.auction_name , DATEDIFF(auction.auction_enddate , CURRENT_DATE) AS "timeout" , MAX(bidder.bidder_price) AS "lastprice" FROM auction JOIN donate ON auction.auction_donateID = donate.donate_id AND donate.donate_id = ? JOIN bidder ON auction_id = bidder.bidder_auctionid GROUP BY auction_id'
    con.query(sql, [donateid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error');
        }
        else {
            res.send(result);
        }
    })
})


// Senario 1 Wallet 1000 Bath
app.post('/decreasemoney', function (req, res) {
    const decrease = req.body.decrease;
    const userid = req.body.userid

    const sql = 'UPDATE users SET users.users_money = users.users_money - ? WHERE users.users_id = ?'
    con.query(sql, [decrease, userid], function (err, result) {

    })
});

app.post('/numberofmoney', function (req, res) {
    const userid = req.body.userid;

    const sql = 'SELECT users.users_money FROM users WHERE users.users_id = ?'
    con.query(sql, [userid], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Cannot Get Number of money')
        }
        else {
            res.send(result);
        }
    })
})

// ไว้สำหรับเก็บข้อมูลของคนที่มาประมูล รวมถึงเก็บราคาด้วย
app.post('/doauction', (req, res) => {
    const auctionid = req.body.auctionid;
    const userid = req.body.userid
    const price = req.body.price;


    const sql = 'INSERT INTO bidder (bidder.bidder_price , bidder.bidder_time , bidder.bidder_userid , bidder.bidder_auctionid) VALUES (? , CURRENT_TIMESTAMP , ? , ?)';
    con.query(sql, [price, userid, auctionid], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            const sql = 'UPDATE auction SET auction.auction_endprice = ? , auction.auction_winner = ? WHERE auction.auction_id = ?'
            con.query(sql, [price, userid, auctionid], function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Database Error')
                }
                else {
                    res.send('Sucess to Insert');
                }
            })
        }

    })
});

// เตรียมไว้สำหรับการบริจาค
app.post('/dodonate', function (req, res) {
    const postid = req.body.postid;
    const pricedonate = req.body.pricedonate;
    const userid = req.body.userid

    const sql = 'INSERT INTO donater(donater.donater_price , donater.donater_when , donater.donater_userdonateid , donater.donater_donateid) VALUES (? , CURRENT_TIMESTAMP ,? ,?)'
    con.query(sql, [pricedonate, userid, postid], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Cannot Insert Database Error')
        }
        else {
            const sql = 'UPDATE donate SET donate.donate_pricedurring = donate.donate_pricedurring + ? WHERE donate.donate_id = ?'
            con.query(sql, [pricedonate, postid], function (err, resp) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Cannot Update Donate Table')
                }
                else {
                    const sql = 'UPDATE users SET users.users_money = users.users_money - ? WHERE users.users_id = ?'
                    con.query(sql, [pricedonate, userid], function (err, data) {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Cannot Update User Table')
                        }
                        else {
                            res.send('Donate Success')
                        }
                    })
                }
            })
        }
    })
})

// ไว้สำหรับบเช็คเงินที่มีใน Wallet

// ------------------------ Serevr for Web Admin -----------------------------------


// Page Route
// Login Page
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './views/admin_login.html'))
})

// Request
app.get('/request', function (req, res) {
    res.sendFile(path.join(__dirname, './views/admin_request.html'))
})

// Detail Request
app.get('/detailrequest', function (req, res) {
    res.sendFile(path.join(__dirname, './views/admin_detailrequest.html'))
})

// All Project
app.get('/allproject', function (req, res) {
    res.sendFile(path.join(__dirname, './views/admin_allproject.html'))
})

// Detail Project
app.get('/detailproject', function (req, res) {
    res.sendFile(path.join(__dirname, './views/admin_detailproject.html'))
})

// Logout
app.get('/logout', function (req, res) {
    res.redirect('/');
})

//auction organization
app.get('/auction_organiz', function (req, res) {
    res.sendFile(path.join(__dirname, './views/auctionorganiz.html'))
});

app.get('/detailDelivery_auction',function(req,res){
    res.sendFile(path.join(__dirname, './views/auctionorganiz_detaildelivery.html'));
});

app.get('/detailrequest_auction',function (req,res){
    res.sendFile(path.join(__dirname,'./views/detailrequest_auction.html'));
});

app.get('/detail_auction',function(req,res){
    res.sendFile(path.join(__dirname,'./views/detail_auction.html'));
});

app.get('/status-delivery',function(req,res){
    res.sendFile(path.join(__dirname,'./views/status_item_delivery.html'))
})
app.get('/auction',function(req,res){
    res.sendFile(path.join(__dirname,'./views/auction.html'))
})


app.post('/loginadmin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const sql = 'SELECT users_id, users_username , users_password , users_role FROM users WHERE users_username = ? AND users_role = 1';
    con.query(sql, [username], (err, result) => {
        if (err) {
            console.log(err);
            console.log('Do not have account')
            res.status(500).send('Database Error');
        }

        // Wrong Username
        if (result.length != 1) {
            console.log(err);
            console.log('Do not have account 2')
            return res.status(500).send('Wrong Username')
        }

        // Inative User
        if (result[0].users_role == 0) {
            res.status(400).send('User do not have permission to login')
        }

        // Verify Password
        bcrypt.compare(password, result[0].users_password, (err, same) => {
            if (err) {
                console.log(err)
                res.status(500).send('Bcrypt Error')
            }
            if (!same) {
                res.status(400).send('Wrong Password Please enter password again')
            }

            if (same) {
                res.send('/request');
            }
        })
    })
})

// For table in First Screen
app.get('/getdonate', (req, res) => {
    const sql = 'SELECT donate.donate_id , donate.donate_responperson , donate.donate_name, DATE(donate.donate_startdate) AS donatestart FROM donate WHERE donate.donate_status = 1';
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            res.send(result);
        }
    })
})

// Detail Project Request
app.post('/detailrequestproject', (req, res) => {
    const requestid = req.body.requestid;
    const sql = 'SELECT * FROM donate JOIN donate_type ON donate.donate_types = donate_type.type_id AND donate.donate_id = ?'
    con.query(sql, [requestid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            res.send(result);
        }
    })
});

// Get all Picture From Request
app.post('/picfromrequest', (req, res) => {
    const requestid = req.body.requestid;
    const sql = 'SELECT picdonate_name FROM picdonate WHERE picdonate_donateid = ?'
    con.query(sql, [requestid], function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send('Database Error')
        }
        else {
            res.send(result);
        }
    })
})

// Detail table Project Request
app.post('/detailtablerequestproject', (req, res) => {
    const requestid = req.body.requestid;
    const sql = 'SELECT * FROM charge_donate WHERE charge_donate.charge_donateid = ?'
    con.query(sql, [requestid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            res.send(result);
        }
    })
})

// Approve Project !! Change status project from 1 to 2
app.post('/approveproject', (req, res) => {
    const requestid = req.body.requestid;
    const sql = 'UPDATE donate SET donate.donate_status = 2 WHERE donate.donate_id = ?'
    con.query(sql, [requestid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            if (result.affectedRows != 1) {
                console.log(err)
                res.status(500).send('Update Error')
            }
            else {
                res.send('/request')
            }

        }
    })
})


// Unapprove Project !! Change status project from 1 to 3
app.post('/unapproveproject', (req, res) => {
    const requestid = req.body.requestid;
    const reason = req.body.reason;
    const sql = 'UPDATE donate SET donate.donate_status = 3, donate.donate_reasonunapprove = ? WHERE donate.donate_id = ?'
    con.query(sql, [reason, requestid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            if (result.affectedRows != 1) {
                console.log(err);
                res.status(500).send('Update Error')
            }
            else {
                res.send('/request')
            }

        }
    })
})

// Allproject Table
app.get('/allprojecttable', function (req, res) {
    const sql = 'SELECT donate.donate_id , donate.donate_responperson , donate.donate_name, DATE(donate.donate_startdate) AS donatestart , donate.donate_payment_status , donate.donate_percen  FROM donate WHERE donate.donate_status != 1'
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            res.send(result);
        }
    });
});

app.post('/detailallproject', function (req, res) {
    const requestid = req.body.requestid;

    const sql = 'SELECT donate.donate_responperson , DATEDIFF(donate.donate_enddate , donate.donate_startdate) AS timeout , donate.donate_percen , donate.donate_startprice , donate.donate_incomeproject , donate.donate_incomecompany ,donate.donate_startdate , donate.donate_enddate , donate.donate_name , donate.donate_descrict , donate.donate_area , donate.donate_reason , donate_type.type_name FROM donate JOIN donate_type ON donate.donate_types = donate_type.type_id AND donate.donate_id = ?'
    con.query(sql, [requestid], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            res.send(result);
        }
    })
})

// Get Number of Project
app.get('/numberallproject', (req, res) => {
    const sql = 'SELECT COUNT(donate.donate_id) AS allproject FROM donate WHERE donate.donate_status != 1 AND donate.donate_status != 3'
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send('Database Error')
        } else {
            res.send(result);
        }
    });
})

app.get('/numberprojectcoming', (req, res) => {
    const sql = 'SELECT COUNT(donate.donate_id) AS projectcoming FROM donate WHERE donate.donate_status = 2'
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send('Database Error')
        }
        else {
            res.send(result)
        }
    })
})

app.get('/numberprojectsuccess', (req, res) => {
    const sql = 'SELECT COUNT(donate.donate_id) AS projectsuccess FROM donate WHERE donate.donate_status = 4'
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error')
        }
        else {
            res.send(result)
        }
    })
})

app.get('/numberprojectnotmoney', (req, res) => {
    const sql = 'SELECT COUNT(donate.donate_id) AS projectnomoney FROM donate WHERE donate.donate_status = 5'
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send('Database Error')
        }
        else {
            res.send(result)
        }
    })
});


// Create hash password for Admin
app.get('/hasingpassword/:password', (req, res) => {
    const password = req.params.password
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            console.log(err);
            res.status(500).send('Hashing Password Error');
        }
        else {
            res.send(hash);
        }
    })
})

// Uri to connect Mobile 10.0.2.2(MemuPlay)
PORT = 3000;
app.listen(PORT, function () {
    console.log('Server starts at port ' + PORT);
});
