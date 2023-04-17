import { App, ButtonComponent, DropdownComponent, Modal, SearchComponent, Setting } from 'obsidian';
import { GenericTextSuggester } from 'suggesters/GenericTextSuggester';


const LocDescMap: Record<string, string> = {
	"[NoteLoc.Index]": "Inside Folder, Index File",
	"[NoteLoc.Inside]": "Inside Folder, With Same Name",
	"[NoteLoc.Outside]": "Outside Folder, With Same Name",
};

export class ModalWithSuggestComponent extends Modal {
	result: string;
	buttonContainerEl: HTMLDivElement;

	onSubmit: (result: string) => void;

	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText('Woah!');
		contentEl.createEl("h1", { text: "What's your name?" });

		let div1 = contentEl.createDiv({}, (div) => {
			div.createEl("input", {});
			div.appendText("text1");
		});
		let div2 = contentEl.createDiv({});

		let fromOptsEl = new DropdownComponent(
			div1.createDiv({ text: "From:  " }),
		).addOptions(LocDescMap);

		this.buttonContainerEl = this.modalEl.createDiv({
			cls: "modal-button-container",
		});

		this.addButton((cb) =>
			cb.setButtonText("Check Conflicts").onClick(() => { }),
		);

		// let search1 = new SearchComponent(div2);
		// search1.setPlaceholder("search1");
		// search1.setValue("s1");
		// const markdownFiles: string[] = this.app.vault
		// 	.getMarkdownFiles()
		// 	.map((f) => f.path);

		// let ss1 = new GenericTextSuggester(
		// 	this.app,
		// 	search1.inputEl,
		// 	markdownFiles
		// );
		// search1.onChange((value) => console.log(value));



		// new Setting(contentEl)
		// 	.setName("Name")
		// 	.addText((text) =>
		// 		text.onChange((value) => {
		// 			this.result = value
		// 		}));

		new Setting(contentEl)
			.addSearch((search: SearchComponent) => {
				// search1.setPlaceholder("search1");
				search.setValue("s1");
				const markdownFiles: string[] = this.app.vault
					.getMarkdownFiles()
					.map((f) => f.path);

				let ss1 = new GenericTextSuggester(
					this.app,
					search.inputEl,
					markdownFiles
				);
				search.onChange((value) => console.log(value));
			});



		new Setting(contentEl)
			.addButton((btn) =>
				btn
					.setButtonText("Submit")
					.setCta()
					.onClick(() => {
						this.close();
						this.onSubmit(this.result);
					}));
	}

	private addButton(cb: (component: ButtonComponent) => any): ButtonComponent {
		const button = new ButtonComponent(this.buttonContainerEl);
		cb(button);
		return button;
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();


	}
}
