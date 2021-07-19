const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Bases1',
  password: '0809', 
  port: 5432,
});

function beforeRender(req, res, done) {
const idcontrato= req.data.idcontrato;


db.connect();

var query = ["select pq.fecha_viaje, it.orden, cd.nombre_ciudad, it.tiempo_estadia  from edw_pqt_contrato pq, edw_itinerario it, edw_ciudad cd where pq.edw_paquete_id_paquete = it.edw_paquete_id_paquete and it.edw_ciudad_id_ciudad= cd.id_ciudad and pq.id_paquete_contrato='"+idcontrato+"' order by 2"];   
  db.query(query.join(' '), (err, result) => {
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}