Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNTIzOWE2ZC1hZWUxLTRhMGMtYmRkMy05ODYyZTgyYmI4YTIiLCJpZCI6NjQwMDgsImlhdCI6MTYyODczNzM0Nn0.4K-qqIcLhI5kbLviWwiKFPGdSn9wCuXapwBtxvbiDTk";

var viewer = new Cesium.Viewer("cesiumContainer");

var imageryLayer = viewer.imageryLayers.addImageryProvider(
  new Cesium.IonImageryProvider({ assetId: 2 })
);

viewer.zoomTo(imageryLayer).otherwise(function (error) {
  console.log(error);
});
var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    // url: "../3dtile_nyc/tileset.json",
    // url: "http://193.196.37.89:8092/AssetsHFT/3DTile_Niedernhalle/tileset.json",
    url: "../3dtile_nyc/tileset.json",
}))
Cesium.when(tileset.readyPromise).then(function (tileset) {viewer.flyTo(tileset)})
// chroma.scale(['#fafa6e','#2A4858']).mode('lch').colors(6)
function colorByHeight () {
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ['${Height} >= 300', 'color("#FF442E")'],
                ['${Height} >= 200', 'color("#FF8000")'],
                ['${Height} >= 100', 'color("#E7A700")'],
                ['${Height} >= 50', 'color("#CFC600")'],
                ['${Height} >= 25', 'color("#A4B600")'],
                ['${Height} >= 10', 'color("#6A9E00")'],
                ['true', 'rgb(127, 59, 8)']
            ]
        }
    });
}

