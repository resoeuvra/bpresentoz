export function toggleTools(toolsShown, showTools, hideTools) {
  console.log(toolsShown);
  if (toolsShown) {
    console.log('hide');
    hideTools();
  } else {
    showTools();
    console.log('show');
  }
}