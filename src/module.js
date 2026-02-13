/**
 * @module module
 */

/**
 * Calculate a person's age in years.
 *
 * This function verifies that the parameter is valid,
 * checks the birth date format, and then calculates
 * the age based on the current date.
 *
 * The function is intentionally written in a clear
 * and step-by-step way (student style) to make
 * validation logic easy to understand and test.
 *
 * @param {Object} p - Object representing a person
 * @param {Date} p.birth - Birth date of the person
 *
 * @returns {number} Age in years
 *
 * @throws {Error} If:
 * - parameter is missing
 * - parameter is not an object
 * - birth field is missing
 * - birth is not a Date
 * - birth date is invalid
 */
export function calculateAge(p) {

    // Check if parameter exists
    if (!p) {
        throw new Error("missing param p");
    }

    // Check if parameter is really an object
    if (typeof p !== "object") {
        throw new Error("param p is not an object");
    }

    // Check if birth field exists
    if (!p.birth) {
        throw new Error("missing birth field");
    }

    // Check if birth is a Date instance
    if (!(p.birth instanceof Date)) {
        throw new Error("birth is not a date");
    }

    // Check if birth date is valid
    if (isNaN(p.birth.getTime())) {
        throw new Error("birth date is invalid");
    }

    const today = new Date();
    const birthDate = p.birth;

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If birthday has not happened yet this year,
    // we decrease the calculated age
    if (monthDiff < 0) {
        age--;
    } else if (monthDiff === 0 && today.getDate() < birthDate.getDate()) {
        age--;
    }

    // Extra safety: age should never be negative
    if (age < 0) {
        return 0;
    }

    return age;
}