const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Subastas',
  password: '0809', 
  port: 5432,
});

function beforeRender(req, res, done) {

db.connect();
 

  let query = 'select ob.nur, ob.nombre from ec_catalogo_obra ob, ec_evento_organizador ev,  ec_evento_id_evento_seq eseq where ob.ec_organizacion_id_organizacion = ev.ec_organizacion_id_organizacion and ev.ec_evento_id_evento=eseq.last_value union select co.nur, mo.nombre from ec_moneda mo, ec_catalogo_monedas co ,ec_evento_organizador ev, ec_evento_id_evento_seq eseq where mo.id_moneda=co.ec_moneda_id_moneda and co.ec_organizacion_id_organizacion=ev.ec_organizacion_id_organizacion and ev.ec_evento_id_evento=eseq.last_value';

  db.query(query, (err, result) => {
    
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}