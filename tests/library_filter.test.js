import test from 'node:test';
import assert from 'node:assert/strict';
import { filterLibrarySections } from '../js/library_filter.js';

class FakeClassList {
  constructor(initial = []) {
    this.classes = new Set(initial);
  }

  toggle(name, force) {
    if (force) {
      this.classes.add(name);
      return true;
    }

    this.classes.delete(name);
    return false;
  }

  contains(name) {
    return this.classes.has(name);
  }
}

const makeButton = (filter, active = false) => ({
  dataset: { filter },
  classList: new FakeClassList(active ? ['active'] : [])
});

const makeSection = (edition) => ({
  dataset: { edition },
  classList: new FakeClassList()
});

test('all filter shows all sections and marks only all button active', () => {
  const buttons = [makeButton('all'), makeButton('4e', true), makeButton('wanted')];
  const sections = [makeSection('4e'), makeSection('wanted')];

  filterLibrarySections({ selected: 'all', buttons, sections });

  assert.equal(buttons[0].classList.contains('active'), true);
  assert.equal(buttons[1].classList.contains('active'), false);
  assert.equal(buttons[2].classList.contains('active'), false);
  assert.equal(sections[0].classList.contains('hidden'), false);
  assert.equal(sections[1].classList.contains('hidden'), false);
});

test('edition filter only shows matching edition section', () => {
  const buttons = [makeButton('all', true), makeButton('4e'), makeButton('wanted')];
  const sections = [makeSection('5e'), makeSection('4e'), makeSection('wanted')];

  filterLibrarySections({ selected: '4e', buttons, sections });

  assert.equal(buttons[0].classList.contains('active'), false);
  assert.equal(buttons[1].classList.contains('active'), true);
  assert.equal(buttons[2].classList.contains('active'), false);
  assert.equal(sections[0].classList.contains('hidden'), true);
  assert.equal(sections[1].classList.contains('hidden'), false);
  assert.equal(sections[2].classList.contains('hidden'), true);
});

test('wanted filter only shows wanted section', () => {
  const buttons = [makeButton('all', true), makeButton('5e'), makeButton('wanted')];
  const sections = [makeSection('5e'), makeSection('4e'), makeSection('wanted')];

  filterLibrarySections({ selected: 'wanted', buttons, sections });

  assert.equal(buttons[0].classList.contains('active'), false);
  assert.equal(buttons[1].classList.contains('active'), false);
  assert.equal(buttons[2].classList.contains('active'), true);
  assert.equal(sections[0].classList.contains('hidden'), true);
  assert.equal(sections[1].classList.contains('hidden'), true);
  assert.equal(sections[2].classList.contains('hidden'), false);
});
