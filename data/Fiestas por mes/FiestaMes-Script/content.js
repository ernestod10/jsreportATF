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

  let query = "select EXTRACT(month from fecha_evento_contrato) as mes,count(Extract (month from fecha_evento_contrato)) from contrato ";
  
   
  query += " group by mes order by mes";
  
  db.query(query, (err, result) => {
    
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}