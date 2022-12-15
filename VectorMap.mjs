import CONFIG from './CONFIG.mjs';
import getIconMarkup from './icons.mjs';

const baseUrl = 'https://js.api.here.com/v3/3.1/styles/omv/oslo/japan/';

const platform = new H.service.Platform({
  'apikey': CONFIG.apiKey // FIXME: Make sure to add your own API KEY to config.mjs
});

// configure an OMV service to use the `core` endpoint
const omvService = platform.getOMVService({ path: "v2/vectortiles/core/mc" });

// create a Japan specific style
const style = new H.map.Style(`${ baseUrl }normal.day.yaml`, baseUrl);

// instantiate provider and layer for the base map
const omvProvider = new H.service.omv.Provider(omvService, style);
const omvlayer = new H.map.layer.TileLayer(omvProvider, { max: 22 ,dark:true});

const MARKERS = [
  { lat: 35.68026, lng: 139.76744, icon: 'ape' },
  { lat: 35.684466070740925, lng: 139.77986431576062 },
  { lat: 35.687756938198696, lng: 139.7545713451925 },
  { lat: 35.66062757054877, lng: 139.76248289061422 },
];

class VectorMap extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        const shadow = this.attachShadow({mode: 'open'});
        this.domEl = shadow;
    }

    connectedCallback() {
        this.domEl.innerHTML = `
        <style>´
          :host,
          #map {
            position: relative;
            width: 100%;
            height: 100%;
          }
        </style>
        <div id="map"></div>
      `;

      this.initMapJapan();
      this.addMarkers();
    }

    initMapJapan() {
      const mapEl = this.domEl.getElementById("map");
      const map = new H.Map(mapEl, omvlayer, {
        zoom: 10,
        center: { lat: 35.68026, lng: 139.76744 },
      });
      this.mapEl = mapEl;
      this.map = map;

      // add a resize listener to make sure that the map occupies the whole container
      window.addEventListener("resize", () => map.getViewPort().resize());
    }

    getDomIcon() {
      // not the real icon but doesnt matter
      const iconEl = document.createElement('div'),
            iconElSVG = document.createElement('div');

      iconElSVG.innerHTML = getIconMarkup('cluster');
      iconElSVG.style.width = iconElSVG.style.height = '40px';
      iconEl.style.userSelect = 'none';
      iconEl.style.cursor = 'default';

      iconEl.appendChild(iconElSVG);

      const domIcon = new H.map.DomIcon(iconEl);

      return domIcon;
    }

    getDomMarker(cluster, cfg = {}) {
      const domMarker = new H.map.DomMarker(cluster.getPosition(), cfg);
      return domMarker;
    }

    getStandarMarker() {
      // STANDARD MARKER
      const clusterMarker = new H.map.Marker(cluster.getPosition(), {
        icon: new H.map.Icon(getIconMarkup('cluster'), {
          size: {w: 50, h: 50},
          anchor: {x: 25, y: 25}
        }),

        // Set min/max zoom with values from the cluster,
        // otherwise clusters will be shown at all zoom levels:
        min: cluster.getMinZoom(),
        max: cluster.getMaxZoom()
      });
    }

    getCustomTheme(mapElement) {
      const CUSTOM_THEME = {
        getClusterPresentation: (cluster) => {
          // TODO: WORKS!
          //const clusterMarker = this.getStandardMarker();

          // FIXME: DOES NOT WORK!
          const domIcon = this.getDomIcon();
          // const clusterMarker = this.getDomMarker(cluster); // uses default here marker
          const clusterMarker = this.getDomMarker(cluster, {icon:domIcon}); // uses custom marker
          return clusterMarker;
        },
        getNoisePresentation: (noisePoint) => {
          // Get a reference to data object our noise points
          const data = noisePoint.getData(),
          iconSize = 30,
            // Create a marker for the noisePoint
          noiseMarker = new H.map.Marker(noisePoint.getPosition(), {
              // Use min zoom from a noise point
              // to show it correctly at certain zoom levels:
              min: noisePoint.getMinZoom(),
              icon: new H.map.Icon(getIconMarkup('marker'), {
                size: {w: iconSize, h: iconSize},
                anchor: {x: 10, y: 10}
              })
            });

          // Link a data from the point to the marker
          // to make it accessible inside onMarkerClick
          noiseMarker.setData(data);

          return noiseMarker;
        }
      }

      return CUSTOM_THEME;
    }

    addMarkers() {
      const clusters = MARKERS.map(function (item) {
        return new H.clustering.DataPoint(item.lat, item.lng, 1, { icon: item.icon });
      });

      var clusteredDataProvider = new H.clustering.Provider(clusters, {
        clusteringOptions: {
          // Maximum radius of the neighbourhood
          eps: 100,
          // minimum weight of points required to form a cluster
          minWeight: 3
        },
        theme: this.getCustomTheme(this.mapEl),
      });

      // Create a layer tha will consume objects from our clustering provider
      var clusteringLayer = new H.map.layer.ObjectLayer(clusteredDataProvider);

      // To make objects from clustering provder visible,
      // we need to add our layer to the map
      this.map.addLayer(clusteringLayer);

      this.clusteredDataProvider = clusteredDataProvider;

      this.addMapEvents();
    }

    addMapEvents() {
      // Add an event listener to the Provider - this listener is called when a maker
      // has been tapped:
      this.clusteredDataProvider.addEventListener('tap', this.onMarkerClick.bind(this));

      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    }

    onMarkerClick(e) {
      // Get position of the "clicked" marker
      var position = e.target.getGeometry();
      // Move map's center to a clicked marker
      this.map.setCenter(position, true);
    }



}

export default VectorMap;