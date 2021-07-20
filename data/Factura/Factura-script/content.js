const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Subastas',
  password: '0809', 
  port: 5432,
});

function beforeRender(req, res, done) {
const idContrato= req.data.idContrato;


db.connect();

var query = ["select id_paquete_contrato, monto_total costo, pq.nombre_paquete, nombre_cliente, apellido_1 apellido1, id_cliente from edw_forma_pago fp, edw_pqt_contrato pcq, edw_paquete pq , edw_cliente cl where pcq.id_paquete_contrato ='"+idContrato+"' and pq.id_paquete=pcq.edw_paquete_id_paquete and fp.edw_pqt_contrato_id_paquete_contrato=pcq.id_paquete_contrato and fp.edw_metodo_pago_edw_cliente_id_cliente=cl.id_cliente"];

  db.query(query.join(' '), (err, result) => {
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}