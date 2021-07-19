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

var query = ["select vj.primer_nombre, vj.primer_apellido, ps.numero, pa.nacionalidad from edw_viajero vj, edw_pasaporte ps, edw_pais pa, edw_viajero_viaje vv where vj.edw_ciudad_edw_pais_id_pais=pa.id_pais and vj.id_viajero = ps.edw_viajero_id_viajero and vv.edw_pqt_contrato_id_paquete_contrato ='"+idcontrato+"' and vv.edw_viajero_id_viajero= vj.id_viajero"];   
  db.query(query.join(' '), (err, result) => {
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}