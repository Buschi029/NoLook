"use strict";

import Page from "../page.js";
import HtmlTemplate from "./calender.html";

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
        data = await this._app.backend.fetch("GET", "/termine");
        
       
        

        for (var datensatz in data) {
            let dataset = data[datensatz];
            var timePart = dataset.date.split(' ');
            var datePart = timePart[0].toString().split('.');
            //var datum = new Date(datePart[2] ,  datePart[1]-1, datePart[0]);
            list.push(new Date(datePart[2], datePart[1]-1, datePart[0]));
    
        }

        this.restart();

        let leftButton = this._mainElement.querySelector("#moveLeft");
        leftButton.addEventListener("click", () => this.moveLeft());

        let rightButton = this._mainElement.querySelector("#moveRight");
        rightButton.addEventListener("click", () => this.moveRight());
        
        
    }

    restart() {
        this.dateValue(); 
        this.clear(); 
        this.draw();
    }
    
    moveLeft() {
        date.setMonth(date.getMonth() - 1);
        this.dateValue();
        this.clear();
        this.draw();
    }
    
    moveRight() {
        date.setMonth(date.getMonth() + 1);
        this.dateValue();
        this.clear();
        this.draw();
    }
    
    dateValue() {
        var monat = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Okotber", "November", "Dezember",];
        var ausgabe = monat[date.getMonth()] + " " + date.getFullYear();
        
        this._mainElement.querySelector(".date").textContent = ausgabe;
        
        
    }
    
    draw() {
        

        var helpDate = new Date(date.getFullYear(), date.getMonth(), 1);
        var grey = 1;
        var start = 1;
        var vergleich = [6, 0, 1, 2, 3, 4, 5];
        start = start + vergleich[helpDate.getDay()];
        var id = "";
        var linkid ="";
        var button;
        while (grey  < start) {
            id = "#calendar_entry_" + grey;
            button = this._mainElement.querySelector(id);
            button.style.backgroundColor = "#6d6d6d";
            button.disabled=true;
            grey = grey + 1;
        }
        var counter = 0;
        
        while (helpDate.getMonth() == date.getMonth()) {
            counter = counter + 1;
            id = "#calendar_entry_" + start;
            linkid = "#link_"+start;
            this._mainElement.querySelector(id).textContent = counter;
            
            this._mainElement.querySelector(linkid).href = "#/Tagessicht/?"+helpDate.getDate()+ "-" + (helpDate.getMonth() + 1) + "-" + helpDate.getFullYear();
            for (var dataset in list) {
                let datensatz = list[dataset];
                
                if (helpDate.getDate()==datensatz.getDate() && helpDate.getMonth()==datensatz.getMonth() && helpDate.getFullYear()==datensatz.getFullYear()) {
                    this._mainElement.querySelector(id).style.backgroundColor="red";
                }
            }
            start = start + 1;
            helpDate.setDate(helpDate.getDate() + 1); 
        }
        while (start < 43) {
            id = "#calendar_entry_" + start;
            button = this._mainElement.querySelector(id);
            button.style.backgroundColor = "#6d6d6d";
            button.disabled=true;
            start = start + 1;
        }
    }
    
    clear() {
        var counter = 1;
        var id = "";
        var button;
        while (counter < 43) {
            id = "#calendar_entry_" + counter;
            button = this._mainElement.querySelector(id);
            button.textContent ="";
            button.disabled=false;
            button.style.backgroundColor="transparent";
            //this._mainElement.querySelector(id).style.backgroundColor = "white";
            counter = counter + 1;
        }
    }
};
