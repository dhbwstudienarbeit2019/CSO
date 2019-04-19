import "jasmine";
import { Cat } from "../src/cat";
import { Position } from "../src/Point";


describe('🐱 Cat', () => {
  var subject: Cat;

  beforeEach(function () {
    subject = new Cat(<Position>{ x: 0, y: 0 }, <Position>{ x: 1, y: 1 }, (x, y) => x + y);
  });

  describe('Position', () => {
    it('keeps its own position', () => {
      expect(subject.Position.x).toBe(0);
      expect(subject.Position.y).toBe(0);
    });
    it('moves as expected', () => {
      subject.Position = new Position(1, 1);
      expect(subject.Position.x).toBe(1);
      expect(subject.Position.y).toBe(1);
    });
  });
});