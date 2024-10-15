# Combinatorics Visualizer

[--LIVE Demo--](https://rennacarver.github.io/Combinatorics-Visualizer/)

![Linear Permutations_medium](https://github.com/user-attachments/assets/eee1e92c-8824-4836-8ad0-2653aee079cd)

## Features

- enter a string of text (any language or emoji up to 6 chars) to display a colorful list of all permutations
- switch between Combinations and Permutations mode to see how the formula and permutation list changes
- change the 'r' value to see any possible nCr or nPr
- toggle subscript markers for duplicate graphemes
- detect user preference for dark mode and allow user to set their preference independently
- Try: '你們好', 'test', '+-=+', '♡♠♦♣', '🪻🌾🌷🌻'
- click the sun/moon icon to switch on dark mode

## Lessons Learned

- Enabling dark mode on the body element which is above the root element requires additional code
- Font size cannot easily detect the size of its parent container
- Switching between design tasks and thinking tasks is a great way to maintain momentum
- SVG elements have more flexibility when imported as React components

## Fixes Needed

- Allow faded permutations to be hidden in combinations mode
- Color assignments should persist between input changes
- Color assign bug needs fix
- Font size needs to adjust to parent container size
- Color selector needs to be rewritten
- Color selector doesn't maintain separation of concerns
- Not responsive for mobile
- Non-english fonts causes text to wrap breaking formatting

## Limitations/Future Enhancements

- Allow users to set a dark mode preference or default to system
- Add Animations for appearance of new elements
- Enable user to group/highlight combination subsets
- Enable user to select custom colors
