const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'armatufiesta',
  password: '0809', 
  port: 5432,
});

function beforeRender(req, res, done) {
 const min = req.data.min;
  const max = req.data.max;
db.connect();
 

  let query = "select DISTINCT(s.nombre_servicio) as nombre, c.fecha_contratacion as fecha, s.costo_servicio as costo from contratacion c inner join servicio s on c.servicio_id_servicio = s.id_servicio where c.fecha_contratacion between (TIMESTAMP '"+min+"') and (TIMESTAMP '"+max+"') and s.tercerizado_servicio = true  order by c.fecha_contratacion ";

  db.query(query, (err, result) => {
    
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}