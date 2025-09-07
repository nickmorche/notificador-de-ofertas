function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        sucess:false,
        message: err.message || 'Erro interno no servidor',
    });
}

module.exports = { errorHandler };