'use strict';

const Drink = use('App/Model/Drink');
const attributes = ['name', 'recipe', 'photo-url'];

class DrinkController {

  * index(request, response) {
    const drinks = yield Drink.with('creator').fetch();

    response.jsonApi('Drink', drinks);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: creator,
    };
    const drink = yield Drink.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Drink', drink);
  }

  * show(request, response) {
    const id = request.param('id');
    const drink = yield Drink.with('creator').where({ id }).firstOrFail();

    response.jsonApi('Drink', drink);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: creator,
    };

    const drink = yield Drink.with('creator').where({ id }).firstOrFail();
    yield drink.update(Object.assign({}, input, foreignKeys));

    response.send(drink);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const drink = yield Drink.query().where({ id }).firstOrFail();
    yield drink.delete();

    response.status(204).send();
  }

}

module.exports = DrinkController;