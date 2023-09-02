class ToggleManager {
	constructor(el = document.querySelector(".toggle-checkbox")) {
		this.toggle = el;

		this.toggle.addEventListener("change", () => {
			chrome.storage.sync.set({ isBlocking: this.toggle.checked });
		});
	}

	syncValue(value) {
		this.toggle.checked = value;
	}
}

class Preset {
	constructor(list, id) {
		this.id = id;
		this.preset = document.createElement("div");
		this.preset.innerText = list.name;
		this.preset.classList.add("preset");
	}

	getElement() {
		return this.preset;
	}
}

class PresetsManager {
	constructor(el = document.querySelector(".presetsContainer")) {
		this.presetsContainer = el;
		this.presets = [];
	}

	syncPresets(synchedLists) {
		for(let i = 0; i < synchedLists.length; i++) {
			this.presets.push(new Preset(synchedLists[i], i));
			this.presetsContainer.appendChild(this.presets[i].getElement());
		}
	}
}

export { ToggleManager, PresetsManager };
