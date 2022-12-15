const SVG_ICONS = {
    cluster: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"> <path d="M16-.001c-8.832 0-16 7.17-16 16 0 8.832 7.168 16 16 16s16-7.168 16-16c0-8.83-7.168-16-16-16Zm0 1.885c7.79 0 14.117 6.324 14.117 14.115 0 7.794-6.326 14.118-14.117 14.118-7.79 0-14.117-6.324-14.117-14.118C1.883 8.208 8.21 1.884 16 1.884Z"/> <circle cx="16.446" cy="15.771" r="8.925" transform="translate(-6.111 -5.204) scale(1.34451)"/></svg>',
    marker: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"> <path d="m12.689 26 3.007 6.015L18.704 26h6.046A6.254 6.254 0 0 0 31 19.75V7.25A6.254 6.254 0 0 0 24.75 1H7.25A6.254 6.254 0 0 0 1 7.25v12.5A6.254 6.254 0 0 0 7.25 26h5.439Z"/> <path d="m6.907 20.523-.369-7.133v-3.298h1.536v3.298l-.364 7.133h-.803Zm-.309 3.624v-2.694h1.421v2.694H6.598Z" style="fill:rgb(0,160,255);fill-rule:nonzero;" transform="matrix(1.38374 0 0 .72961 -3.046 .812)"/> <path d="m9.429 19.573 1.456-.268c.088.927.265 1.607.533 2.042.268.435.63.652 1.085.652.482 0 .845-.193 1.089-.58.244-.387.366-.839.366-1.357 0-.332-.051-.615-.154-.848-.102-.233-.282-.436-.538-.609-.175-.115-.575-.319-1.198-.614-.802-.377-1.365-.84-1.689-1.39-.455-.773-.682-1.716-.682-2.828 0-.716.107-1.385.321-2.008.214-.624.522-1.098.925-1.424.403-.326.889-.489 1.458-.489.931 0 1.631.387 2.101 1.16.47.773.717 1.806.74 3.097l-1.496.124c-.064-.722-.201-1.241-.412-1.558-.21-.316-.526-.474-.948-.474-.434 0-.775.169-1.021.508-.158.217-.237.508-.237.872 0 .333.074.617.222.854.189.3.647.613 1.375.939.728.326 1.266.663 1.615 1.012.349.348.622.824.819 1.428.197.604.296 1.35.296 2.239 0 .805-.118 1.559-.354 2.262-.236.703-.57 1.226-1.001 1.568-.431.342-.969.513-1.613.513-.936 0-1.656-.411-2.158-1.232s-.802-2.018-.9-3.591ZM16.754 24.147v-13.94h1.496v11.571h3.721v2.369h-5.217Z" style="fill:white;fill-rule:nonzero;" transform="matrix(1.38374 0 0 .72961 -3.046 .812)"/></svg>'
}

export default function getIconMarkup(name='') {
    return SVG_ICONS[name].toString();
}