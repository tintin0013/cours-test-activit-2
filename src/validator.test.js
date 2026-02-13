import {
    validateAge,
    validatePostalCode,
    validateEmail,
    validateIdentity,
    validateUser
} from "./validator";

/**
 * @file validator.test.js
 *
 * Unit tests for validator.js.
 *
 * These tests verify:
 * - Age validation rules
 * - Postal code format
 * - Email format
 * - Identity validation
 * - Full user validation logic
 *
 * The goal is to test business rules independently
 * from the React integration layer.
 */

describe("validator", () => {

    /**
     * AGE VALIDATION
     */

    it("should throw an error if age is under 18", () => {
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - 10;

        const person = {
            birth: new Date(`${birthYear}-01-01`)
        };

        expect(() => {
            validateAge(person);
        }).toThrow();
    });

    it("should not throw an error if age is 18 or more", () => {
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - 20;

        const person = {
            birth: new Date(`${birthYear}-01-01`)
        };

        expect(() => {
            validateAge(person);
        }).not.toThrow();
    });

    it("should handle leap year birth date (29 february)", () => {
        const person = {
            birth: new Date("2004-02-29")
        };

        expect(() => {
            validateAge(person);
        }).not.toThrow();
    });

    /**
     * POSTAL CODE VALIDATION
     */

    it("should throw an error if postal code is invalid", () => {
        expect(() => {
            validatePostalCode("75A01");
        }).toThrow();
    });

    it("should not throw an error if postal code is valid", () => {
        expect(() => {
            validatePostalCode("75001");
        }).not.toThrow();
    });

    it("should throw an error if postal code length is not 5", () => {
        expect(() => {
            validatePostalCode("123");
        }).toThrow();
    });

    /**
     * EMAIL VALIDATION
     */

    it("should throw an error if email is invalid", () => {
        expect(() => {
            validateEmail("testmail.com");
        }).toThrow();
    });

    it("should not throw an error if email is valid", () => {
        expect(() => {
            validateEmail("test@mail.com");
        }).not.toThrow();
    });

    it("should throw an error if email is null", () => {
        expect(() => {
            validateEmail(null);
        }).toThrow();
    });

    /**
     * IDENTITY VALIDATION
     */

    it("should throw an error if identity contains html tags", () => {
        expect(() => {
            validateIdentity("<b>Jean</b>");
        }).toThrow();
    });

    it("should throw an error if identity contains script tag", () => {
        expect(() => {
            validateIdentity("<script>alert(1)</script>");
        }).toThrow();
    });

    it("should throw an error if identity is null", () => {
        expect(() => {
            validateIdentity(null);
        }).toThrow();
    });

    /**
     * FULL USER VALIDATION
     */

    it("should return true if the whole user is valid", () => {
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - 20;

        const user = {
            birth: new Date(`${birthYear}-01-01`),
            postalCode: "75001",
            email: "test@mail.com",
            firstname: "Jean",
            lastname: "Dupont"
        };

        expect(validateUser(user)).toBe(true);
    });

    it("should throw an error if one field is invalid", () => {
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - 10;

        const user = {
            birth: new Date(`${birthYear}-01-01`), // under 18
            postalCode: "75001",
            email: "test@mail.com",
            firstname: "Jean",
            lastname: "Dupont"
        };

        expect(() => {
            validateUser(user);
        }).toThrow();
    });

});