var map = L.map(document.getElementById('minimap'),
{ center: [41.362632, -7.838739],
    zoom: 10
});

//BASEMAP
var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {});
osm.addTo(map);
//CARACTERÍSTICAS DO ICON EM CÍRCULO
const geojsonMarkerOptions= {
    radius:6, 
    fillColor:"#ff7800",
    color: "#000",
    weight:1, 
    opacity:1, 
    fillOpacity:0.8
};

//ADIÇÃO DE PONTOS COM POP-UP COM IMAGENS AO CLICAR E AINDA INFO EM CAIXA "INFO" E APLICAR ESTES PONTOS NO MARKERCLUSTERGROUP PARA ELES AGRUPAREM-SE
var pontos = L.geoJSON(data, {
        pointToLayer: circulo});
function circulo (pontos, latlng){
    var att= pontos.properties;
    return document.getElementById("titulo").innerHTML= '<h1> ' + att.Nome + '</h1>',document.getElementById("Long").innerHTML= '<p><strong> Coordenadas:</strong> ' + att.Y + ', ' + att.X + '</p>',document.getElementById("Distrito").innerHTML='<p><strong> Distrito:</strong> ' + att.Distrito + '</p>',document.getElementById("Concelho").innerHTML='<p><strong> Concelho:</strong> ' + att.Concelho + '</p>', document.getElementById("Rio").innerHTML= '<p><strong> Rio:</strong> ' + att.Rio + '</p>',document.getElementById("Altura").innerHTML= '<p><strong> Altura (m):</strong> ' + att.Altura_m + '</p>',document.getElementById("Altitude").innerHTML= '<p><strong> Altitude (m):</strong> ' + att.Altitude_m + '</p>',document.getElementById("Precipitacao").innerHTML= '<p><strong> Precipitação Média Anual (mm):</strong> ' + att.Precipitac + '</p>',document.getElementById("Area").innerHTML= '<p><strong> Área da bacia (km2):</strong> ' + att.Area + '</p>',document.getElementById("Usos").innerHTML= '<p><strong> Uso:</strong> ' + att.Uso + '</p>', document.getElementById('imagem').innerHTML='<img src:' + att.Fonte + ' alt="Sem foto"' + '>',L.circleMarker(latlng, geojsonMarkerOptions);
};
pontos.addTo(map);

//ADIÇÃO DA ESCALA
var scale = L.control.scale();
scale.addTo(map);

//Adição da Orientação
var north = L.control({position: "topleft"});
north.onAdd = function(map) {
var div = L.DomUtil.create("div", "info legend");
    div.innerHTML = '<img src="direction.png">';
    return div;
};
 
north.addTo(map);
 
 //PARA FAZER LEGENDA
var shapes={
        'Cascatas':pontos,
    };
var basemap={'Basemap': osm};

L.control.layers(basemap, shapes).addTo(map);