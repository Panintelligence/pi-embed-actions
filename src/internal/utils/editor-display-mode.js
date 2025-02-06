/**
 * `EditorDisplayMode` allows to control what aspects of the editor are displayed when the dashboard is embedded.
 *
 * The editor is the interface within the dashboard that enables modification of various elements.
 * It provides options to customise and manage key components in the dashboard, such as reports, users, categories and more.
 *
 * Specific `EditorDisplayMode` values can be applied as query parameters to customise the view of the embedded editor.
 * By default, the editor displays a full view identical to the non-embedded dashboard UI.
 */
export class EditorDisplayMode {
    constructor(props) {
        this.name = props.name;
    }

    static SHOW_ALL = new EditorDisplayMode({name: 'SHOW_ALL'});
    /**
     * Static property representing the `CONTENT` display mode.
     * This mode simplifies the editor interface by adjusting the layout and removing non-essential elements like toolbars and buttons.
     * Only the requested editor's content is displayed in this mode.
     *
     * Example of the embedded Report Editor in 'CONTENT' mode:
     *
     * <img src="static/content-editor-display-mode.png" alt="Example Output" />
     *
     *  @example
     * // To apply 'CONTENT' mode, add it as a query parameter in the dashboard URL:
     *  https://pi-dev.uk:8224/pi?lang=en_GB&editorDisplayMode=CONTENT
     * // If no query parameter is supplied, the default editor view will be displayed.
     */
    static CONTENT = new EditorDisplayMode({name: 'CONTENT'});

    static all() {
        return [
            EditorDisplayMode.SHOW_ALL,
            EditorDisplayMode.CONTENT,
        ];
    }

    static validate(value) {
        return EditorDisplayMode.all().some(editor => editor.name === value);
    }
}
