import { validatePostalCode, validateAMKA } from "../validationUtils";

describe("validatePostalCode", () => {
  it("returns true on existing postal codes", () => {
    expect(validatePostalCode("17562")).toBe(true);
    expect(validatePostalCode("30005")).toBe(true);
    expect(validatePostalCode("17122")).toBe(true);
    expect(validatePostalCode("25008")).toBe(true);
    expect(validatePostalCode("68014")).toBe(true);
    expect(validatePostalCode("27066")).toBe(true);
    expect(validatePostalCode("54250")).toBe(true);
  });

  it("returns false on not existing postal codes", () => {
    expect(validatePostalCode("12345")).toBe(false);
    expect(validatePostalCode("11111")).toBe(false);
    expect(validatePostalCode("22222")).toBe(false);
    expect(validatePostalCode("99999")).toBe(false);
    expect(validatePostalCode("98765")).toBe(false);
    expect(validatePostalCode("56789")).toBe(false);
  });
});

describe("validateAMKA", () => {
  it("returns true on valid AMKA", () => {
    expect(validateAMKA("01012488886")).toBe(true);
    expect(validateAMKA("12121212125")).toBe(true);
    // Allow integer AMKA
    expect(validateAMKA(12121212125)).toBe(true);
  });

  it("returns false on invalid AMKA", () => {
    expect(validateAMKA("a0000000000")).toBe(false);
    expect(validateAMKA("00000000000")).toBe(false);
    // Incorrect length
    expect(validateAMKA("1234567890")).toBe(false);
    expect(validateAMKA("123456789012")).toBe(false);
    // Incorrect checksum
    expect(validateAMKA("12345678901")).toBe(false);
    expect(validateAMKA("42042042069")).toBe(false);
    // Correct checksum, but incorrect date
    // Obvious date errors
    expect(validateAMKA("24242424241")).toBe(false);
    expect(validateAMKA("53121212129")).toBe(false);
    // 31st on months that only have 30 days
    expect(validateAMKA("31062455551")).toBe(false);
    expect(validateAMKA("31092455554")).toBe(false);
    expect(validateAMKA("31112455551")).toBe(false);
    // 29th of February on non-leap years
    expect(validateAMKA("29022355553")).toBe(false);
    // 30th of February on non-leap years
    expect(validateAMKA("30022455551")).toBe(false);
  });
});
