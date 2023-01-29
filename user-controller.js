const uuidv4 = require('uuid/v4');
const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  email: Joi.string().email({ minDomainSegments: 2 })
});

const resultItemConverter = (item) => {
  return {
    id: item.id,
    username: item.username,
    email: item.email
  }
}

exports.getAll = () => new Promise(async (resolve, reject) => {
  try {
    let result = db.get('users').value();

    resolve(result.map((item) => resultItemConverter(item)));
  }
  catch (err) {
    reject(err);
  }
})
