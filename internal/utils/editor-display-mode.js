export default class EditorDisplayMode {
    constructor(props) {
        this.name = props.name;
    }

    static ALL = new EditorDisplayMode({name: 'ALL'});
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
