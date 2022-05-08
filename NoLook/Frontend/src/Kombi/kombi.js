"use strict";

import Page from "../page.js";
import HtmlTemplate from "./kombi.html";
var data;

/**
 * Klasse PageList: Stellt die Listenübersicht zur Verfügung
 */
var showDate;

export default class PageList extends Page {
    /**
     * Konstruktor.
     *
     * @param {App} app Instanz der App-Klasse
     */
    constructor(app) {
        super(app, HtmlTemplate);

        this._emptyMessageElement = null;

    }

    /**
     * HTML-Inhalt und anzuzeigende Daten laden.
     *
     * HINWEIS: Durch die geerbte init()-Methode wird `this._mainElement` mit
     * dem <main>-Element aus der nachgeladenen HTML-Datei versorgt. Dieses
     * Element wird dann auch von der App-Klasse verwendet, um die Seite
     * anzuzeigen. Hier muss daher einfach mit dem üblichen DOM-Methoden
     * `this._mainElement` nachbearbeitet werden, um die angezeigten Inhalte
     * zu beeinflussen.
     *
     * HINWEIS: In dieser Version der App wird mit dem üblichen DOM-Methoden
     * gearbeitet, um den finalen HTML-Code der Seite zu generieren. In größeren
     * Apps würde man ggf. eine Template Engine wie z.B. Nunjucks integrieren
     * und den JavaScript-Code dadurch deutlich vereinfachen.
     */
    async init() {
        // HTML-Inhalt nachladen
        await super.init();
        
        data = await this._app.backend.fetch("GET", "/termine");
        let newButton = this._mainElement.querySelector("#but");
        newButton.addEventListener("click", () => {
            let link = this._mainElement.querySelector("#buttonSave");
            link.href = "#/EintragErstellen";
        })


        let url = document.location.toString();
        let datumCode = url.split('?');
        let date = datumCode[1];
        let dateArray = date.split('-');
        let day = dateArray[0];
        let month = dateArray[1];
        let year = dateArray[2];
        showDate = new Date(dateArray[2],dateArray[1]-1, dateArray[0]);
        var monat = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Okotber", "November", "Dezember",];
        this._mainElement.querySelector('#Datum').textContent = ""+day+". "+monat[month]+" "+year;
        this.addToDo();
}
async addToDo() {
    
    this.clear();
    for (var datensatz in data) {
        let dataset = data[datensatz];
        var datePart = dataset.date.split(" ");
        var dateArray = datePart[0].split(".");
        var compareDate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
        if(dataset.kind=="termin" && showDate.getDate()==compareDate.getDate() && showDate.getMonth()==compareDate.getMonth() && showDate.getFullYear()==compareDate.getFullYear()){
        
            let text = this._mainElement.querySelector("#leftPart");
    
            var input = document.createElement("textarea");
            var linkEdit = document.createElement("a");
            var editIcon = document.createElement("button");
            var deleteIcon = document.createElement("button");
            var icons = document.createElement("div");
            icons.className = "toDoEntry";
            input.value=""+ datePart[1].toString().substr(0,5) +"     "+ dataset.title;
            editIcon.textContent = "✎";
            var linkid = dataset._id;

            linkEdit.href = "#/EintragBearbeiten/"+linkid;
            linkEdit.appendChild(editIcon);

            deleteIcon.textContent = "🗑";
            deleteIcon.addEventListener("click", async () => {
                await this._app.backend.fetch("DELETE", "/termine/" + linkid);
                location.hash = "#/";
            })
            icons.appendChild(linkEdit);
            icons.appendChild(deleteIcon);
            text.appendChild(input);
            text.appendChild(icons);

        } 
        if(dataset.kind=="todo" && showDate.getDate()==compareDate.getDate() && showDate.getMonth()==compareDate.getMonth() && showDate.getFullYear()==compareDate.getFullYear()){
        
            let text = this._mainElement.querySelector("#rightPart");
    
            var input = document.createElement("textarea");
            var editIcon = document.createElement("button");
            var linkEdit = document.createElement("a");
            var deleteIcon = document.createElement("button");
            var icons = document.createElement("div");
            icons.className = "toDoEntry";
            input.value=dataset.title;
            editIcon.textContent = "✎";
            var linkid = dataset._id;

            linkEdit.href = "#/EintragBearbeiten/"+linkid;
            linkEdit.appendChild(editIcon);

            deleteIcon.textContent = "🗑";
            deleteIcon.addEventListener("click", async () => {
                await this._app.backend.fetch("DELETE", "/termine/" + linkid);
                location.hash = "#/";
            })
            icons.appendChild(linkEdit);
            icons.appendChild(deleteIcon);
            text.appendChild(input);
            text.appendChild(icons);

        } 
    }
}

clear() {
 
    const textLeft = this._mainElement.querySelector("#leftPart");
    while (textLeft.firstChild && textLeft.firstChild.id != "terminTitle") {
        
        textLeft.removeChild(textLeft.firstChild);

            }

    const textRight = this._mainElement.querySelector("#rightPart");
    while (textRight.firstChild && textRight.firstChild.id != "terminTitle") {
        textRight.removeChild(textRight.firstChild);
    }
}

toNewWindow() {

}
};

