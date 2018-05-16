const currentDocument = document.currentScript.ownerDocument;

class CustomSelect extends HTMLElement {

    constructor() {
        super();
        this._items = [];
    }

    static get is() { return 'custom-select'; }
    
    static get observedAttributes() { return ["items"]; }

    get items() {
        return this._items;
    }

    set items(v) {
        this.setAttribute("items", v);
    }

    addItem() {
        this.push('items', {name: 'Pizza', value: 1, ordered: 0});
    }

    connectedCallback() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        const t = currentDocument.querySelector('#custom-select');
        const instance = t.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        this.populateSelectList();
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if(typeof newVal == 'string') {
            this._items = JSON.parse(newVal);
        } else this._items = newVal;
    }

    populateSelectList() {
        let select = this.shadowRoot.querySelector('.select-element');
        this._items.forEach(item => {
            let option = document.createElement('option');
            option.value = item.value;
            option.innerText = item.name;
            select.appendChild(option);
        });
    }
}

customElements.define(CustomSelect.is, CustomSelect);