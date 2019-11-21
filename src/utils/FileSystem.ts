const remote = window.require('electron').remote;
const fs = remote.require('fs');

export function openDialog() {}

export function saveFile(path: string, content: string) {
  console.log(fs)

  if (!(path && content)) {
    alert('Content is empty!');
  }

  fs.writeFile(path, content, (error: any) => {
    if (error) {
      alert(error);
      return;
    }
  })
}
