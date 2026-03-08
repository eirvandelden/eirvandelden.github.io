/**
 * Applies library section visibility and filter button state.
 * @param {{ selected: string, buttons: Array, sections: Array }} options
 * @returns {void}
 */
export function filterLibrarySections({ selected, buttons, sections }) {
  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === selected);
  });

  sections.forEach((section) => {
    const show = selected === "all" || section.dataset.edition === selected;
    section.classList.toggle("hidden", !show);
  });
}
