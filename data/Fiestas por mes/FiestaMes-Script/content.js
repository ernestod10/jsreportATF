const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'armatufiesta',
  password: '0809', 
  port: 5432,
});

function beforeRender(req, res, done) {
db.connect();

  let query = "select month(fecha_evento_contrato) ,count(month(fecha_evento_contrato)) from contrato ";
  
   
  query += " group by month(fecha_evento_contrato) order by month(fecha_evento_contrato) ";
  
  db.query(query, (err, result) => {
    
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}