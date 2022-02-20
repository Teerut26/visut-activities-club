const { knex } = require('../../config/database')

const getSutudentFromID = async (id) => {
  let result = await knex('students').where({ select_club_id: id })
  return result.length
}
export {
    getSutudentFromID
}
