'use strict';

const User = use('App/Model/User');
const attributes = ['username', 'email', 'password'];

class UserController {

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const user = yield User.create(input);

    response.jsonApi('User', user);
  }

  * show(request, response) {
    const id = request.param('id');
    const user = yield User.with().where({ id }).firstOrFail();

    response.jsonApi('User', user);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);

    const user = yield User.with().where({ id }).firstOrFail();
    yield user.update(input);

    response.jsonApi('User', user);
  }
}

module.exports = UserController;
