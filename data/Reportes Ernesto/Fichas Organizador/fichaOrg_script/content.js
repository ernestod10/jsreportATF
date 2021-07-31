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
const costomin= req.data.costomin;
const costomax= req.data.costomax;
const personas= req.data.personas;
const salidamin= req.data.salidamin;
const salidamax= req.data.salidamax;
const duracion= req.data.duracion;
var data1;
var data2;
var data3;

db.connect();

var query1 = ["select ca.fechas_salida, pq.imgurl ,pq.descripcion, pq.nombre_paquete, hpp.costo_base, pq.duracion_paquete_dias, pq.cantidad_personas, string_agg(distinct(concat(cd.nombre_ciudad,': ', it.tiempo_estadia,' dias')),',')itinerario, string_agg(distinct(pa.continente),',') continente from edw_pais pa, edw_agencia ag, edw_paquete pq , edw_ciudad cd, edw_itinerario it, edw_historico_precio_paquete hpp, edw_calendario_anual ca where pq.edw_agencia_id_agencia= ag.id_agencia  and it.edw_paquete_id_paquete= pq.id_paquete  and cd.id_ciudad = it.edw_ciudad_id_ciudad and pa.id_pais=cd.edw_pais_id_pais and hpp.edw_paquete_id_paquete= pq.id_paquete   and hpp.fecha_fin is null   and ca.edw_paquete_id_paquete = pq.id_paquete"];
  if (continente!="0") query.push(" and continente like '"+continente+"' ");
    if (costomax!="0") query.push(" and hpp.costo_base <= '"+costomax+"' ");
  if (costomin!="0") query.push(" and hpp.costo_base >= '"+costomin+"'");
  if (personas!="0")  query.push(" and pq.cantidad_personas = '"+personas+"' "); 
  if (duracion!="0") query.push(" and pq.duracion_paquete_dias = '"+duracion+"' ");
  if (salidamax!=salidamin)  query.push("and ca.fechas_salida between '"+salidamin+"' and '"+salidamax+"'  " )
  query.push("group by 1,2,3,4,5,6,7");
  query.push("order by 1");
  db.query1(query1.join(' '), (err, result) => {
    console.log(err);
    req.data.data1 = {
      rows: result.rows
      
    };
    db.end();
    done();
  });


db.connect();
var query2 = [" select * from ec_lugar"]
  db.query2(query2.join(' '), (err, result) => {
    console.log(err);
    req.data.data2 = {
      rows: result.rows
      
    };
    db.end();
    done();
  });

db.connect();
var query3 = [" select * from ec_lugar"]
db.query3(query13.join(' '), (err, result) => {
    console.log(err);
    req.data.data3 = {
      rows: result.rows
      
    };
    db.end();
    done();
  });

}