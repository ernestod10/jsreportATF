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
 

  let query = 'SELECT * FROM edw_proovedor_agencia inner join edw_proveedores ep on ep.numero_documento_1 = edw_proovedor_agencia.edw_proveedores_numero_documento_1 WHERE edw_agencia_id_agencia = 1 order by ep.tipo_proveedor, fecha_asociacion';

  db.query(query, (err, result) => {
    
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}