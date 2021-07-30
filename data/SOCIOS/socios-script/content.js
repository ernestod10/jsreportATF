const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Bases1',
  password: '0809', 
  port: 5432,
});

function beforeRender(req, res, done) {
 const min = req.data.min;
  const max = req.data.max;
db.connect();
 

  let query = 'select * from edw_socios inner join edw_agencia ea on ea.id_agencia = edw_socios.edw_agencia_id_agencia1 where edw_socios.edw_agencia_id_agencia=1 order by  ea.tipo_de_operacion, fecha_asociacion';

  db.query(query, (err, result) => {
    
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}