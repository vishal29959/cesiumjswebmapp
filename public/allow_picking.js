var Pickers_3DTile_Activated = true;
function active3DTilePicker() {
    var highlighted = {
        feature: undefined,
        originalColor: new Cesium.Color()
    };
    // Information about the currently selected feature
    var selected = {
        feature: undefined,
        originalColor: new Cesium.Color()
    };

    // An entity object which will hold info about the currently selected feature for infobox display
    var selectedEntity = new Cesium.Entity();

    // Get default left click handler for when a feature is not picked on left click
    var clickHandler = viewer.screenSpaceEventHandler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    // Color a feature yellow on hover.
    viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
        if (Pickers_3DTile_Activated) {
            // If a feature was previously highlighted, undo the highlight
            if (Cesium.defined(highlighted.feature)) {
                highlighted.feature.color = highlighted.originalColor;
                highlighted.feature = undefined;
            }
            // Pick a new feature
            var picked3DtileFeature = viewer.scene.pick(movement.endPosition);
            if (!Cesium.defined(picked3DtileFeature)) {
                // nameOverlay.style.display = 'none';
                return;
            }
            // A feature was picked, so show it's overlay content
            // nameOverlay.style.display = 'block';
            // nameOverlay.style.bottom = viewer.canvas.clientHeight - movement.endPosition.y + 'px';
            // nameOverlay.style.left = movement.endPosition.x + 'px';
            var name = picked3DtileFeature.getProperty('gml_parent_id');
            if (!Cesium.defined(name)) {
                name = picked3DtileFeature.getProperty('gml_parent_id');
            }
            // nameOverlay.textContent = name;
            // Highlight the feature if it's not already selected.
            if (picked3DtileFeature !== selected.feature) {
                highlighted.feature = picked3DtileFeature;
                Cesium.Color.clone(picked3DtileFeature.color, highlighted.originalColor);
                picked3DtileFeature.color = Cesium.Color.YELLOW;
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // Color a feature on selection and show metadata in the InfoBox.
    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
        if (Pickers_3DTile_Activated) {
            // If a feature was previously selected, undo the highlight
            if (Cesium.defined(selected.feature)) {
                selected.feature.color = selected.originalColor;
                selected.feature = undefined;
            }
            // Pick a new feature
            var picked3DtileFeature = viewer.scene.pick(movement.position);
            if (!Cesium.defined(picked3DtileFeature)) {
                clickHandler(movement);
                return;
            }
            // Select the feature if it's not already selected
            if (selected.feature === picked3DtileFeature) {
                return;
            }
            selected.feature = picked3DtileFeature;
            // Save the selected feature's original color
            if (picked3DtileFeature === highlighted.feature) {
                Cesium.Color.clone(highlighted.originalColor, selected.originalColor);
                highlighted.feature = undefined;
            } else {
                Cesium.Color.clone(picked3DtileFeature.color, selected.originalColor);
            }
            // Highlight newly selected feature
            picked3DtileFeature.color = Cesium.Color.LIME;
            // Set feature infobox description
            var feature_DOITT_ID = picked3DtileFeature.getProperty('gml_name');
            selectedEntity.name = "Building Name: " + feature_DOITT_ID + "";
            selectedEntity.description = 'Loading <div class="cesium-infoBox-loading"></div>';
            viewer.selectedEntity = selectedEntity;
            selectedEntity.description = '<table class="cesium-infoBox-defaultTable"><tbody>' +
                '<tr><th>Block Number</th><td>' + picked3DtileFeature.getProperty('gml_id') + '</td></tr>' +
                '<tr><th>Height of Building</th><td>' + picked3DtileFeature.getProperty('citygml_measured_height') + '</td></tr>' +
                '<tr><th>No. of Storeys</th><td>' + picked3DtileFeature.getProperty('citygml_storeys_above_ground') + '</td></tr>' +
                '<tr><th>Building Class</th><td>' + picked3DtileFeature.getProperty('citygml_class') + '</td></tr>' +
                
                '<tr><th>View BIM Model</th><td  width="200"><a href="https://bimx.graphisoft.com/profile/mymodels/68655" target="_blank" rel="noopener noreferrer">Click Here to view BIM Model</td></a></tr>' +
                '</tbody></table>';
                
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
active3DTilePicker()