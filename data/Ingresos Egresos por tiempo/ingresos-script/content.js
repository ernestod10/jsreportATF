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
 

  let query = "select sum(p.monto_presupuesto) as ingresos ,sum(s.costo_servicio) as egresos from servicio s inner join contratacion k on s.id_servicio = k.servicio_id_servicio, contrato c inner join presupuesto p on c.presupuesto_id_presupuesto = p.id_presupuesto where c.fecha_expedicion_contrato between (TIMESTAMP '"+min+"') and (TIMESTAMP '"+max+"') and k.fecha_expedicion_contrato between (TIMESTAMP '"+min+"') and (TIMESTAMP '"+max+"')";

  db.query(query, (err, result) => {
    
    console.log(err);
    req.data = {
      rows: result.rows,
      "min":min,
      "max":max
    };
    db.end();
    done();
  });
}