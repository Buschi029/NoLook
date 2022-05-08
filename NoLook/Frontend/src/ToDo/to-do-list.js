"use strict";

import Page from "../page.js";
import HtmlTemplate from "./to-do-list.html";

/**
 * Klasse PageList: Stellt die Listenübersicht zur Verfügung
 */

var data;
var date = new Date();

export default class PageList extends Page {
    /**
     * Konstruktor.
     *
     * @param {App} app Instanz der App-Klasse
     */
    constructor(app) {
        super(app, HtmlTemplate);

        this._emptyMessageElement = null;
        this._dataset = {
            title:"humlae", 
            date: "25.08.2000",
            duration: 30,
            kind: "termin"
        }
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
        
        let leftButton = this._mainElement.querySelector("#moveLeft");
        leftButton.addEventListener("click", () => this.moveLeft());

        let rightButton = this._mainElement.querySelector("#moveRight");
        rightButton.addEventListener("click", () => this.moveRight());
        
        this.dateText();
    }

    moveLeft() {
        date.setDate(date.getDate() - 1);
        this.dateText();
    }
    
    moveRight() {
        date.setDate(date.getDate() + 1);
        this.dateText();
    }

    dateText() {
        let leftTitle = this._mainElement.querySelector("#leftTitle");
        let rightTitle = this._mainElement.querySelector("#rightTitle");
        var today = new Date();
        if (date.getDate()==today.getDate() && date.getMonth()==today.getMonth() && date.getFullYear()==today.getFullYear()) {
            leftTitle.textContent = "Heute";
            rightTitle.textContent = "Morgen";
        }
        else {
            date.setDate(date.getDate() + 1);
            if (date.getDate()==today.getDate() && date.getMonth()==today.getMonth() && date.getFullYear()==today.getFullYear()) {
                date.setDate(date.getDate() - 1);
                leftTitle.textContent = "" + date.getDate() + ". " + date.getMonth() + " " + date.getFullYear();
                rightTitle.textContent = "Heute";
            }
            else {
                date.setDate(date.getDate() - 2);
                if (date.getDate()==today.getDate() && date.getMonth()==today.getMonth() && date.getFullYear()==today.getFullYear()) {
                    date.setDate(date.getDate() + 1);
                    leftTitle.textContent = "Morgen";
                    rightTitle.textContent = "" + date.getDate() + ". " + date.getMonth() + " " + date.getFullYear();
                }
                else {
                    date.setDate(date.getDate() + 1);
                    leftTitle.textContent = "" + date.getDate() + ". " + date.getMonth() + " " + date.getFullYear();
                    date.setDate(date.getDate() + 1);
                    rightTitle.textContent = "" + date.getDate() + ". " + date.getMonth() + " " + date.getFullYear();
                    date.setDate(date.getDate() - 1);
                }
            }
        }
        this.addToDo();
    }
  
    addToDo() {
        this.clear();
        for (var datensatz in data) {
            let dataset = data[datensatz];
            var datePart = dataset.date.split(" ");
            var dateArray = datePart[0].split(".");
            var compareDate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
            if(dataset.kind=="todo" && date.getDate()==compareDate.getDate() && date.getMonth()==compareDate.getMonth() && date.getFullYear()==compareDate.getFullYear()){
            
                let text = this._mainElement.querySelector("#partLeft");
                // while (text.firstChild) {
                //     text.removeChild(text.firstChild);
                // }
                
                text.innerHTML="";
                var input = document.createElement("textarea");
                var editIcon = document.createElement("button");
                var deleteIcon = document.createElement("button");
                var icons = document.createElement("div");
                icons.className = "toDoEntry";
                input.value=dataset.title;
                editIcon.textContent = "✎";
                editIcon.id = dataset.id;
                deleteIcon.textContent = "🗑";
                deleteIcon.id = dataset.id
                icons.appendChild(editIcon);
                icons.appendChild(deleteIcon);
                text.appendChild(input);
                text.appendChild(icons);

            } 
            else {
                date.setDate(date.getDate() + 1);
                if(dataset.kind=="todo" && date.getDate()==compareDate.getDate() && date.getMonth()==compareDate.getMonth() && date.getFullYear()==compareDate.getFullYear()){
                
                    let text = this._mainElement.querySelector("#partRight");
                    while (text.firstChild) {
                        text.removeChild(text.firstChild);
                    }
                   
                    var input = document.createElement("textarea");                
                    var editIcon = document.createElement("button");
                    var deleteIcon = document.createElement("button");
                    var icons = document.createElement("div");
                    icons.className = "toDoEntry";
                    input.value=dataset.title;
                    editIcon.textContent = "✎";
                    editIcon.id = dataset.id;
                    deleteIcon.textContent = "🗑";
                    deleteIcon.id = dataset.id
                    icons.appendChild(editIcon);
                    icons.appendChild(deleteIcon);
                    text.appendChild(input);
                    text.appendChild(icons);
                } 
                date.setDate(date.getDate() - 1);
            }
        }
    }
    clear() {

       

        const textLeft = this._mainElement.querySelector("#partLeft");
        while (textLeft.firstChild) {
                    textLeft.removeChild(textLeft.firstChild);
                }

        const textRight = this._mainElement.querySelector("#partRight");
        while (textRight.firstChild) {
            textRight.removeChild(textRight.firstChild);
        }
    }
};
