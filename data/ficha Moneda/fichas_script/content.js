const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Subastas',
  password: '0809', 
  port: 5432,
});

function beforeRender(req, res, done) {
const id= req.data.idevento;


db.connect();

var query = ["select ob.nur, ob.nombre,ob.año, ar.nombre nArtista, ar.apellido from ec_catalogo_obra ob, ec_artista ar, a_o ao, ec_subasta_objeto so where ao.ec_catalogo_obra_nur=ob.nur and ao.ec_artista_id_artista=ar.id_artista and so.ec_catalogo_obra_nur=ob.nur and so.ec_evento_id_evento="+id+" and so.vendido=false order by orden asc limit 1 "];

  db.query(query.join(' '), (err, result) => {
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}