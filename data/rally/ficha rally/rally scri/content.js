const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Bases1',
  password: '0809', 
  port: 5432,
});

function beforeRender(req, res, done) {
const continente= req.data.continente;
const salidamin= req.data.salidamin;
const salidamax= req.data.salidamax;
db.connect();

var query = ["select rl.nombre, rl.fecha_inicio_rally, string_agg(distinct (ag.nombre_agencia),',') agencias, string_agg(distinct(concat('premio:',pm.nombre_premio,' posicion:',pm.posicion_participante)),',')premios, string_agg(distinct(cd.nombre_ciudad),',')circuito,string_agg(distinct(vj.primer_nombre),','), (select vjj.primer_nombre from edw_viajero vjj, edw_participante pcc where vjj.id_viajero=pcc.edw_reg_viajero_edw_viajero_id_viajero and posicion_rally=1) ganador from edw_rally rl, edw_premio_rally pm, edw_ciudad cd, edw_rally_ciudad rc, edw_agencia_rally ar, edw_pais pa ,edw_agencia ag, edw_participante pc, edw_viajero vj where rl.id_rally= pm.edw_rally_id_rally and cd.id_ciudad= rc.edw_ciudad_id_ciudad and ar.edw_agencia_id_agencia= ag.id_agencia and pc.edw_reg_viajero_edw_viajero_id_viajero= vj.id_viajero and cd.edw_pais_id_pais=pa.id_pais"];
  if (continente!="0") query.push(" and continente like '"+continente+"' ");
  if (salidamax!=salidamin)  query.push("and rl.fecha_inicio_rally between '"+salidamin+"' and '"+salidamax+"'  " )
  query.push("group by 1,2");


  
  db.query(query.join(' '), (err, result) => {
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}