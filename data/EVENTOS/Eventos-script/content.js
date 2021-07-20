const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Subastas',
  password: '0809', 
  port: 5432,
});

function beforeRender(req, res, done) {
 const idAgencia = req.data.idAgencia;
db.connect();
 

  let query = 'Select e.*, o.nombre  from ec_evento e , ec_evento_organizador ec ,ec_organizacion o where e.id_evento = ec.ec_evento_id_evento and ec.ec_organizacion_id_organiacion ='+idAgencia+' group by e.id_evento, o.nombre order by e.id_evento ';

  db.query(query, (err, result) => {
    
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}