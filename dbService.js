const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
let instance = null;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "price_chart",
    port: 3306
});

connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});



class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM total_supply_chart;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO events (date, time, supply) VALUES (?,?,?);";

                connection.query(query, [date, time, supply] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
                date : date,
                time : time,
                supply: supply
            };
        } catch (error) {
            console.log(error);
        }
    }

}


module.exports = DbService; 