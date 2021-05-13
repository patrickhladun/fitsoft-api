import { addNewEvent, getEvent } from '../controllers/eventController';
import { addUser } from '../controllers/userController';

const routes = (app) => {
    app.route('/event')
        .get(getEvent)
        .post(addNewEvent)

    app.route('/user')
        .post(addUser)

    // app.route('/user/:userID')
    //     .get(getUserWithID)
    //     .put(updateUser)
    //     .delete(deleteUser)
}

export default routes;