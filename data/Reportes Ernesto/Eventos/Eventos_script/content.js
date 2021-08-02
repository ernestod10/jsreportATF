const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Subastas',
  password: '0809', 
  port: 5432,
});

function beforeRender(req, res, done) {
const norg= req.data.norg;
const salidamin= req.data.salidamin;
const salidamax= req.data.salidamax;
const estado= req.data.estado;
const tipo= req.data.tipo;

db.connect();

var query = ["Select o.nombre Tienda, e.estatus, e.fecha_inicio, e.tipopujas from ec_organizacion o, ec_evento e, ec_evento_organizador eo where o.id_organizacion = eo.ec_organizacion_id_organizacion and e.id_evento=eo.ec_evento_id_evento"];
  query.push("   and o.id_organizacion = "+norg+" or o.nombre like '"+norg+"%' "); 
 

  
  db.query(query.join(' '), (err, result) => {
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });



}