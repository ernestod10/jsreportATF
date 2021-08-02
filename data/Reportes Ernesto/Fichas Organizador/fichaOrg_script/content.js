const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Subastas',
  password: '0809', 
  port: 5432,
});

function beforeRender(req, res, done) {
const idorg= req.data.idorg;

var data1;



db.connect();

var query = ["Select o.nombre org, o.id_organizacion, o.fecha_fundacion, o.proposito ,c.nombre,c.apellido, c.telefono,c.email,c.doc_identidad from ec_organizacion o left join ec_organizador_contacto c on o.id_organizacion = c.ec_organizacion_id_organizacion"];
  if ((idorg!="-1")&&(!isNaN(idorg))) query.push(" where o.id_organizacion = ('"+idorg+"')");
  if ((idorg!="-1")&&(isNaN(idorg))) query.push(" where o.nombre like ('%"+idorg+"%') or  o.ec_lugar_id_lugar in (select id_lugar from ec_lugar where nombre_pais like ('%"+idorg+"%'))");
  
  db.query(query.join(' '), (err, result) => {
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
  
    db.end();
    done();
  });




}