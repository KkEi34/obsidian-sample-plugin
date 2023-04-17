import { App, Modal, Notice, Setting } from "obsidian";
import { FolderSuggest } from "suggesters/FolderSuggester";
import { GenericTextSuggester } from "suggesters/GenericTextSuggester";

export class ModelWithDefaultControls extends Modal {

    constructor(app: App) {
        super(app);
    }

    onOpen(): void {
        const { contentEl } = this;

        contentEl.createEl("h1", { text: "h1 heading" });

        // text
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
        // div
        contentEl.createDiv("text without name");
        // text with custom desc
        new Setting(contentEl)
            .setClass("setting-border")
            .setDesc(
                createFragment((el) => {
                    el.appendText("Custom description");
                    el.createDiv({
                        text: "test1",
                        cls: "mod-warning",
                    });
                }),
            )
            .addText((text) => {
                text.onChange((value) => {
                    new Notice(value);
                })
            })

        // text with number
        new Setting(contentEl)
            .setName("Number")
            .setDesc("Number between 0 and 10. Default 5.")
            .addText((text) => {
                text.inputEl.setAttr('type', 'number');
                text.
                    setPlaceholder("Enter number")
                text.inputEl.onblur = (e: FocusEvent) => {
                    let value = parseInt((e.target as HTMLInputElement).value, 10);
                    if (Number.isNaN(value) || value < 0 || value > 10) {
                        value = 5;
                    }
                    (e.target as HTMLInputElement).value = value.toString();
                    new Notice(`Value out of range. Set to default: ${value}`);
                }
            });

        // toggle
        new Setting(contentEl)
            .setName("Toggle")
            .addToggle((toggle) =>
                toggle
                    .setValue(true)
                    .onChange(async (value) => {
                        new Notice(value.toString());
                    }),
            );


        // text without name
        contentEl.createDiv("text without name");
        new Setting(contentEl)
            .addText((text) => {
                text.onChange((value) => {
                    new Notice(value);
                })
            })

        // text area
        new Setting(contentEl)
            .setName("Textarea")
            .setDesc(
                createFragment((descEl) => {
                    descEl.appendText("text1");
                    descEl.appendChild(document.createElement("br"));
                    descEl.appendText("text2");
                }),
            )
            .addTextArea((text) => {
                text
                    .setValue("intial text")
                    .onChange((value) => new Notice(value));
                text.inputEl.rows = 2;
                text.inputEl.cols = 20;
            });

        // dropdown
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

        // dropdown
        const options: Record<number, string> = {
            1: "option1",
            2: "option2",
            3: "option3",
        };
        new Setting(contentEl)
            .addDropdown((dropdown) => {
                dropdown
                    .addOptions(options)
                    .setValue("option2")
                    .onChange((value) => {
                        new Notice(value);
                    })
            })


        // search
        new Setting(contentEl)
            .setName("search")
            .addSearch((search) => {
                search.setPlaceholder('select path')
                    .setValue("")
                    .onChange(async (value) => {
                        new Notice(value);
                    })
            });

        // search with FolderSuggest
        new Setting(contentEl)
            .setName("search with FolderSuggest")
            .addSearch((search) => {
                new FolderSuggest(search.inputEl)
                search.setPlaceholder('select path')
                    .setValue("")
                    .onChange(async (value) => {
                        new Notice(value);
                    })
            });
        // search with GenericTextSuggester
        new Setting(contentEl)
            .setName("search with GenericTextSuggester")
            .addSearch((search) => {
                const items = ["one", "two", "three"];
				new GenericTextSuggester(this.app, search.inputEl, items);
                
                search.setPlaceholder('select path')
                    .setValue("")
                    .onChange(async (value) => {
                        new Notice(value);
                    })
            });

        // button
        new Setting(contentEl)
            .addButton((button) => {
                button
                    .setTooltip("tooltip")
                    .setIcon("popup-open")
                    .setCta()
                    .onClick(() => new Notice("Clicked"));

            });

            // extra button
            new Setting(contentEl)
            .addText((text) => {
                text
                    .setPlaceholder('initial 1')
                    .onChange((value) => {
                        new Notice(value);
                    });
            })
            .addText((text) => {
                text
                    .setPlaceholder('initial 2')
                    .onChange((value) => {
                        new Notice(value);
                    });
            })
            .addExtraButton((button) => {
                button
                    .setIcon('cross')
                    .setTooltip('Delete')
                    .onClick(() => {
                        new Notice("click");
                    });
            });
        // close button
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