// Credits go to Liam's Periodic Notes Plugin: https://github.com/liamcain/obsidian-periodic-notes

import { TAbstractFile, TFolder } from 'obsidian'
import { TextInputSuggest } from './suggest'

export class FolderSuggest extends TextInputSuggest<TFolder> {
  getSuggestions (inputStr: string): TFolder[] {
    const abstractFiles = app.vault.getAllLoadedFiles()
    const folders: TFolder[] = []
    const lowerCaseInputStr = inputStr.toLowerCase()

    abstractFiles.forEach((folder: TAbstractFile) => {
      if (
        folder instanceof TFolder &&
        folder.path.toLowerCase().contains(lowerCaseInputStr)
      ) {
        folders.push(folder)
      }
    })

    return folders
  }

  renderSuggestion (file: TFolder, el: HTMLElement): void {
    //el.setText(file.path)
    const div = el.createDiv();
    div.createDiv().setText(file.name);
    if(file.parent && !file.parent.isRoot()){
      div.createDiv({text: file.parent.path, cls: "note-path"});
    }
  }

  selectSuggestion (file: TFolder): void {
    this.inputEl.value = file.path
    this.inputEl.trigger('input')
    this.close()
  }
}
