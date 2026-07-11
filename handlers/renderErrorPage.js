const renderErrorPage = (res, code, message) => {
    res.locals.metatitle = code
    res.status(code).render('error', {code, message})
}

module.exports = renderErrorPage