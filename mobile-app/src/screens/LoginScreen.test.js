import React from "react";
import renderer from "react-test-renderer";
import LoginScreen from "./LoginScreen";

jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

describe("Integration Test: Login Screen", () => {
  it("Halaman Login harus bisa dirender tanpa crash", () => {
    const mockNavigation = { replace: jest.fn(), navigate: jest.fn() };

    const tree = renderer
      .create(<LoginScreen navigation={mockNavigation} />)
      .toJSON();

    expect(tree).toBeDefined();
  });
});
