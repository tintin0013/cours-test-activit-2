/**
 * @module validator
 */

import { calculateAge } from "./module";

/**
 * Validate the age of a person.
 *
 * Business rules:
 * - The person object must exist
 * - The person must contain a birth property
 * - The user must be at least 18 years old
 *
 * @param {Object} person - Object representing a person
 * @param {Date} person.birth - Birth date of the person
 *
 * @throws {Error} INVALID_USER if person is missing or invalid
 * @throws {Error} AGE_UNDER_18 if age is less than 18
 *
 * @returns {void}
 */
export function validateAge(person) {

    if (!person || typeof person !== "object") {
        throw new Error("INVALID_USER");
    }

    if (!person.birth) {
        throw new Error("INVALID_USER");
    }

    const age = calculateAge(person);

    if (age < 18) {
        throw new Error("AGE_UNDER_18");
    }
}

/**
 * Validate a French postal code.
 *
 * Business rules:
 * - Must exist
 * - Must be a string
 * - Must contain exactly 5 digits
 *
 * @param {string} code - French postal code
 *
 * @throws {Error} INVALID_POSTAL_CODE if:
 * - value is missing
 * - value is not a string
 * - value does not match 5 digit format
 *
 * @returns {void}
 */
export function validatePostalCode(code) {

    if (!code || typeof code !== "string") {
        throw new Error("INVALID_POSTAL_CODE");
    }

    const regex = /^[0-9]{5}$/;

    if (!regex.test(code)) {
        throw new Error("INVALID_POSTAL_CODE");
    }
}

/**
 * Validate an email address.
 *
 * Business rules:
 * - Must exist
 * - Must be a string
 * - Must follow a simple email pattern
 *
 * @param {string} email - Email address to validate
 *
 * @throws {Error} INVALID_EMAIL if:
 * - value is missing
 * - value is not a string
 * - value does not match email format
 *
 * @returns {void}
 */
export function validateEmail(email) {

    if (!email || typeof email !== "string") {
        throw new Error("INVALID_EMAIL");
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
        throw new Error("INVALID_EMAIL");
    }
}

/**
 * Validate identity (firstname or lastname).
 *
 * Business rules:
 * - Must exist
 * - Must be a string
 * - Only letters (including accents) and hyphen allowed
 *
 * @param {string} value - Firstname or lastname
 *
 * @throws {Error} INVALID_IDENTITY if:
 * - value is missing
 * - value is not a string
 * - value contains invalid characters
 *
 * @returns {void}
 */
export function validateIdentity(value) {

    if (!value || typeof value !== "string") {
        throw new Error("INVALID_IDENTITY");
    }

    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;

    if (!regex.test(value)) {
        throw new Error("INVALID_IDENTITY");
    }
}

/**
 * Validate a complete user object.
 *
 * This function delegates validation to:
 * - validateAge
 * - validatePostalCode
 * - validateEmail
 * - validateIdentity (firstname and lastname)
 *
 * @param {Object} user - User object to validate
 * @param {Date} user.birth - Birth date
 * @param {string} user.postalCode - Postal code
 * @param {string} user.email - Email address
 * @param {string} user.firstname - First name
 * @param {string} user.lastname - Last name
 *
 * @throws {Error} INVALID_USER if user object is invalid
 * @throws {Error} Any error thrown by validation sub-functions
 *
 * @returns {boolean} Returns true if all validations pass
 */
export function validateUser(user) {

    if (!user || typeof user !== "object") {
        throw new Error("INVALID_USER");
    }

    validateAge(user);
    validatePostalCode(user.postalCode);
    validateEmail(user.email);
    validateIdentity(user.firstname);
    validateIdentity(user.lastname);

    return true;
}