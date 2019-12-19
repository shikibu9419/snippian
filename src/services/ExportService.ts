import { saveFile } from '@/utils/FileStream';
const tomlStream = require('toml-stream');

export function exportAsToml(data: any) {
  tomlStream.toTOMLString(data, (error: any, output: string) => {
    if (error) {
      throw error;
    }
    saveFile('hoge.toml', output);
  })
}

export function exportToVSCode() {}

export function exportToVim() {}
