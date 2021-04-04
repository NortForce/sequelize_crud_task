const { isInteger } = require('lodash');

module.exports.setPagintion = async (req, res, next) => {
  try {
    const defaultLimit = 5;
    const defaultOffset = 0;

    const {query: {limit, offset}} = req;

    if(Number.isInteger(Number(limit)) && Number.isInteger(Number(offset)) && limit < 1000) {
      req.limit = limit ;
      req.offset = offset ;    
    }
    else {
      req.limit = defaultLimit;
      req.offset = defaultOffset;    
    }
  
    next();    
  } catch (err) {
    next(err);
  }
}