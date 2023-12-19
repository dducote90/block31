const pg = require('pg')

const client = new pg.Client('postgres://localhost/my_pets')
//postico
//postbird
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.get('/api/pets', async (req, res, next) => {
        try {
            const SQL = `
                SELECT *
                FROM pets
            `
                const response = await client.query(SQL)
                console.log(response.rows)
                res.send(response.rows)
        } catch (error) {
                    next(error)
        }
})

const init = async () => {
  await client.connect()
  const SQL = `
        DROP TABLE IF EXISTS pets;
        CREATE TABLE pets(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            is_favorite Boolean
        );
        INSERT INTO pets (name) VALUES ('spot');
        INSERT INTO pets (name) VALUES ('sparky');
        INSERT INTO pets (name, is_favorite) VALUES ('panda', true);
  `
            await client.query(SQL)
            console.log("table created")


            const port = 3001;
            app.listen(port, () => {
                        console.log(`listening on port ${port}`)
            })

}

init()