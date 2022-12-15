class MapContainer extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        this.domEl = shadow;
    }
    connectedCallback() {
        this.domEl.innerHTML = `
            <style>
            :host {
                border: 1px solid black;
                width: 50%;
                height: 60%;
            }
            #container {
                position: relative;
                width: 100%;
                height: 100%;
            }
            </style>
            <div id="container">
                <vector-map></vector-map>
            </div>
        `;
    }
}

export default MapContainer;