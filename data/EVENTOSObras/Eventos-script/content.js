const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Subastas',
  password: '0809', 
  port: 5432,
});

function beforeRender(req, res, done) {
 const id = req.data.id;
db.connect();
 

  let query = 'select ob.nur, ob.año, ob.nombre, ar.nombre arNombre, ar.apellido from ec_catalogo_obra ob, a_o ao, ec_artista ar where ar.id_artista=ao.ec_artista_id_artista and ob.nur = ao.ec_catalogo_obra_nur and ob.ec_organizacion_id_organiacion='+id+' and ob.nur not in(select so.ec_catalogo_obra_nur from ec_subasta_objeto so where ec_organizacion_id_organiacion ='+id+' ) ';

  db.query(query, (err, result) => {
    
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}