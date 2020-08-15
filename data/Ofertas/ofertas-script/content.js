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

  let query = "select p.nombre_producto as nombre, p.precio_producto as original, pp.precio_unitario_producto_presupuesto as venta from producto p inner join producto_presupuesto pp on p.id_producto = pp.producto_id_producto where pp.presupuesto_id_presupuesto in (select presupuesto_id_presupuesto from contrato where fecha_evento_contrato between (Timestamp'"+min+"') and (Timestamp'"+max+"')) and pp.precio_unitario_producto_presupuesto < p.precio_producto union select s.nombre_servicio as nombre, s.precio_servicio as original, sp.precio_unitario_servicio_presupuesto as venta from servicio s inner join servicio_presupuesto sp on s.id_servicio = sp.servicio_id_servicio where sp.presupuesto_id_presupuesto in (select presupuesto_id_presupuesto from contrato where fecha_evento_contrato between (Timestamp'"+min+"') and (Timestamp'"+max+"')) and sp.precio_unitario_servicio_presupuesto < s.precio_servicio";

  
  db.query(query, (err, result) => {
    
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}