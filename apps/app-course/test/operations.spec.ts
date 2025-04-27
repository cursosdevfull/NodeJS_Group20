import { divide, Exceptions, multiply, subtract, sum } from "./operations";

describe("testing operation functions", () => {
    describe("testing sum function", () => {
        it("should return 5 when adding 2 and 3", () => {
            // Arrange
            const a = 2;
            const b = 3;

            // Act
            const result = sum(a, b);

            // Assert
            expect(result).toBe(5);
        });

        it("should return -1 when adding -2 and 1", () => {
            expect(sum(-2, 1)).toBe(-1);
        });

        it("should return 0 when adding 0 and 0", () => {
            expect(sum(0, 0)).toBe(0);
        });
    })

    describe("testing subtract function", () => {
        it("should return 1 when subtracting 3 from 4", () => {
            expect(subtract(4, 3)).toBe(1);
        });

        it("should return -3 when subtracting 2 from -1", () => {
            expect(subtract(-1, 2)).toBe(-3);
        });

        it("should return 0 when subtracting 0 from 0", () => {
            expect(subtract(0, 0)).toBe(0);
        });
    })

    describe("testing multiply function", () => {
        it("should return 6 when multiplying 2 and 3", () => {
            expect(multiply(2, 3)).toBe(6);
        });

        it("should return -6 when multiplying -2 and 3", () => {
            expect(multiply(-2, 3)).toBe(-6);
        });

        it("should return 0 when multiplying 0 and 5", () => {
            expect(multiply(0, 5)).toBe(0);
        });
    })

    describe("testing divide function", () => {
        it("should return 3 when dividing 6 by 2", () => {
            expect(divide(6, 2)).toBe(3);
        })

        it("should return -3 when dividing -6 by 2", () => {
            expect(divide(-6, 2)).toBe(-3);
        });

        it("should throw an error when dividing by 0", () => {
            expect(() => divide(6, 0)).toThrow(Exceptions.DivisionByZero);
        });
    })

})