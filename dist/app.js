'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./config/routes');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _swagger = require('./config/swagger.json');

var _swagger2 = _interopRequireDefault(_swagger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect("mongodb://localhost/invoice-builder");
var app = (0, _express2.default)();
var PORT = 3000;

app.use(_express2.default.json());
app.use(_express2.default.urlencoded());
app.use((0, _morgan2.default)('combined'));
app.use("/api-doc", _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger2.default, {
    explorer: true
}));
app.use("/api", _routes.router);

app.use(function (req, res, next) {

    var error = new Error();
    error.status = 400;
    error.message = "Customer Error";
    next(error);
});
app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    return res.json({
        error: {
            msg: error.message
        }
    });
});

app.listen(PORT, function () {
    console.log("server is runining ", PORT);
});
//# sourceMappingURL=app.js.map