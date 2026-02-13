/**
 * @module validator
 */

import { calculateAge } from "./module";

/**
 * Validate the age of a person.
 *
 * Checks:
 * - person exists
 * - person.birth exists
 * - user is at least 18 years old
 *
 * @param {Object} person - Object containing at least a birth Date property
 * @throws {Error} INVALID_USER if object is missing
 * @throws {Error} AGE_UNDER_18 if age is less than 18
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
 * Validate a postal code.
 *
 * Rules:
 * - Must exist
 * - Must be a string
 * - Must contain exactly 5 digits
 *
 * @param {string} code - French postal code
 * @throws {Error} INVALID_POSTAL_CODE if format is incorrect
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
 * Rules:
 * - Must exist
 * - Must be a string
 * - Must follow a simple email pattern
 *
 * @param {string} email - Email address to validate
 * @throws {Error} INVALID_EMAIL if format is incorrect
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
 * Rules:
 * - Must exist
 * - Must be a string
 * - Only letters, accents and hyphen allowed
 *
 * @param {string} value - Name or firstname
 * @throws {Error} INVALID_IDENTITY if value is empty or invalid
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
 * Validate a full user object.
 *
 * Calls all individual validation functions.
 *
 * @param {Object} user - Object representing a user
 * @param {Date} user.birth - Birth date
 * @param {string} user.postalCode - French postal code
 * @param {string} user.email - Email address
 * @param {string} user.firstname - Firstname
 * @param {string} user.lastname - Lastname
 * @returns {boolean} Returns true if all validations pass
 * @throws {Error} Throws an error if any validation fails
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