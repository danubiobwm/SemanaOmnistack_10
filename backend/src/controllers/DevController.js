import api from '../services/api';
import Dev from '../models/Dev';
import parseStringAsArray from '../util/parseStringAsArray';
import { findConnections, sendMessage } from '../webSocket';

class DevController {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  }

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await api.get(`users/${github_username}`);

      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
      /* Filtrar as conexões que estao no max 10km de distancia,
      e que o novo dev tenha pelo menos uma tecn filtradas */

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );
      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }
    return response.json(dev);
  }
}
export default new DevController();
