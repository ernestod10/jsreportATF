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
 

  let query = 'select ob.ec_moneda_id_moneda id ,ob.nur, mo.año, mo.nombre, ar.nombre arNombre, ar.apellido from ec_catalogo_monedas ob, a_m ao, ec_artista ar, ec_moneda mo where ar.id_artista=ao.ec_artista_id_artista and ob.ec_moneda_id_moneda = ao.ec_moneda_id_moneda and ob.ec_organizacion_id_organiacion='+id+' and ob.nur not in(select so.ec_catalogo_monedas_nur from ec_subasta_objeto so where ec_organizacion_id_organiacion ='+id+' )';

  db.query(query, (err, result) => {
    
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}