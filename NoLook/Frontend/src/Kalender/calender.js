"use strict";

import Page from "../page.js";
import HtmlTemplate from "./calender.html";

/**
 * Klasse PageEdit: Stellt die Seite zum Anlegen oder Bearbeiten einer Adresse
 * zur Verfügung.
 */
export default class PageEdit extends Page {
    /**
     * Konstruktor.
     *
     * @param {App} app Instanz der App-Klasse
     */
    constructor(app) {
        super(app, HtmlTemplate);
        
        this._emptymessageElement = null;
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
        this.restart();

        let leftButton = this._mainElement.querySelector("#moveLeft");
        leftButton.addEventListener("click", () => this.moveLeft());

        let rightButton = this._mainElement.querySelector("#moveRight");
        rightButton.addEventListener("click", () => this.moveRight());

    }

    restart() {
        dateValue(); 
        clear(); 
        draw();
    }
    
    moveLeft() {
        date.setMonth(date.getMonth() - 1);
        dateValue();
        clear();
        draw();
    }
    
    moveRight() {
        date.setMonth(date.getMonth() + 1);
        dateValue();
        clear();
        draw();
    }
    
    dateValue() {
        monat = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Okotber", "November", "Dezember",]
        ausgabe = monat[date.getMonth()] + " " + date.getFullYear();
        this._mainElement.querySelector("#month").textContent = ausgabe;
    }
    
    draw() {
        var helpDate = new Date(date.getFullYear(), date.getMonth(), 1);
        var grey = 1;
        var start = 1;
        vergleich = [6, 0, 1, 2, 3, 4, 5];
        start = start + vergleich[helpDate.getDay()];
        var id = "";
        while (grey  < start) {
            id = "#calendar_entry_" + grey;
            this._mainElement.querySelector(id).style.backgroundColor = "#6d6d6d";
            grey = grey + 1;
        }
        var counter = 0;
        while (helpDate.getMonth() == date.getMonth()) {
            counter = counter + 1;
            id = "calendar_entry_" + start;
            this._mainElement.querySelector(id).textContent = counter;
            start = start + 1;
            helpDate.setDate(helpDate.getDate() + 1); 
        }
        while (start < 43) {
            id = "calendar_entry_" + start;
            this._mainElement.querySelector(id)(id).style.backgroundColor = "#6d6d6d";
            start = start + 1;
        }
    }
    
    clear() {
        var counter = 1;
        var id = "";
        while (counter < 43) {
            id = "calendar_entry_" + counter;
            this._mainElement.querySelector(id).textContent = "";
            this._mainElement.querySelector(id).style.backgroundColor = "white";
            counter = counter + 1;
        }
    }
};
