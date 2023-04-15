import { App, Modal, Notice, Setting } from "obsidian";

export class ModelWithDefaultControls extends Modal {

    constructor(app: App) {
        super(app);
    }

    onOpen(): void {
        const { contentEl } = this;

        contentEl.createEl("h1", { text: "h1 heading" });

        new Setting(contentEl)
            .setName("Text")
            .setDesc("Description for Text")
            .addText((text) => {
                text
                    .setPlaceholder("text placeholder")
                    .setValue("initial value")
                    .onChange((value) => {
                        new Notice(value);
                    })
            })
        contentEl.createDiv("text without name");
        new Setting(contentEl)
            .addText((text) => {
                text.onChange((value) => {
                    new Notice(value);
                })
            })

        contentEl.createDiv("text without name");
        new Setting(contentEl)
            .addText((text) => {
                text.onChange((value) => {
                    new Notice(value);
                })
            })

        new Setting(contentEl)
            .addDropdown((dropdown) => {
                dropdown
                    .addOption("option1", "option1")
                    .addOption("option2", "option2")
                    .setValue("option2")
                    .onChange((value) => {
                        new Notice(value);
                    })
            })

        new Setting(contentEl)
            .addButton((btn) =>
                btn
                    .setButtonText("Close")
                    .setCta()
                    .onClick(() => {
                        new Notice("Close");
                        this.close();

                    }));

    }

    onClose(): void {

    }
}