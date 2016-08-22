'use strict';

const Rating = use('App/Model/Rating');
const attributes = ['value'];

class RatingController {

  * index(request, response) {
    const ratings = yield Rating.with('drink_id', 'user_id').fetch();

    response.jsonApi('Rating', ratings);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      drink_id: drink_id,
      user_id: user_id,
    };
    const rating = yield Rating.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Rating', rating);
  }

  * show(request, response) {
    const id = request.param('id');
    const rating = yield Rating.with('drink_id', 'user_id').where({ id }).firstOrFail();

    response.jsonApi('Rating', rating);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      drink_id: drink_id,
      user_id: user_id,
    };

    const rating = yield Rating.with('drink_id', 'user_id').where({ id }).firstOrFail();
    yield rating.update(Object.assign({}, input, foreignKeys));

    response.send(rating);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const rating = yield Rating.query().where({ id }).firstOrFail();
    yield rating.delete();

    response.status(204).send();
  }

}

module.exports = RatingController;
