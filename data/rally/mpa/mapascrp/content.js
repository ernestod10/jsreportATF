const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Subastas',
  password: '0809', 
  port: 5432,
});

function beforeRender(req, res, done) {
const fecha= req.data.fecha;


db.connect();

var query = ["select count(*) cantidad, lat, long, nombre_ciudad from edw_ciudad cd, edw_valoracion va where cd.id_ciudad=va.edw_ciudad_id_ciudad and extract(year from fecha) = 2021 group by 2,3,4 order by cantidad desc"];   
  db.query(query.join(' '), (err, result) => {
    console.log(err);
    req.data = {
      rows: result.rows
    };
    db.end();
    done();
  });
}
