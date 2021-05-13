import { addNewContact, getContact, getContactWithID, updateContact, deleteContact } from '../controllers/controller';
import { addNewEvent, getEvent } from '../controllers/eventController';
import { addUser } from '../controllers/userController';

const routes = (app) => {
    app.route('/contact')
        .get(getContact)
        .post(addNewContact)

    app.route('/contact/:contactID')
        .get(getContactWithID)
        .put(updateContact)
        .delete(deleteContact)

    app.route('/event')
        .get(getEvent)
        .post(addNewEvent)

    app.route('/user')
        .post(addUser)
}

export default routes;