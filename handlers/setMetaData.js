const setMetaData = (req, res, name, metatitle="Unknown page", navpick="") => {
    console.log(name)
    res.locals.metatitle = metatitle
    res.locals.navpick = navpick
}

module.exports = setMetaData