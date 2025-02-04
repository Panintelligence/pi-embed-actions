/**
 * Represents the different display modes available for the editor in an embedded context.
 * The `EditorDisplayMode` class allows you to control what aspects of the editor are displayed when the dashboard is embedded.
 * By default, the editor displays a full view that matches the non-embedded dashboard UI.
 * By using specific `EditorDisplayMode` values as query parameters, you can customise what view is exposed in the embedded editor.
 */
export class EditorDisplayMode {
    constructor(props) {
        this.name = props.name;
    }

    static ALL = new EditorDisplayMode({name: 'ALL'});
    /**
     * Static property representing the `CONTENT` display mode.
     * This mode simplifies the editor interface by removing non-essential elements and adjusting the layout.
     * It focuses solely on the content of a single report editor by making the following adjustments:
     * - Hides the reports list, scheduler module-related content, import-export functionality.
     * - Cleans up the interface by hiding unnecessary toolbars and buttons.
     *
     * In this mode, only the content of the requested report editor is displayed.
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
