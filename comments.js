// Create web server for comment

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var commentSQL = require('../db/commentSql');
var pool = mysql.createPool(dbConfig.mysql);

router.get('/', function(req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.query || req.params;
        connection.query(commentSQL.getCommentByPostId, [param.postId], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: 'success',
                    data: result
                };
                res.json(result);
                connection.release();
            } else {
                result = {
                    code: 500,
                    msg: 'error'
                };
                res.json(result);
                connection.release();
            }
        });
    });
});

router.post('/add', function(req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query(commentSQL.addComment, [param.postId, param.userId, param.content, param.time], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: 'success',
                    data: result.insertId
                };
                res.json(result);
                connection.release();
            } else {
                result = {
                    code: 500,
                    msg: 'error'
                };
                res.json(result);
                connection.release();
            }
        });
    });
});

router.post('/delete', function(req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query(commentSQL.deleteComment, [param.id], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: 'success',
                    data: result.insertId
                };
                res.json(result);
                connection.release();
            } else {
                result = {
                    code: 500,
                    msg: 'error'
                };
                res.json(result);
                connection.release();
            }
        });
    });
});

module.exports = router;
