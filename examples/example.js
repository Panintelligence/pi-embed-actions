import PiEmbedActions from '../src/main.js';

const dashboard2 = PiEmbedActions.createDashboard('dashboard2', 'https://pi-dev.uk:8224/pi?lang=en_GB&editorDisplayMode=CONTENT');
dashboard2.reportEditor.open(123);
dashboard2.reportEditor.open(200);
dashboard2.dataSourceItemEditor.open(2);