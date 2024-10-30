# Combinatorics Visualizer

[--LIVE Demo--](https://rennacarver.github.io/Combinatorics-Visualizer/)

![Linear Permutations_medium](https://github.com/user-attachments/assets/eee1e92c-8824-4836-8ad0-2653aee079cd)

## Features

- enter a string of text (any language or emoji up to 15 chars) to display a colorful list of all permutations
- switch between Combinations and Permutations mode to see how the formula and permutation list changes
- change the 'r' value to see any possible nCr or nPr
- toggle subscript markers for duplicate graphemes
- detect user preference for dark mode and allow user to set their preference independently
- adjust font-size using the slider
- allow user to display up to 50,000 permutations
- Try: '你們好', 'test', '+-=+', '♡♠♦♣', '🪻🌾🌷🌻'

## Lessons Learned

- Enabling dark mode on the body element which is above the root element requires additional code
- Switching between design tasks and thinking tasks is a great way to maintain momentum
- SVG elements have more flexibility when imported as React components

## Future Enhancements

- Allow users to query the permutations list (e.g. show all permutations containing a grapheme)
- Allow sorting of results (numerically & alphabetically)

## Fixes

- CSS needs refactoring (use intrinsic design patterns)
- React needs refactoring (break App.jsx into smaller components)
