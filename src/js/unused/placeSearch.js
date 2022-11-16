import { A_API, TIMEOUT_SEC } from '../config';
import AJAX from '../helpers';

// TODO create search place logic

const ArcGISCall =
  'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=pjson&';

export default async function searchPlaceHandler(e) {
  const input = e.target.value;

  if (input.length < 3) console.log('End of Code');

  // const data = await AJAX(`${ArcGISCall}text=${input}&token=${A_API}`);

  // TODO render returned options
  // TODO handle enter click and click on suggestion
}
