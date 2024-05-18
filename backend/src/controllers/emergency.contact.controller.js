const { ContactoEmergencia } = require('../model/models.js');

const getContacts = async (req, res) => {
    try {
        const contacts = await ContactoEmergencia.findAll();
        const contactsFound = contacts.length;
        if(!contacts || contacts.length === 0) {
            res.status(404).send(
                JSON.stringify({ error: 'Contactos no encontrados' },
                null, 2
            ));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ found: contactsFound, contacts },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al encontrar contactos: ${error}`);
    }
}

const getContactById = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const contact = await ContactoEmergencia.findByPk(req.params.num_doc);
        if(!contact || contact.length === 0) {
            res.status(404).json({ error: 'Contacto no encontrado' });
        } else {
            res.status(200).send(
                JSON.stringify({ found: contact },
                null, 2
            ));
        }
    } catch (error) {
        console.log(`Error al encontrar contacto ${req.params.num_doc}: ${error}`);	
    }
}

const createContact = async (req, res) => {
    try {
        const contact = await ContactoEmergencia.create(req.body);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(
            JSON.stringify({ created: { contact } },
            null, 2
        ));
    } catch (error) {
        console.log(`Error al crear contacto: ${error}`);
    }
}

const updateContact = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const contact = await ContactoEmergencia.update(req.body, {
            where: { num_doc: req.params.num_doc }
        });
        if(!contact) {
            res.status(404).json({ error: 'Contacto no actualizado' });
        } else {
            res.status(200).send(
                JSON.stringify({ updated: { contact } },
                null, 2
            ));
        }
    } catch (error) {
        console.log(`Error al actualizar el registro ${req.params.num_doc}: ${error}`);
    }
}

const deleteContact = async (req, res) => {
    try {
        const contact = await ContactoEmergencia.destroy({
            where: { num_doc: req.params.num_doc }
        });

        if(!contact || contact.length === 0) {
            res.status(404).json({ error: 'Contacto no eliminado' });
        } else {
            res.status(200).send(
                JSON.stringify({ is_deleted: contact, body },
                null, 2
            ));
        }
    } catch (error) {
        console.log(`Error al borrar el registro ${req.params.num_doc}: ${error}`);
    }
}

module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};
