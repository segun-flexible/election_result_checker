const db = require("../models/db");

//GET ALL PU RESULT BASED ON THE PU UNIQUE ID
exports.getPuResultsById = (pollingUnitUniqueId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM announced_pu_results JOIN polling_unit B ON polling_unit_uniqueid = B.uniqueid WHERE polling_unit_uniqueid = ? ORDER BY party_score DESC", pollingUnitUniqueId, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        }
        );
    });
};



//GET ALL LGAs
exports.getAllLgas = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT uniqueid, lga_name FROM lga", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        }
        );
    });
};

//GET ALL PU RESULT BASED ON THE LGA UNIQUE ID
exports.getPuResultsByLgaUniqueId = (lgaUniqueId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT SUM(party_score) AS total, polling_unit_name FROM announced_pu_results JOIN polling_unit B ON polling_unit_uniqueid = B.uniqueid JOIN lga C ON B.lga_id = C.lga_id WHERE C.uniqueid = ? GROUP BY B.uniqueid", lgaUniqueId, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        }
        );
    });
};

//GET ALL PARTIES
exports.getParties = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM party", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        }
        );
    });
};

//INSERT NEW RESULTS
exports.insertNewPartyResult = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO announced_pu_results SET ?", [obj], (err, data) => {
            if (err) reject(err);
            else resolve(data);
        }
        );
    });
};

//GET PU BY ID
exports.getPollingUnitById = (uniqueId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM polling_unit WHERE uniqueid = ?", uniqueId, (err, data) => {
            if (err) reject(err);
            else resolve(data[0]);
        }
        );
    });
};



