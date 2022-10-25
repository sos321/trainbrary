import { A_API, TIMEOUT_SEC } from './config';
import AJAX from './helpers';

const ArcGISCall =
  'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=pjson&';

export default async function searchPlaceHandler(e) {
  const input = e.target.value;

  if (input.length < 3) return;
  if (input[input.length - 1] === ' ') return;

  const data = await AJAX(`${ArcGISCall}text=${input}&token=${A_API}`);

  // TODO render returned options
  // TODO handle enter click and click on suggestion
}
