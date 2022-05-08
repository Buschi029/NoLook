"use strict";

import Page from "../page.js";
import HtmlTemplate from "./entry.html";

/**
 * Klasse PageEdit: Stellt die Seite zum Anlegen oder Bearbeiten einer Adresse
 * zur Verfügung.
 */
var date = new Date();
var data;
var list = new Array();

export default class PageEdit extends Page {
    /**
     * Konstruktor.
     *
     * @param {App} app Instanz der App-Klasse
     */

    
    constructor(app, editId) {
        super(app, HtmlTemplate);
        this._editId = editId;
        this._emptymessageElement = null;
        this._dataset = {
            title: "",
            date: "",
            duration: 0,
            kind: ""
        };
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
        this._dataset = await this._app.backend.fetch("GET", "termine/" + this._editId);
    }
    
    show() {
        let uhrzeit = this._mainElement.querySelector('#timeCon');
        let dauer = this._mainElement.querySelector('#durationCon');

        let terminRadio = this._mainElement.querySelector('#termin');
        let todoRadio = this._mainElement.querySelector('#todo');
        let titleInput = this._mainElement.querySelector("#title");
        let dateInput = this._mainElement.querySelector("#date");
        let timeInput = this._mainElement.querySelector("#time");
        let durationInput = this._mainElement.querySelector("#duration");
        titleInput.textContent = this._dataset.title;
        let timePointArray = this._dataset.date.split(" ");
        let dateArray = timePointArray[0].split(".");
        dateInput.datepicker("setDate", new Date(dateArray[2], dateArray[1] - 1, dateArray[0]));
        if (this._dataset.kind == "termin") {
            terminRadio.checked = true;
            todoRadio.checked = false;
        }
        else {
            terminRadio.checked = false;
            todoRadio.checked = true;
        }

        if (terminRadio.checked == true) {
            timeInput.value = timePointArray[1].substring(0, 5);
            durationInput.value = this._dataset.duration.toString();
            uhrzeit.style.display = "inline";
            dauer.style.display = "inline";

        }
        if (todoRadio.checked == true) {
            uhrzeit.style.display = "none";
            dauer.style.display = "none";
        }

    }

    async save() {
        let terminRadio = this._mainElement.querySelector('#termin');
        let todoRadio = this._mainElement.querySelector('#todo');
        let titleInput = this._mainElement.querySelector("#title").value;
        let dateInput = this._mainElement.querySelector("#date").value;
        let datePart = dateInput.toString().split("-");
        let terminDate
        if (todoRadio.checked == true) {

            dateInput = "" + datePart[2] + "." + datePart[1] + "." + datePart[0];
            terminDate = "" + dateInput.toString() + " 00:00:00";
            this._dataset.duration = 0;
        }
        else {

            dateInput = "" + datePart[2] + "." + datePart[1] + "." + datePart[0];
            let timeInput = this._mainElement.querySelector("#time").value;
            let durationInput = this._mainElement.querySelector("#duration").value;
            terminDate = "" + dateInput.toString() + " " + timeInput.toString() + ":00";
            this._dataset.duration = parseInt(durationInput) * 60;
        }



        this._dataset.title = titleInput;
        this._dataset.date = terminDate;

        if (terminRadio.checked == true) {
            this._dataset.kind = "termin";
        }
        if (todoRadio.checked == true) {
            this._dataset.kind = "todo";
        }
        await this._app.backend.fetch("PUT", "termine/" + this._editId, { body: this._dataset });
        alert(this._dataset.title);
        this._mainElement.querySelector("#title").textContent = "";
    }
};
