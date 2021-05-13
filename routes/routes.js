import { addNewContact, getContact, getContactWithID, updateContact, deleteContact } from '../controllers/controller';
import { addNewEvent, getEvent } from '../controllers/eventController';

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
}

export default routes;