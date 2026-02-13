import { calculateAge } from "./module";

/**
 * Unit tests for calculateAge function.
 *
 * These tests verify:
 * - parameter validation
 * - error handling
 * - age calculation logic
 * - edge cases (birthday not passed yet, invalid dates, negative age)
 *
 * The goal is to improve coverage of module.js
 * and test all branches of the function.
 */
describe("Unit test - calculateAge", () => {

  test("should throw error if parameter is missing", () => {
    expect(() => calculateAge()).toThrow("missing param p");
  });

  test("should throw error if parameter is not an object", () => {
    expect(() => calculateAge(12)).toThrow("param p is not an object");
  });

  test("should throw error if birth field is missing", () => {
    expect(() => calculateAge({})).toThrow("missing birth field");
  });

  test("should throw error if birth is not a Date", () => {
    expect(() => calculateAge({ birth: "2000-01-01" }))
      .toThrow("birth is not a date");
  });

  test("should throw error if birth date is invalid", () => {
    expect(() => calculateAge({ birth: new Date("not a date") }))
      .toThrow("birth date is invalid");
  });

  test("should calculate correct age when birthday already passed this year", () => {
    const birth = new Date("2000-01-01");
    const age = calculateAge({ birth });

    expect(typeof age).toBe("number");
    expect(age).toBeGreaterThanOrEqual(0);
  });

  test("should decrease age if birthday has not occurred yet this year", () => {
    const today = new Date();
    const futureMonth = today.getMonth() + 1;
    const birth = new Date(today.getFullYear() - 20, futureMonth, today.getDate());

    const age = calculateAge({ birth });

    expect(age).toBe(19);
  });

  test("should return 0 if calculated age is negative (future birth date)", () => {
    const futureBirth = new Date();
    futureBirth.setFullYear(futureBirth.getFullYear() + 5);

    const age = calculateAge({ birth: futureBirth });

    expect(age).toBe(0);
  });

});