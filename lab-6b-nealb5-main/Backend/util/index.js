// basket

const db = require('../model/db'); // Adjust the path as necessary to import your db connection

exports.getBasketIdForUser = async function getBasketIdForUser(userId) {
  // Query the database to get the basket associated with the given userId
  const [rows] = await db.execute("SELECT id FROM Baskets WHERE userId = ?", [userId]);
  
  // If a basket was found for the user, return its id
  if (rows.length > 0) {
    return rows[0].id;
  }

  // If no basket was found for the user, create a new basket and return its id
  else {
    const [result] = await db.execute("INSERT INTO Baskets (userId) VALUES (?)", [userId]);
    return result.insertId;
  }
}


