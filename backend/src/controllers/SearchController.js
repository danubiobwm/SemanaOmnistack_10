import Dev from '../models/Dev';
import parseStringAsArray from '../util/parseStringAsArray';

class SearchController {
  // buscar todos os devs num raio de 10kd
  // Filtrar por tecnologias
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return response.json({ devs });
  }
}

export default new SearchController();
