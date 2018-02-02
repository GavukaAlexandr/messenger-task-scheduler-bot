function AddApiRoutes(app) {
    app.use(require('./messenger/index.js'));
}
module.exports = function (app) {
    return new AddApiRoutes(app);
};
