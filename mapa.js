var map = L.map(document.getElementById('mapDIV'),
{ center: [41.8503797,-8.1323978],
    zoom: 10
});

//BASEMAP
var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {});

var baserelief = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {});

var ortofotomapa = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{ attribution:'<a href="https://www.esri.com/en-us/home"</a>©️ESRI_Imaginary' });

var baseMaps = {
    "Mapa Base - OpenStreetMap": osm,
    "Mapa Base - Curvas de Nível": baserelief,
    "Mapa Base - Satélite": ortofotomapa
};
osm.addTo(map);

//POLIGONO DO PNPG                
/*var thePNPG= L.geoJSON(PNPG, {
        color: '#77C66E',
        weight: 1,
        onEachFeature: function(feature, layer){
            layer.on('click', function (){
            document.getElementById('info').innerHTML="<h2>Parque Nacional da Peneda-Gerês (PNPG)</h2>" + "<p> Criado com o Decreto-Lei nº187/71 de 8 de maio, estando assim inserida na Rede Nacional de Áreas Protegidas (RNAP). Detém uma área de 69595 ha e é caracterizada por ter um património cultural e natural diversificado e único reconhecido internacionalmente. Desta forma, esta Área Protegida recebe um grande número de visitantes nacionais e internacionais.</p>" + "<ul>Sendo uma Área Protegida, este Parque divide-se em vários níveis de proteção:<li>Áreas de proteção total e Áreas de proteção parcial do tipo I e II(áreas naturais onde há uma reduzida presença humana e alteração de ecossistemas);</li> <li>Áreas de proteção complementar do tipo I e II(Proteção Complementar: áreas rurais onde estão a maioria das atividades humanas).</li></ul>" + '<img src="./MAPA/Protecao.jpg" width="200" height="271">' + '<p>Área de proteção do PNPG (Fonte: ICNF, 2013)</p><p>Para saber mais informações, consulte o <a href="http://www2.icnf.pt/portal/ap/pnpg">site do ICNF<a/></p>';});
        }
    });
thePNPG.bindTooltip('Parque Nacional da Peneda-Gerês');
thePNPG.addTo(map);
*/
//POP-UP COM COORDENADAS DE ONDE SE CLICA
var popup = L.popup();
function onMapClick(e) {
popup
    .setLatLng(e.latlng)
    .setContent("Clicou no mapa em " + e.latlng.toString().substring(7,e.latlng.toString().length-1))
    .openOn(map);
}
map.on('click', onMapClick);

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
const markers = L.markerClusterGroup();
    var pontos = L.geoJSON(data, {
            pointToLayer: circulo});
    
    function circulo (pontos, latlng){
        var att=pontos.properties;
        return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup('<p><strong><a href=' + '"' + att.FID + '.html' + '"' +'>' +  att.Nome + '</strong></p>')
    };

markers.addLayer(pontos);
map.addLayer(markers);

//ADIÇÃO DA ESCALA
var scale = L.control.scale();
scale.addTo(map);

//FAZER UM HEATMAP
var heatMapPoints = [];
var pontos= L.geoJSON(data, {
    onEachFeature: function (feature){
        heatMapPoints.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
    }
});

//CARACTERÍSTICAS DO HEATMAP
var heat = L.heatLayer(heatMapPoints,{
    minOpacity: 0.4,
    radius: 15,
    gradient: {0.4: 'blue', 0.5: 'lime', 0.6: 'red'}}).addTo(map);

    //Adição da Orientação
var north = L.control({position: "topleft"});
north.onAdd = function(map) {
var div = L.DomUtil.create("div", "info legend");
    div.innerHTML = '<img src="direction.png">';
    return div;
}

north.addTo(map);

//PARA FAZER LEGENDA
var shapes={
        'Cascatas':markers,
        'Heatmap':heat

    };
L.control.layers(baseMaps, shapes).addTo(map);