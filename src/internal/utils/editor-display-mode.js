/**
 * Class representing the different types of editor display modes.
 */
export class EditorDisplayMode {
    constructor(props) {
        this.name = props.name;
    }

    static ALL = new EditorDisplayMode({name: 'ALL'});
    /**
     * Static property representing the "CONTENT" display mode.
     */
    static CONTENT = new EditorDisplayMode({name: 'CONTENT'});

    static all() {
        return [
            EditorDisplayMode.ALL,
            EditorDisplayMode.CONTENT,
        ];
    }

    static validate(value) {
        return EditorDisplayMode.all().some(editor => editor.name === value);
    }
}
