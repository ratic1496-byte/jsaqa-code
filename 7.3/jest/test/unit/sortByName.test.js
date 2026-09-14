const sortByName = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    const input = [
      "Гарри Поттер",
      "Властелин колец",
      "Война и мир",
    ];

    const expected = [
      "Властелин колец",
      "Война и мир",
      "Гарри Поттер",
    ];

    const output = sortByName(input);

    expect(output).toEqual(expected);
  });

  it("Books names should not change order if names are identical", () => {
    const input = [
      "Властелин колец",
      "Властелин колец",
    ];

    const expected = [
      "Властелин колец",
      "Властелин колец",
    ];

    const output = sortByName(input);

    expect(output).toEqual(expected);
  });
});


