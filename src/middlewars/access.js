const Good = require("../db/models/Good.model");

const registeredUser = (req, res, next) => {
  (!req.session?.name) ? res.redirect('/user/login') : next();
}


const selfAccess = async (req, res, next) => {
  try {
    const currentGood = await Good.findById(req.params.id).populate('seller').lean()
    const currentGoodSellerId = JSON.parse(JSON.stringify(currentGood)).seller._id
    if (req.session.userId !== currentGoodSellerId) {
      res.redirect('/')
    }
  } catch (error) {
    console.error(error)
  } finally {
    next()
  }
}

module.exports = { registeredUser, selfAccess }
