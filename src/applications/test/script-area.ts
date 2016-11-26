let scriptsArea: HTMLElement;

function getScriptsArea() {
    if (!scriptsArea) {
        scriptsArea = document.getElementById('scripts-area');
    }
    return scriptsArea;
}

export default getScriptsArea;