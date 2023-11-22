const { Venue } = require('../models')

const createVenue = async (req, res) => {
    const venueData = req.body;

    try {
        const venue = await Venue.create({
            name: venueData.name,
            address: venueData.address,
            phone: venueData.phone,
        });

        res.status(201).json({
            message: 'Venue berhasil disimpan',
            venue,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const getVenues = async (req, res) => {
    try {
        const venues = await Venue.findAll();

        res.status(200).json({
            venues,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

const getVenue = async (req, res) => {
    const id = req.params.id;

    try {
        const venue = await Venue.findByPk(id);

        if (!venue) {
            res.status(404).json({
                message: 'Venue tidak ditemukan',
            });
        } else {
            res.status(200).json({
                venue,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

const updateVenue = async (req, res) => {
    const id = req.params.id;
    const venueData = req.body;

    try {
        const venue = await Venue.findByPk(id);

        if (!venue) {
            res.status(404).json({
                message: 'Venue tidak ditemukan',
            });
        } else {
            // Update the venue instance with the new data
            await venue.update(venueData);

            res.status(200).json({
                message: 'Venue berhasil diperbarui',
                venue,
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const deleteVenue = async (req, res) => {
    const id = req.params.id;

    try {
        // Delete the venue by its primary key
        const deletedVenue = await Venue.destroy({
            where: {
                id: id,
            },
        });

        if (!deletedVenue) {
            res.status(404).json({
                message: 'Venue tidak ditemukan',
            });
        } else {
            res.status(200).json({
                message: 'Venue berhasil dihapus',
                deletedVenue,
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

module.exports = {
    createVenue,
    getVenues,
    getVenue,
    updateVenue,
    deleteVenue,
};
