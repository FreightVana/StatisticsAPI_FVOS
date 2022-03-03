const mongoose = require('mongoose');

const { Schema } = mongoose;

const addressSchema = new Schema({
    addressType: {
        type: String, // office, home
        default: null,
    },
    street1: {
        type: String, // office, home
        default: null,
    },
    street2: {
        type: String, // office, home
        default: null,
    },
    city: {
        type: String, // office, home
        default: null,
    },
    state: {
        type: String, // office, home
        default: null,
    },
    zip: {
        type: String, // office, home
        default: null,
    },
});

const phoneSchema = new Schema({
    phoneType: {
        type: String, // mobile, home, work, fax
        default: null
    },
    value: {
        type: String, // actual phone number
        default: null
    },
    ext: {
        type: String,
        default: null
    },
});

const emailSchema = new Schema({
    emailType: {
        type: String, // mobile, home, work, fax
        default: null
    },
    value: {
        type: String, // actual phone number
        default: null
    },
});

const associationsSchema = new Schema({
    refType: {
        type: String, // mcNumber, fvosID, etc
        default: null
    },
    refValue: {
        type: String, // actual value of mc like 12345
        default: null
    },
    name: {
        type: String, // company name
        default: null
    },
})

const contactSchema = new Schema({
    fvosID: {
        type: String,
        default: null,
    },
    author: {
        type: String,
        default: null
    },
    lastModifiedBy: {
        type: String,
        default: null
    },
    preference: {
        email: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
    },
    associations: [
        associationsSchema
    ],
    addresses: [
        addressSchema  
    ],
    phoneNumbers: [
        phoneSchema    
    ],
    emailAddresses: [
        emailSchema
    ],
    person: {
        birthday: {
            type: String,
            default: ''
        },
        department: {
            type: String,
            default: ''
        },
        firstName: {
            type: String,
            default: ''
        },
        middleName: {
            type: String,
            default: ''
        },
        lastName: {
            type: String,
            default: ''
        },
        reportsTo: {
            type: String,
            default: ''
        },
        salutation: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
    },
    socialMedia: {
        facebook: {
            type: String,
            default: ''
        },
        linkedIn: {
            type: String,
            default: ''
        },
        twitter: {
            type: String,
            default: ''
        },
        instagram: {
            type: String,
            default: ''
        },
        tikTok: {
            type: String,
            default: ''
        },
    },
    status: {
        type: Boolean,
        default: true
    },
    tags: {
        type: Array,
        default: []
    }
}, { timestamps: true });

module.exports = contactSchema;
