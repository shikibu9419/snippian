const spaceCount = 4;

export function getIndentedTextElem(textElement: HTMLTextAreaElement, shiftPressed = false) {
  const currentText = textElement.value;
  let start = textElement.selectionStart;
  let end = textElement.selectionEnd;

  let head = currentText.slice(0, start);
  let middle = currentText.slice(start, end);
  const tail = currentText.slice(end);

  const indent = Array(spaceCount + 1).join(' ');
  const nearestLFIndex = head.lastIndexOf('\n');

  if (shiftPressed) {
    const matchHead = new RegExp('^' + indent, 'g');
    const matchLF = new RegExp('\n' + indent, 'g');
    const deletedCount = (middle.match(matchLF) || []).length;

    head = nearestLFIndex >= 0
      ? head.slice(0, nearestLFIndex) + head.slice(nearestLFIndex).replace(matchLF, '\n')
      : head.replace(matchHead, '');

    middle = middle.replace(matchLF, '\n');
    if (nearestLFIndex === -1) {
      middle = middle.replace(matchHead, '');
    }

    start -= spaceCount;
    end -= deletedCount * spaceCount;
  } else {
    const insertIndex = nearestLFIndex + 1;
    const insetedCount = (middle.match(/\n/g) || []).length + 1;

    head = head.slice(0, insertIndex) + indent + head.slice(insertIndex);
    middle = middle.replace(/\n/g, '\n' + indent);

    start += spaceCount;
    end += insetedCount * spaceCount;
  }

  return {
    text: head + middle + tail,
    selectionRange: [start, end]
  };
}
