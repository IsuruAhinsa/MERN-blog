const AppRoutes = (app) => {
    app.get("/", (req, res) => {
        res.send("<h1>Application Index</h1>");
    });
}

export default AppRoutes;