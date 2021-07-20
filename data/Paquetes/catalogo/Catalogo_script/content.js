const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Subastas',
  password: '0809', 
  port: 5432,
});

function beforeRender(req, res, done) {
const idagencia= req.data.idagencia;
const costomin= req.data.costomin;
const costomax= req.data.costomax;
const personas= req.data.personas;
const salidamin= req.data.salidamin;
const salidamax= req.data.salidamax;
const duracion= req.data.duracion;

db.connect();

var query = ["select ag.nombre_agencia, pq.nombre_paquete, hpp.costo_base, pq.duracion_paquete_dias, pq.cantidad_personas, string_agg(distinct(cd.nombre_ciudad),',') ciudades ,string_agg(distinct(pa.continente),',') continente from edw_pais pa, edw_agencia ag, edw_paquete pq , edw_ciudad cd, edw_itinerario it, edw_historico_precio_paquete hpp, edw_calendario_anual ca where pq.edw_agencia_id_agencia= ag.id_agencia  and it.edw_paquete_id_paquete= pq.id_paquete  and cd.id_ciudad = it.edw_ciudad_id_ciudad and cd.edw_pais_id_pais= pa.id_pais  and hpp.edw_paquete_id_paquete= pq.id_paquete   and hpp.fecha_fin is null   and ca.edw_paquete_id_paquete = pq.id_paquete"];
  if (idagencia!="0") query.push(" and id_agencia= '"+idagencia+"' ");
  if (costomax!="0") query.push(" and hpp.costo_base <= '"+costomax+"' ");
  if (costomin!="0") query.push(" and hpp.costo_base >= '"+costomin+"'");
  if (personas!="0")  query.push(" and pq.cantidad_personas = '"+personas+"' "); 
  if (duracion!="0") query.push(" and pq.duracion_paquete_dias = '"+duracion+"' ");
  if (salidamax!=salidamin)  query.push("and ca.fechas_salida between '"+salidamin+"' and '"+salidamax+"'  " )
  query.push("group by 1,2,3,4,5");


  
  db.query(query.join(' '), (err, result) => {
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}